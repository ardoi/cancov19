import React, { Component } from "react";
import "dc/dist/style/dc.css";
import { csv } from "d3-fetch";
import moment from "moment";
import crossfilter from "crossfilter2";
export const CXContext = React.createContext("CXContext");

export default class DataContext extends Component {
    state = {
        detailData: null,
        deathData: null,
        dim:null,
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
        this.dimensions = {};
        this.dimensionsD = {};
        const dateFormat = "D-MMM-YYYY";
        const urlBase =
            "https://docs.google.com/spreadsheets/d/1C59nxtgcnwGyo6lgypsgN18duxmwWigjeVdKY58t0mU/gviz/tq?tqx=out:csv&sheet=";
        const url = urlBase + "Old&range=C:G";
        const url2g = urlBase + "Dth&range=B:F";
        this.setState({ loading: true });

        const processDetailData = data => {
            data.forEach(d => {
                d.Date = moment(d.Date + "-2020", dateFormat);
            });
            data = data.filter(x => x.Prov !== "RC");
            const cf = crossfilter(data);
            const clonedData = JSON.parse(JSON.stringify(data));
            clonedData.forEach(x => {
                x.Date = moment(x.Date);
            });
            const cfn = crossfilter(clonedData);

            this.dimensions['date'] = cf.dimension(d => d.Date);
            this.dimensions['dateN'] = cfn.dimension(d => d.Date);
            this.dimensions['prov'] = cf.dimension(d => d.Prov);
            this.dimensions['provN'] = cfn.dimension(d => d.Prov);
            return data;
        };

        const processDeathData = data => {
            data.forEach(d => {
                d.Date = moment(d["Announced\n"] + "-2020", dateFormat);
            });
            data = data.filter(x => x.Prov !== "RC");
            const cfd = crossfilter(data);
            const clonedData = JSON.parse(JSON.stringify(data));
            clonedData.forEach(x => {
                x.Date = moment(x.Date);
            });
            const cfdn = crossfilter(clonedData);
            this.dimensionsD['date'] = cfd.dimension(d => d.Date);
            this.dimensionsD['dateN'] = cfdn.dimension(d => d.Date);
            this.dimensionsD['prov'] = cfd.dimension(d => d.Prov);
            this.dimensionsD['provN'] = cfdn.dimension(d => d.Prov);
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
            console.log("Done fetching data");
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
                    // cf: this.cf,
                    // cfd: this.cfd,
                    // cfn: this.cfn,
                    // cfdn: this.cfdn
                    dimensions: this.dimensions,
                    dimensionsD: this.dimensionsD,
                }}
            >
                <div ref={this.parent}>{this.props.children}</div>
            </CXContext.Provider>
        );
    }
}
