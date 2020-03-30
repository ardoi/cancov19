import React, { Fragment } from "react";
import { CXContext } from "./cxContext";
import moment from "moment";

export const LastDateDisplay = props => {
    const context = React.useContext(CXContext);
    let cf;
    if (props.params.usedata === "detail") {
        cf = context.cf;
    } else if (props.params.usedata === "deaths") {
        cf = context.cfd;
    }
    const dimension = cf.dimension(d => d.Date);
    const group = dimension.group();
    const vals = group.all();
    const last = moment.max(vals.map(x => x.key)).format("D-MMM");

    return <Fragment>{last}</Fragment>;
};
