
import React from "react";
import * as dc from "dc";
import { ChartTemplate } from "./chartTemplate";

const originChartFunc = (divRef, cf) => {
    const dimension = cf.dimension(d => d.Source);
    const group = dimension.group()
    console.log(group.all())
    const quarterChart = dc.rowChart(divRef);
    quarterChart
    .dimension(dimension)
    .width(300)
    .height(300)
    .group(group);
    return quarterChart

}

export const OriginChart = props => {
    return <ChartTemplate chartFunction={originChartFunc} title="Source" />
}