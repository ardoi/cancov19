import React from "react";
import * as dc from "dc";
import { ChartTemplate } from "./chartTemplate";
import { colorf, sortpc, population } from "../util";

const provinceChartFunc = (divRef, cf, params) => {
    const dimension = cf.dimension(d => d.Prov);
    const group = dimension.group();

    const colors = colorf();
    const provinces = group.all();
    sortpc(provinces, colors);
    const provinceChart = dc.rowChart(divRef);
    const normalize = params.normalize;
    provinceChart
        .width(350)
        .height(300)
        .margins({ top: 10, right: 50, bottom: 30, left: 40 })
        .dimension(dimension)
        .group(group)
        .elasticX(true)
        .labelOffsetX(-25)
        .valueAccessor(x => (normalize ? x.value / population[x.key] : x.value))
        .ordinalColors(
            colors.slice(0, Object.keys(provinces).length).reverse()
        );

    provinceChart.xAxis().ticks(5);
    return provinceChart;
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
