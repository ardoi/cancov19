import React from "react";
import * as dc from "dc";
import { ChartTemplate } from "./chartTemplate";
import { scaleTime, format } from "d3";
import moment from "moment";
import { colorf, sortpc, totalReduce, provinceTotalReduce, accumulateGroup, accumulateGroupTotal } from "../util";

const timeChartFunc = (
    divRef,
    dimensions,
    params,
    windowSize,
    chartData,
    updateChartData
) => {

    const chartH0 = 350;
    const chartW0 = 475;
    if (chartData.hasOwnProperty("chart")) {
        const chart = chartData.chart;

        const chartW = (windowSize.width / 1440) * chartW0;
        const chartH = (windowSize.width / 1440) * chartH0;

        chart.width(chartW).height(chartH);
        return chart;
    } else {
        // let dimension;
        // let pgroup;
        // let group;
        const dimension = dimensions["date"];
        const pgroup = dimensions["prov"].group();
        const group = dimension.group();
        const stack = params.stacked;
        let chartGroup = group;
        const colors = colorf();
        if (stack) {
            const pCounts = provinceTotalReduce(group);
            const ag = accumulateGroup(pCounts);
            chartGroup = ag;
        } else {
            const tCount = totalReduce(group);
            chartGroup = accumulateGroupTotal(tCount);
        }
        // const provinces = totalReduce(pgroup).all();
        const provinces = totalReduce(pgroup).top(13);
        //sort provinces and colors together
        sortpc(provinces, colors);
        const smallestProvince = provinces[0].key;
        const sel = i => {
            return d => d.value[i] || 0;
        };

        const dcchartGroup = `${params.usedata}_${params.loc}_${params.normalize?"normalized":"base"}`
        const timeChart = dc.lineChart(divRef, dcchartGroup);

        if (stack) {
            timeChart
                .dimension(dimension)
                .group(chartGroup, smallestProvince, sel(smallestProvince))//.top(10);
        } else {
            timeChart.dimension(dimension).group(chartGroup)//.top(10);
        }

        const chartW = (windowSize.width / 1440) * chartW0;
        const chartH = (windowSize.width / 1440) * chartH0;

        timeChart
            .renderArea(true)
            .elasticY(true)
            .width(chartW)
            .height(chartH)
            .brushOn(false)
            .clipPadding(10)
            .margins({ left: 40, top: 10, right: 10, bottom: 20 })
            // .renderDataPoints({ radius: 0, fillOpacity: 1 })
            .xyTipsOn(true)
            // .title(x=>{return `${x.key.format("d-MMM")}: ${x.value}`})
            // .title(x=>{console.log(x.value); return parseInt(x.value)})
            .x(
                scaleTime().domain([
                    new Date(2020, 2, 1),
                    moment().add(1, "day")
                ])
            )
            .ordinalColors(colors)
            .xAxis()
            .ticks(8)
            .tickFormat(v => moment(v).format("DD/MM"));

        timeChart.yAxis().tickFormat(v=>format(".2s")(v));
        if (stack) {
            for (const p of provinces.slice(1)) {
                const pk = p.key;
                timeChart.stack(chartGroup, pk, sel(pk));
            }
        }
        updateChartData({ 'chart': timeChart });
        return timeChart;
    }
};

export const TimeChart = props => {
    return (
        <ChartTemplate
            chartFunction={timeChartFunc}
            title="Cumulative"
            params={props.params}
        />
    );
};
