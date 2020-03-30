import React, { Fragment } from "react";
import { CXContext } from "./cxContext";
import * as dc from "dc";
import { css } from "glamor";
import { Header, Label, Icon, Popup } from "semantic-ui-react";

const ResetButton = props => {
    const style = css({
        cursor: "pointer"
    });
    return (
        <Label
            {...style}
            onClick={() => {
                props.chart.filterAll();
                dc.redrawAll();
            }}
        >
            reset
        </Label>
    );
};
export const ChartTemplate = props => {
    const context = React.useContext(CXContext);
    const [chart, updateChart] = React.useState(null);
    let cf;
    if (props.params.usedata === "detail") {
        cf = context.cf;
        if (props.params.normalize) {
            cf = context.cfn;
        }
    } else if (props.params.usedata === "deaths") {
        cf = context.cfd;
        if (props.params.normalize) {
            cf = context.cfdn;
        }
    }
    const div = React.useRef(null);
    React.useEffect(() => {
        const newChart = props.chartFunction(div.current, cf, props.params);

        newChart.render();
        updateChart(newChart);
    }, [props.params]);

    let button;
    let label;
    if (props.reset) {
        button = <ResetButton chart={chart} />;
        label= <Popup content="Pick province(s) to filter results and click Reset to restore defaults" trigger={<Label circular color='teal'>?</Label>}/>
    }
    let header;
    if (props.title) {
        header = (
            <Header as="h3">
                {props.title}
                {button}
                {label}
            </Header>
        );
    }

    return (
        <Fragment>
            {header}
            <div ref={div}></div>
        </Fragment>
    );
};
