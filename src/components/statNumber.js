import React from "react";
import * as dc from "dc";
import { ChartTemplate } from "./chartTemplate";

const statNumberFunc = (divRef, cf, params) => {
    const dimension = cf.dimension(d => d.Date);
    let group
    let getValue
    if(params.total){
        group = dimension.groupAll();
        getValue = x=>x;
    }
    else{
        group = dimension.group()
        getValue = x=>x.value;
    }
    const quarterChart = dc.numberDisplay(divRef);
    quarterChart
    .valueAccessor(getValue)
    .ordering(x=>x.key)
    .group(group);
    return quarterChart
}

export const StatNumber = props => {
    return <ChartTemplate chartFunction={statNumberFunc} title="" params={props.params}/>
}