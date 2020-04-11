import React from "react";
import * as dc from "dc";
import { ChartTemplate } from "./chartTemplate";
import { colorf, sortpc, totalReduce, provinceTotalReduce } from "../util";

const statNumberFunc = (divRef, dimensions, params) => {
    const dimension = dimensions["date"];
    let group;
    let getValue;
    if (params.total) {
        group = dimension.groupAll().reduceSum(x=>x.Total);
        getValue = x => x;
    } else {
        group = totalReduce(dimension.group());
        getValue = x => x.value;
    }
    const dcchartGroup = `${params.usedata}_${params.loc}_${params.normalize?"normalized":"base"}`
    const quarterChart = dc.numberDisplay(divRef, dcchartGroup);
    quarterChart
        .valueAccessor(getValue)
        .ordering(x => x.key)
        .group(group);
    return quarterChart;
};

export const StatNumber = props => {
    return (
        <ChartTemplate
            chartFunction={statNumberFunc}
            title=""
            params={props.params}
        />
    );
};
