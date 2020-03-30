import React from "react";
import * as dc from "dc";
import { ChartTemplate } from "./chartTemplate";
import { scaleTime } from "d3";
import moment from "moment";
import { colorf, sortpc } from "../util";

const dailyTimeChartFunc = (divRef, cf, params) => {
    const dimension = cf.dimension(d => d.Date);
    const group = dimension.group();
    const stack = params.stacked;
    let chartGroup = group;
    if (stack) {
        const pCounts = group.reduce(
            (p, v) => {
                p[v.Prov] = (p[v.Prov] || 0) + 1;
                return p;
            },
            (p, v) => {
                p[v.Prov] = (p[v.Prov] || 0) - 1;
                return p;
            },
            () => ({})
        );
        chartGroup = pCounts;
    }
    const pdim = cf.dimension(d => d.Prov);
    const provinces = pdim.group().all();
    const sel = i => {
        return d => d.value[i] || 0;
    };

    const colors = colorf();
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
    timeChart
        .renderArea(true)
        .elasticY(true)
        .width(475)
        .height(350)
        .brushOn(false)
        .clipPadding(10)
        .margins({ left: 50, top: 10, right: 10, bottom: 20 })
        .renderDataPoints({ radius: 2, fillOpacity: 1 })
        .ordinalColors(colors)
        .x(scaleTime().domain([new Date(2020, 2, 1), moment().add(1, "day")]))
        .xAxis()
        .ticks(5)
        .tickFormat(v => moment(v).format("DD/MM"));

    if (stack) {
        for (const p of provinces.slice(1)) {
            const pk = p.key;
            timeChart.stack(chartGroup, pk, sel(pk));
        }
    }

    return timeChart;
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
