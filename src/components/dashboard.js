import React from "react";
import "semantic-ui-css/semantic.min.css";

import { ProvinceChart } from "./provinceChart";
import { TimeChart } from "./timeChart";
import { StatNumber } from "./statNumber";
import { DailyTimeChart } from "./dailyTimeChart";
import { NormalizedChart } from "./normalizedChart";
import { LastDateDisplay } from "./textDisplay";
import DataContext from "./cxContext";
import {
    Grid,
    Tab,
    Segment,
    Label,
    Statistic,
    StatisticValue,
    StatisticLabel,
    GridRow,
    Header,
    HeaderContent,
    Icon
} from "semantic-ui-react";

export const Dashboard = props => {
    const panes_cumulative = [
        {
            menuItem: "Stacked",
            pane: (
                <Tab.Pane attached="top" key={1}>
                    <TimeChart params={{ stacked: true, usedata: "detail" }} />
                </Tab.Pane>
            )
        },
        {
            menuItem: "Total",
            pane: (
                <Tab.Pane attached="top" key={2}>
                    <TimeChart params={{ stacked: false, usedata: "detail" }} />
                </Tab.Pane>
            )
        }
    ];
    const panes_daily = [
        {
            menuItem: "Stacked",
            pane: (
                <Tab.Pane attached="top" key={3}>
                    <DailyTimeChart
                        params={{ stacked: true, usedata: "detail" }}
                    />
                </Tab.Pane>
            )
        },
        {
            menuItem: "Total",
            pane: (
                <Tab.Pane attached="top" key={4}>
                    <DailyTimeChart
                        params={{ stacked: false, usedata: "detail" }}
                    />
                </Tab.Pane>
            )
        }
    ];

    const cases = (
        <Grid>
            <Grid.Row columns={16}>
                {/* <GenderChart/>
            <AgeChart/> */}
                <Grid.Column width={4}>
                    {/* <Checkbox toggle label="Normalize to population"></Checkbox> */}
                    <Grid>
                        <GridRow centered columns={3}>
                            <Grid.Column width={5}>
                                <Statistic size="small">
                                    <StatisticValue>
                                        <StatNumber
                                            params={{
                                                usedata: "detail",
                                                total: true
                                            }}
                                        />
                                    </StatisticValue>
                                    <StatisticLabel>Total cases</StatisticLabel>
                                </Statistic>
                            </Grid.Column>
                            <Grid.Column width={5}>
                                <Statistic size="small">
                                    <StatisticValue>
                                        <StatNumber
                                            params={{
                                                usedata: "detail",
                                                total: false,
                                                date: true
                                            }}
                                        />
                                    </StatisticValue>
                                    <StatisticLabel>New cases</StatisticLabel>
                                    <StatisticLabel>
                                        On{" "}
                                        <LastDateDisplay
                                            params={{ usedata: "detail" }}
                                        />
                                    </StatisticLabel>
                                </Statistic>
                            </Grid.Column>
                        </GridRow>

                        <Grid.Column width={16}>
                            <Segment>
                                <ProvinceChart params={{ usedata: "detail" }} />
                            </Segment>
                        </Grid.Column>
                    </Grid>
                    {/* </Grid> */}
                </Grid.Column>
                <Grid.Column width={6}>
                    <Tab
                        menu={{ secondary: true, pointing: true }}
                        panes={panes_cumulative}
                        renderActiveOnly={false}
                    />
                </Grid.Column>
                <Grid.Column width={6}>
                    <Tab
                        menu={{ secondary: true, pointing: true }}
                        panes={panes_daily}
                        renderActiveOnly={false}
                    />
                    {/* <DailyTimeChart params={{usedata:'detail'}}/> */}
                </Grid.Column>
            </Grid.Row>
            <Grid.Row columns={2}>
                <Grid.Column>{/* <OriginChart/> */}</Grid.Column>
            </Grid.Row>
        </Grid>
    );
    const panes_cumulative_d = [
        {
            menuItem: "Stacked",
            pane: (
                <Tab.Pane attached="top" key={11}>
                    <TimeChart params={{ stacked: true, usedata: "deaths" }} />
                </Tab.Pane>
            )
        },
        {
            menuItem: "Total",
            pane: (
                <Tab.Pane attached="top" key={12}>
                    <TimeChart params={{ stacked: false, usedata: "deaths" }} />
                </Tab.Pane>
            )
        }
    ];
    const panes_daily_d = [
        {
            menuItem: "Stacked",
            pane: (
                <Tab.Pane attached="top" key={13}>
                    <DailyTimeChart
                        params={{ stacked: true, usedata: "deaths" }}
                    />
                </Tab.Pane>
            )
        },
        {
            menuItem: "Total",
            pane: (
                <Tab.Pane attached="top" key={14}>
                    <DailyTimeChart
                        params={{ stacked: false, usedata: "deaths" }}
                    />
                </Tab.Pane>
            )
        }
    ];
    const deaths = (
        <Grid>
            <Grid.Row columns={16}>
                {/* <GenderChart/>
            <AgeChart/> */}
                <Grid.Column width={4}>
                    <Grid>
                        <GridRow centered columns={3}>
                            <Grid.Column width={5}>
                                <Statistic size="small">
                                    <StatisticValue>
                                        <StatNumber
                                            params={{
                                                usedata: "deaths",
                                                total: true
                                            }}
                                        />
                                    </StatisticValue>
                                    <StatisticLabel>
                                        Total deaths
                                    </StatisticLabel>
                                </Statistic>
                            </Grid.Column>
                            <Grid.Column width={5}>
                                <Statistic size="small">
                                    <StatisticValue>
                                        <StatNumber
                                            params={{
                                                usedata: "deaths",
                                                total: false,
                                                date: true
                                            }}
                                        />
                                    </StatisticValue>
                                    <StatisticLabel>New deaths</StatisticLabel>
                                    <StatisticLabel>
                                        On{" "}
                                        <LastDateDisplay
                                            params={{ usedata: "deaths" }}
                                        />
                                    </StatisticLabel>
                                </Statistic>
                            </Grid.Column>
                        </GridRow>
                        <Grid.Column width={16}>
                            <Segment>
                                <ProvinceChart params={{ usedata: "deaths" }} />
                            </Segment>
                        </Grid.Column>
                    </Grid>
                </Grid.Column>
                <Grid.Column width={6}>
                    <Tab
                        menu={{ secondary: true, pointing: true }}
                        panes={panes_cumulative_d}
                        renderActiveOnly={false}
                    />
                </Grid.Column>
                <Grid.Column width={6}>
                    <Tab
                        menu={{ secondary: true, pointing: true }}
                        panes={panes_daily_d}
                        renderActiveOnly={false}
                    />
                    {/* <DailyTimeChart params={{usedata:'detail'}}/> */}
                </Grid.Column>
            </Grid.Row>
            <Grid.Row columns={2}>
                <Grid.Column>{/* <OriginChart/> */}</Grid.Column>
            </Grid.Row>
        </Grid>
    );

    const normalized = (
        <Grid>
            <GridRow centered>
                {/* <Grid.Column width={10}> */}
                <Header as="h2">CASES PER 1M</Header>
                {/* </Grid.Column> */}
            </GridRow>
            <Grid.Row centered columns={5}>
                <Grid.Column width={4}>
                    <Segment>
                        <ProvinceChart
                            params={{ usedata: "detail", normalize: true }}
                        />
                    </Segment>
                </Grid.Column>
                <Grid.Column width={6}>
                    <Segment>
                        <NormalizedChart
                            params={{ usedata: "detail", normalize: true }}
                        />
                    </Segment>
                </Grid.Column>
            </Grid.Row>
        </Grid>
    );
    const normalizedd = (
        <Grid>
            <GridRow centered>
                {/* <Grid.Column width={10}> */}
                <Header as="h2">DEATHS PER 1M</Header>
                {/* </Grid.Column> */}
            </GridRow>
            <Grid.Row centered columns={5}>
                <Grid.Column width={4}>
                    <Segment>
                        <ProvinceChart
                            params={{ usedata: "deaths", normalize: true }}
                        />
                    </Segment>
                </Grid.Column>
                <Grid.Column width={6}>
                    <Segment>
                        <NormalizedChart
                            params={{ usedata: "deaths", normalize: true }}
                        />
                    </Segment>
                </Grid.Column>
            </Grid.Row>
        </Grid>
    );
    const panes = [
        {
            menuItem: "Positive cases",
            pane: (
                <Tab.Pane attached="top" key={1}>
                    {cases}
                </Tab.Pane>
            )
        },
        {
            menuItem: "Deaths",
            pane: (
                <Tab.Pane attached="top" key={2}>
                    {deaths}
                </Tab.Pane>
            )
        },
        {
            menuItem: "Normalized - cases",
            pane: (
                <Tab.Pane attached="top" key={3}>
                    {normalized}
                </Tab.Pane>
            )
        },
        {
            menuItem: "Normalized - deaths",
            pane: (
                <Tab.Pane attached="top" key={3}>
                    {normalizedd}
                </Tab.Pane>
            )
        }
    ];
    return (
        <div>
            <DataContext>
                <Segment color="black" inverted>
                    <Header color="yellow" id="title" textAlign="center">
                        <Icon name="heartbeat" />
                        Canada Covid-19 data visualization
                    </Header>
                </Segment>
                <Segment>
                    <Tab
                        menu={{ secondary: true, pointing: true }}
                        panes={panes}
                        renderActiveOnly={false}
                    />
                </Segment>
                <Segment color="orange">
                    Data source:{" "}
                    <a href="https://virihealth.com/">ViriHealth</a>
                </Segment>
            </DataContext>
        </div>
    );
};
