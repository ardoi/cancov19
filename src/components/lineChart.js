import React from "react";
import * as dc from "dc";
import { ChartTemplate } from "./chartTemplate";
import { scaleTime } from "d3";
import moment from "moment";
import { colorf, sortpc, population, populationW, totalReduce, provinceTotalReduce, accumulateGroup } from "../util";

const chartFunc = (divRef, dimensions, params, windowSize, chartData, updateChartData) => {
    const chartH0 = 350;
    const chartW0 = 475;

    if (chartData.hasOwnProperty("chart")) {
        const chart = chartData.chart;

        const chartW = (windowSize.width / 1440) * chartW0;
        const chartH = (windowSize.width / 1440) * chartH0;

        chart.width(chartW).height(chartH);
        return chart;
    } else {

    const dimension = dimensions["date"];
    const pgroup = dimensions["prov"].group();
    const group = dimension.group();
    // Per location totals for ranking the row chart and assigning colors
    const provinces = totalReduce(pgroup).top(13); 
    const colors = colorf();

    const pCounts = provinceTotalReduce(group);
    let chartGroup;
    if (params.cumulative){
        const ag = accumulateGroup(pCounts);
        chartGroup = ag;
    }
    else{
        chartGroup = pCounts;
    }
    //sort provinces and colors together
    sortpc(provinces, colors);
    // const smallestProvince = provinces[0].key;
    const sel = i => {
        return d => d.value[i] || 0;
    };

    const dcchartGroup = `${params.usedata}_${params.loc}_${params.normalize?"normalized":"base"}`
    const timeChart = dc.compositeChart(divRef, dcchartGroup);

    const charts = [];

    provinces.forEach((el, ix) => {
        const pk = el.key;
        const color = colors[ix];
        charts.push(
            dc
                .lineChart(timeChart)
                .dimension(dimension)
                .group(chartGroup, pk, sel(pk))
                .colors(color)
                .title(x=>{return `${x.key.format("d-MMM")}: ${pk} : ${x.value[pk]}`})
            )
    });
    
    const    chartW = windowSize.width/1440 * chartW0;
    const    chartH = windowSize.width/1440 * chartH0;
    timeChart
        // .renderArea(true)
        .elasticY(true)
        .width(chartW)
        .height(chartH)
        .brushOn(false)
        .clipPadding(10)
        .margins({ left: 50, top: 10, right: 10, bottom: 20 })
        .shareTitle(false)
        .x(scaleTime().domain([new Date(2020, 2, 1), moment().add(1, "day")]))
        .compose(charts);

    timeChart
        .xAxis()
        .ticks(5)
        .tickFormat(v => moment(v).format("DD/MM"));

    updateChartData({ 'chart': timeChart });
    return timeChart;
}
};

export const LineChart = props => {
    return (
        <ChartTemplate chartFunction={chartFunc} params={props.params} />
    );
};
