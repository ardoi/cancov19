
import React from "react";
import * as dc from "dc";
import { ChartTemplate } from "./chartTemplate";

const ageChartFunc = (divRef, cf) => {
    const dimension = cf.dimension(d => d.Age);
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

export const AgeChart = props => {
    console.log('gc')
    return <ChartTemplate chartFunction={ageChartFunc} title="Age Breakdown" />
}