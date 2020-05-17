import React, { Component } from "react";
import "dc/dist/style/dc.css";
import { csv } from "d3-fetch";
// import { cross, rollups } from "d3-array";
import * as d3a from "d3-array" ;
import moment from "moment";
import crossfilter from "crossfilter2";
export const CXContext = React.createContext("CXContext");

export default class DataContext extends Component {
    state = {
        detailData: null,
        detailDataW: null,
        deathData: null,
        detailDataW: null,
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
        this.dims = {}
        const dateFormat = "D-MMM-YYYY";
        const urlBase =
            "https://docs.google.com/spreadsheets/d/1C59nxtgcnwGyo6lgypsgN18duxmwWigjeVdKY58t0mU/gviz/tq?tqx=out:csv&sheet=";
        const url = urlBase + "Det";
        const url2g = urlBase + "Dth";
        this.setState({ loading: true });

        const processDetailData = data => {
            data.forEach(d => {
                d.Date = moment(d.Date + "-2020", dateFormat);
                d.Total = parseFloat(d.Cases);
            });
            data = data.filter(x => x.Prov !== "RC");
            const cf = crossfilter(data);
            const clonedData = JSON.parse(JSON.stringify(data));
            clonedData.forEach(x => {
                x.Date = moment(x.Date);
            });
            const cfn = crossfilter(clonedData);

            this.dims['detailC']={
                date: cf.dimension(d => d.Date), 
                dateN: cfn.dimension(d => d.Date),
                prov: cf.dimension(d => d.Prov), 
                provN: cfn.dimension(d => d.Prov)
            };
            return data;
        };

        const processDeathData = data => {
            data.forEach(d => {
                d.Date = moment(d["Announced"] + "-2020", dateFormat);
                d.Total = parseFloat(d.Deaths);
            });
            data = data.filter(x => x.Prov !== "RC");
            const cfd = crossfilter(data);
            const clonedData = JSON.parse(JSON.stringify(data));
            clonedData.forEach(x => {
                x.Date = moment(x.Date);
            });
            const cfdn = crossfilter(clonedData);
            this.dims['deathC']={
                date: cfd.dimension(d => d.Date), 
                dateN: cfdn.dimension(d => d.Date),
                prov: cfd.dimension(d => d.Prov), 
                provN: cfdn.dimension(d => d.Prov)
            };
            return data;
        };
        //backup URL's in case there are CORS errors
        const backupUrlBase = "https://cors-anywhere.herokuapp.com/";
        const backupUrl = backupUrlBase + url;
        const backupUrl2 = backupUrlBase + url2g;

        // const p1 = csv(url)
        //     .then(processDetailData)
        //     .catch(error => {
        //         console.log("failed with url", error);
        //         return csv(backupUrl)
        //             .then(processDeathData)
        //             .catch(error => {
        //                 console.log("backuperror 1", error);
        //             });
        //     });

        // const p2 = csv(url2g)
        //     .then(processDeathData)
        //     .catch(error => {
        //         console.log("failed with url2", error);
        //         return csv(backupUrl2)
        //             .then(processDeathData)
        //             .catch(error => {
        //                 console.log("backuperror 2", error);
        //             });
        //     });



        // const urlWorld = "https://rawcdn.githack.com/CSSEGISandData/COVID-19/master/csse_covid_19_data/csse_covid_19_time_series/time_series_covid19_confirmed_global.csv"
        // const urlWorldD = "https://rawcdn.githack.com/CSSEGISandData/COVID-19/master/csse_covid_19_data/csse_covid_19_time_series/time_series_covid19_deaths_global.csv"
        const urlWorld = "https://cdn.jsdelivr.net/gh/CSSEGISandData/COVID-19@master/csse_covid_19_data/csse_covid_19_time_series/time_series_covid19_confirmed_global.csv"

        const urlWorldD = "https://cdn.jsdelivr.net/gh/CSSEGISandData/COVID-19@master/csse_covid_19_data/csse_covid_19_time_series/time_series_covid19_deaths_global.csv"

        const processJHData = (url, key) =>{
            const p = csv(url, {cache:'no-cache'}).then(data => {
                const dd = d3a.cross(data.columns.slice(4), data, (ddate, d) => ({
                        date: ddate,
                        country: d["Country/Region"],
                        region: d["Province/State"] ? d["Province/State"] : null,
                        value: parseFloat(d[ddate]),
                        lat: parseFloat(d.Lat),
                        lon: parseFloat(d.Long)
                    }));
                //World:
                const q = Array.from(
                    d3a.rollups(
                        dd,
                        d => d3a.sum(d, v => +v.value),
                        d => d.country,
                        d => d.date
                    )
                );
                const totals=q.map(x=>{
                    return {country: x[0], total:parseInt(x[1][x[1].length-1][1]) }
                })
                totals.sort((a,b)=>-a.total+b.total);
                const keepAmount = 13; //Number of countries for which to keep data
                const keep = totals.slice(0,keepAmount-3).map(x=>x.country);
                const must_have = ['Canada','Pakistan','Estonia'];
                must_have.forEach(x=>{
                    keep.push(x);
                });
                const out = [];
                q.forEach(x => {
                    const country = x[0];
                    if(keep.includes(country)){
                    for (let i = 0; i < x[1].length; i++) {
                        const total = i === 0 ? x[1][i][1] : x[1][i][1] - x[1][i - 1][1];
                        if(i>0 && total==0){
                            continue
                        }
                        out.push({
                            Prov: country,
                            Date: moment(x[1][i][0],"M/DD/YY"),
                            Total: total
                        });
                    }
                }
                });
                const cfw = crossfilter(out);
                const clonedData = JSON.parse(JSON.stringify(out));
                clonedData.forEach(x => {
                    x.Date = moment(x.Date);
                });
                const cfwn = crossfilter(clonedData);
                this.dims[key+"W"] = {
                    date: cfw.dimension(d => d.Date), 
                    prov: cfw.dimension(d => d.Prov),
                    dateN: cfwn.dimension(d => d.Date), 
                    provN: cfwn.dimension(d => d.Prov)
                };
                //Canada
                const ddc = dd.filter(x=>x.country==="Canada").filter(x=>x.region.indexOf("Princess")===-1);
                // console.log('ddc',ddc)
                const provinceCodes={
                    'Ontario':'ON',
                    'Quebec':'QC',
                    'Alberta':'AB',
                    'British Columbia':'BC',
                    'Nova Scotia':'NS',
                    'Saskatchewan':'SK',
                    'Manitoba':'MB',
                    'Newfoundland and Labrador':'NL',
                    'New Brunswick':'NB',
                    'Prince Edward Island':'PE',
                    'Yukon':'YT',
                    'Northwest Territories':'NT'
                };
                const qc = Array.from(
                    d3a.rollups(
                        ddc,
                        d => d3a.sum(d, v => +v.value),
                        d => provinceCodes[d.region],
                        d => d.date
                    )
                );
                // console.log(qc)
                const totalsc=qc.map(x=>{
                    return {province: x[0], total:parseInt(x[1][x[1].length-1][1]) }
                })
                totalsc.sort((a,b)=>-a.total+b.total);
                const outc = [];
                qc.forEach(x => {
                    const country = x[0];
                    // if(keep.includes(country)){
                    for (let i = 0; i < x[1].length; i++) {
                        const total = i === 0 ? x[1][i][1] : x[1][i][1] - x[1][i - 1][1];
                        if(i>0 && total==0){
                            continue
                        }
                        outc.push({
                            Prov: country,
                            Date: moment(x[1][i][0],"M/DD/YY"),
                            Total: total
                        });
                    }
                // }
                });
                const cfwc = crossfilter(outc);
                const clonedDatac = JSON.parse(JSON.stringify(outc));
                clonedDatac.forEach(x => {
                    x.Date = moment(x.Date);
                });
                const cfwcn = crossfilter(clonedDatac);
                this.dims[key+"C"] = {
                    date: cfwc.dimension(d => d.Date), 
                    prov: cfwc.dimension(d => d.Prov),
                    dateN: cfwcn.dimension(d => d.Date), 
                    provN: cfwcn.dimension(d => d.Prov)
                };
                return [out,outc];
            });
        return p;
        }
        const p3 = processJHData(urlWorld, 'detail');
        const p4 = processJHData(urlWorldD, 'death');
        // Promise.all([p1,p2, p3, p4]).then(x => {
        Promise.all([p3, p4]).then(x => {
            console.log("Done fetching data");

            this.setState({
                loading: false,
                hasCF: true,
                detailData: x[0][1],
                deathData: x[1][1],
                worldDetailData: x[0][0],
                worldDeathData: x[1][0]
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
                    dimensions: this.dims
                }}
            >
                <div ref={this.parent}>{this.props.children}</div>
            </CXContext.Provider>
        );
    }
}
