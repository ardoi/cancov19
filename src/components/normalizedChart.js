import React from "react";
import * as dc from "dc";
import { ChartTemplate } from "./chartTemplate";
import { scaleTime } from "d3";
import moment from "moment";
import { colorf, sortpc, population } from "../util";

const timeChartFunc = (divRef, cf, params, windowSize) => {
    const dimension = cf.dimension(d => d.Date);
    const group = dimension.group();
    let chartGroup = group;
    const colors = colorf();
    const pCounts = group.reduce(
        (p, v) => {
            p[v.Prov] = (p[v.Prov] || 0) + 1 / population[v.Prov];
            return p;
        },
        (p, v) => {
            p[v.Prov] = p[v.Prov] - 1 / population[v.Prov];
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
    const pdim = cf.dimension(d => d.Prov);
    const provinces = pdim.group().all();
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
            // .renderDataPoints({ radius: 2, fillOpacity: 1 })
        );
    });

    let chartH = 350
    let chartW = 475
    
    if(windowSize.width<1440){
        chartW = windowSize.width/1440 * chartW;
        chartH = windowSize.width/1440 * chartH;
    }
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

    return timeChart;
};

export const NormalizedChart = props => {
    return (
        <ChartTemplate chartFunction={timeChartFunc} params={props.params} />
    );
};
