import React from "react";
import * as dc from "dc";
import { ChartTemplate } from "./chartTemplate";
import { scaleTime } from "d3";
import moment from "moment";
import { colorf, sortpc, totalReduce, provinceTotalReduce } from "../util";

const dailyTimeChartFunc = (
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
        let dimension;
        let pdim;
        if (params.normalize) {
            dimension = dimensions["dateN"];
            pdim = dimensions["provN"];
        } else {
            dimension = dimensions["date"];
            pdim = dimensions["prov"];
        }
        const group = dimension.group();
        const stack = params.stacked;
        let chartGroup = group;
        const provincesG = totalReduce(pdim.group());
        if (stack) {
            const pCounts = provinceTotalReduce(group);
            chartGroup = pCounts;
        }
        else{
            chartGroup = totalReduce(group);
        }
        const sel = i => {
            return d => d.value[i] || 0;
        };

        const colors = colorf();
        const provinces = provincesG.all();
        sortpc(provinces, colors);

        const timeChart = dc.lineChart(divRef);

        const smallestProvince = provinces[0].key;
        if (stack) {
            timeChart
                .dimension(dimension)
                .group(chartGroup, smallestProvince, sel(smallestProvince));
        } else {
            timeChart.dimension(dimension).group(chartGroup);
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
            // .renderDataPoints({ radius: 2, fillOpacity: 1 })
            .ordinalColors(colors)
            .x(
                scaleTime().domain([
                    new Date(2020, 2, 1),
                    moment().add(1, "day")
                ])
            )
            .xAxis()
            .ticks(5)
            .tickFormat(v => moment(v).format("DD/MM"));

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

export const DailyTimeChart = props => {
    return (
        <ChartTemplate
            chartFunction={dailyTimeChartFunc}
            title="Daily"
            params={props.params}
        />
    );
};
