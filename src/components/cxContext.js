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
        const urlBase =
            "https://docs.google.com/spreadsheets/d/1C59nxtgcnwGyo6lgypsgN18duxmwWigjeVdKY58t0mU/gviz/tq?tqx=out:csv&sheet=";
        const url = urlBase + "DT&range=C:G";
        const url2g = urlBase + "Dth&range=B:F";
        const url2 =
            "https://docs.googe.com/spreadsheets/d/1C59nxtgcnwGyo6lgypsgN18duxmwWigjeVdKY58t0mU/gviz/tq?tqx=out:csv&sheet=";
        this.setState({ loading: true });

        const processDetailData = data => {
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
            return data;
        };

        const processDeathData = data => {
            console.log(data);
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
            return data;
        };
        //backup URL's in case there are CORS errors
        const backupUrlBase = "https://cors-anywhere.herokuapp.com/";
        const backupUrl = backupUrlBase + url;
        const backupUrl2 = backupUrlBase + url2g;

        const p1 = csv(url)
            .then(processDetailData)
            .catch(error => {
                console.log("failed with url", error);
                return csv(backupUrl)
                    .then(processDeathData)
                    .catch(error => {
                        console.log("backuperror 1", error);
                    });
            });

        const p2 = csv(url2g)
            .then(processDeathData)
            .catch(error => {
                console.log("failed with url2", error);
                return csv(backupUrl2)
                    .then(processDeathData)
                    .catch(error => {
                        console.log("backuperror 2", error);
                    });
            });

        Promise.all([p1, p2]).then(x => {
            console.log("all done", x);
            this.setState({
                loading: false,
                hasCF: true,
                detailData: x[0],
                deathData: x[1]
            });
        });
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
