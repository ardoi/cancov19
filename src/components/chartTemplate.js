import React, { Fragment } from "react";
import { CXContext } from "./cxContext";
import * as dc from "dc";
import { css } from "glamor";
import { Header, Label, Icon, Popup } from "semantic-ui-react";
import { useWindowDimensions} from "../util";

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
    const [chartData, updateChartData] = React.useState({'a':1, 'b':0});
    let dims = context.dimensions[props.params.usedata];
    // if (props.params.usedata === "detail") {
    //     dims = context.dimensions;
    // } else if (props.params.usedata === "deaths") {
    //     dims = context.dimensionsD;
    // }
    const div = React.useRef(null);
    const windowSize = useWindowDimensions()
    React.useEffect(() => {
        const newChart = props.chartFunction(div.current, dims, props.params, windowSize, chartData, updateChartData);

        newChart.render();
        updateChart(newChart);
    }, [props.params, windowSize]);

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
