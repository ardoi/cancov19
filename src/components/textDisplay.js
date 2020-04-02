import React, { Fragment } from "react";
import { CXContext } from "./cxContext";
import moment from "moment";

export const LastDateDisplay = props => {
    const context = React.useContext(CXContext);
    let dimension;
    if (props.params.usedata === "detail") {
        dimension = context.dimensions['date'];
    } else if (props.params.usedata === "deaths") {
        dimension = context.dimensionsD['date'];
    }
    // const dimension = cf.dimension(d => d.Date);
    const group = dimension.group();
    const vals = group.all();
    const last = moment.max(vals.map(x => x.key)).format("D-MMM");

    return <Fragment>{last}</Fragment>;
};
