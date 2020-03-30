import React, { Component } from "react";
import "dc/dist/style/dc.css";
import { csv } from "d3-fetch";
import moment from "moment";
import * as crossfilter from "crossfilter";
export const CXContext = React.createContext("CXContext");

export default class DataContext extends Component {
    state = {
        detailData: null,
        deathData: null,
        loading: false,
        hasCF: false
    };
    componentDidMount() {
        if (this.state.hasCF) {
            return;
        }
        if (this.state.loading) {
            return;
        }
        const dateFormat = "D-MMM-YYYY";
        const url =
            "https://docs.google.com/spreadsheets/d/1C59nxtgcnwGyo6lgypsgN18duxmwWigjeVdKY58t0mU/gviz/tq?tqx=out:csv&sheet=Detail";
        const url2 =
            "https://docs.google.com/spreadsheets/d/1C59nxtgcnwGyo6lgypsgN18duxmwWigjeVdKY58t0mU/gviz/tq?tqx=out:csv&sheet=Dth";
        this.setState({ loading: true });
        csv(url)
            .then(data => {
                data.forEach(d => {
                    d.Date = moment(d.Date + "-2020", dateFormat);
                });
                data = data.filter(x => x.Prov !== "RC");
                this.cf = crossfilter(data);
                const clonedData = JSON.parse(JSON.stringify(data));
                clonedData.forEach(x => {
                    x.Date = moment(x.Date);
                });
                this.cfn = crossfilter(clonedData);
                this.setState({ detailData: data });
            })
            .then(() =>
                csv(url2).then(data => {
                    data.forEach(d => {
                        d.Date = moment(d["Announced\n"] + "-2020", dateFormat);
                    });
                    data = data.filter(x => x.Prov !== "RC");
                    this.cfd = crossfilter(data);
                    const clonedData = JSON.parse(JSON.stringify(data));
                    clonedData.forEach(x => {
                        x.Date = moment(x.Date);
                    });
                    this.cfdn = crossfilter(clonedData);
                    this.setState({
                        loading: false,
                        hasCF: true,
                        deathData: data
                    });
                })
            );
    }
    render() {
        if (!this.state.hasCF) {
            return null;
        }
        return (
            <CXContext.Provider
                value={{
                    cf: this.cf,
                    cfd: this.cfd,
                    cfn: this.cfn,
                    cfdn: this.cfdn
                }}
            >
                <div ref={this.parent}>{this.props.children}</div>
            </CXContext.Provider>
        );
    }
}
