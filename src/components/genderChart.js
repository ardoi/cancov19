import React from "react";
import * as dc from "dc";
import { ChartTemplate } from "./chartTemplate";

const genderChartFunc = (divRef, cf) => {
    const dimension = cf.dimension(d => d.Sex);
    const group = dimension.group()

    const quarterChart = dc.rowChart(divRef);
    quarterChart 
    // .innerRadius(50)
    .dimension(dimension)
    .group(group)
    .width(300)
    .height(300)
    // .x(scale().)
    return quarterChart

}

export const GenderChart = props => {
    console.log('gc')
    return <ChartTemplate chartFunction={genderChartFunc} title="Gender Breakdown" />
}