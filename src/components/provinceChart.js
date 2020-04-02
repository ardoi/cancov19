import React from "react";
import * as dc from "dc";
import { ChartTemplate } from "./chartTemplate";
import { colorf, sortpc, population } from "../util";

const provinceChartFunc = (
    divRef,
    dimensions,
    params,
    windowSize,
    chartData,
    updateChartData
) => {
    const chartW0 = 350
    const chartH0 = 300
    if (chartData.hasOwnProperty("chart")) {
        const chart = chartData.chart;

        const chartW = (windowSize.width / 1440) * chartW0;
        const chartH = (windowSize.width / 1440) * chartH0;
        chart.width(chartW).height(chartH);
        return chart;
    } else {
        let dimension;
        if (params.normalize) {
            dimension = dimensions["provN"];
        } else {
            dimension = dimensions["prov"];
        }
        const group = dimension.group();
        const colors = colorf();
        const provinces = group.all();
        sortpc(provinces, colors);
        const provinceChart = dc.rowChart(divRef);
        const normalize = params.normalize;
        const chartW = (windowSize.width / 1440) * chartW0;
        const chartH = (windowSize.width / 1440) * chartH0;
        provinceChart
            .width(chartW)
            .height(chartH)
            .margins({ top: 10, right: 50, bottom: 30, left: 40 })
            .dimension(dimension)
            .group(group)
            .elasticX(true)
            .labelOffsetX(-25)
            .valueAccessor(x =>
                normalize ? x.value / population[x.key] : x.value
            )
            .ordinalColors(
                colors.slice(0, Object.keys(provinces).length).reverse()
            );

        provinceChart.xAxis().ticks(5);

        updateChartData({ chart: provinceChart });
        return provinceChart;
    }
};

export const ProvinceChart = props => {
    return (
        <ChartTemplate
            chartFunction={provinceChartFunc}
            title="Province Totals"
            reset={true}
            params={props.params}
        />
    );
};
