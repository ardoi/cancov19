import React from "react";
import * as dc from "dc";
import { ChartTemplate } from "./chartTemplate";
import { scaleTime } from "d3";
import moment from "moment";
import { colorf, sortpc} from "../util";

const timeChartFunc = (divRef, cf, params, windowSize) => {
    const dimension = cf.dimension(d => d.Date);
    const group = dimension.group();
    const stack = params.stacked;
    let chartGroup = group;
    const colors = colorf();
    if (stack) {
        const pCounts = group.reduce(
            (p, v) => {
                p[v.Prov] = (p[v.Prov] || 0) + 1;
                return p;
            },
            (p, v) => {
                p[v.Prov] = p[v.Prov] - 1;
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
    } else {
        function accumulate_group(source_group) {
            return {
                all: function() {
                    const sa = source_group.all();
                    let cumulate = 0;
                    const res = [];
                    for (const el of sa) {
                        cumulate += el.value;
                        res.push({ key: el.key, value: cumulate });
                    }
                    return res;
                }
            };
        }
        chartGroup = accumulate_group(group);
    }
    const pdim = cf.dimension(d => d.Prov);
    const provinces = pdim.group().all();
    //sort provinces and colors together
    sortpc(provinces, colors);
    const smallestProvince = provinces[0].key;
    const sel = i => {
        return d => d.value[i] || 0;
    };

    const timeChart = dc.lineChart(divRef);

    if (stack) {
        timeChart
            .dimension(dimension)
            .group(chartGroup, smallestProvince, sel(smallestProvince));
    } else {
        timeChart.dimension(dimension).group(chartGroup);
    }
    let chartH = 350
    let chartW = 475
    
    if(windowSize.width<1440){
        chartW = windowSize.width/1440 * chartW;
        chartH = windowSize.width/1440 * chartH;
    }

    timeChart
        .renderArea(true)
        .elasticY(true)
        .width(chartW)
        .height(chartH)
        .brushOn(false)
        .clipPadding(10)
        .margins({ left: 40, top: 10, right: 10, bottom: 20 })
        .renderDataPoints({ radius: 2, fillOpacity: 1 })
        .xyTipsOn(true)
        .x(scaleTime().domain([new Date(2020, 2, 1), moment().add(1, "day")]))
        .ordinalColors(colors)
        .xAxis()
        .ticks(8)
        .tickFormat(v => moment(v).format("DD/MM"));

    if (stack) {
        for (const p of provinces.slice(1)) {
            const pk = p.key;
            timeChart.stack(chartGroup, pk, sel(pk));
        }
    }

    return timeChart;
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
