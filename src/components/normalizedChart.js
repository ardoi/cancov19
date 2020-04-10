import React from "react";
import * as dc from "dc";
import { ChartTemplate } from "./chartTemplate";
import { scaleTime } from "d3";
import moment from "moment";
import { colorf, sortpc, population, populationW, totalReduce, provinceTotalReduce } from "../util";

const timeChartFunc = (divRef, dimensions, params, windowSize, chartData, updateChartData) => {
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
    dimension = dimensions['dateN'];
    pdim = dimensions['provN'];
    const group = dimension.group();
    let chartGroup = group;
    const colors = colorf();
    const popData = params.loc==="Country"?populationW:population;
    const pCounts = group.reduce(
        (p, v) => {
            p[v.Prov] = (p[v.Prov] || 0) + v.Total / popData[v.Prov];
            return p;
        },
        (p, v) => {
            p[v.Prov] = p[v.Prov] - v.Total / popData[v.Prov];
            return p;
        },
        () => ({})
    );
    function accumulate_group(source_group) {
        return {
            all: function() {
                const sa = source_group.all();
                const cumulate = {};
                const res = [];
                for (const el of sa) {
                    for (let [k, v] of Object.entries(el.value)) {
                        cumulate[k] = (cumulate[k] || 0) + v;
                    }
                    res.push({ key: el.key, value: { ...cumulate } });
                }
                return res;
            }
        };
    }
    const ag = accumulate_group(pCounts);
    chartGroup = ag;
    // const provinces = totalReduce(pdim.group()).top(13);
    const provinces = pdim.group().all();
    // const provinces = ag.top(13);
    //sort provinces and colors together
    sortpc(provinces, colors);
    const smallestProvince = provinces[0].key;
    const sel = i => {
        return d => d.value[i] || 0;
    };

    const timeChart = dc.compositeChart(divRef);

    const charts = [];

    // for(const p of provinces) {
    // for(let i of provinces) {
    provinces.forEach((el, ix) => {
        const pk = el.key;
        const color = colors[ix];
        charts.push(
            dc
                .lineChart(timeChart)
                .dimension(dimension)
                .group(chartGroup, pk, sel(pk))
                .colors(color)
            )
            // .renderDataPoints({ radius: 2, fillOpacity: 1 })
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

export const NormalizedChart = props => {
    return (
        <ChartTemplate chartFunction={timeChartFunc} params={props.params} />
    );
};
