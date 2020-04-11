import React, {Fragment} from "react";
import "semantic-ui-css/semantic.min.css";

import { ProvinceChart } from "./provinceChart";
import { TimeChart } from "./timeChart";
import { StatNumber } from "./statNumber";
import { DailyTimeChart } from "./dailyTimeChart";
import { NormalizedChart } from "./normalizedChart";
import { LastDateDisplay } from "./textDisplay";
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

export const CanadaDashboard = props => {
    const panes_cumulative = [
        {
            menuItem: "Stacked",
            pane: (
                <Tab.Pane attached="top" key={1}>
                    <TimeChart params={{ stacked: true, usedata: "detailC" ,loc:"Province"  }} />
                </Tab.Pane>
            )
        },
        {
            menuItem: "Total",
            pane: (
                <Tab.Pane attached="top" key={2}>
                    <TimeChart params={{ stacked: false, usedata: "detailC" ,loc:"Province"  }} />
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
                        params={{ stacked: true, usedata: "detailC" ,loc:"Province"  }}
                    />
                </Tab.Pane>
            )
        },
        {
            menuItem: "Total",
            pane: (
                <Tab.Pane attached="top" key={4}>
                    <DailyTimeChart
                        params={{ stacked: false, usedata: "detailC" ,loc:"Province"  }}
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
                        <GridRow centered columns={1}>
                            <Grid.Column width={6}>
                                <Statistic centered size="small">
                                    <StatisticValue>
                                        <StatNumber
                                            params={{
                                                usedata: "detailC",
                                                total: true
                                            }}
                                        />
                                    </StatisticValue>
                                    <StatisticLabel>Total cases</StatisticLabel>
                                </Statistic>
                            </Grid.Column>
                            <Grid.Column width={6}>
                                <Statistic size="small">
                                    <StatisticValue>
                                        <StatNumber
                                            params={{
                                                usedata: "detailC",
                                                total: false,
                                                date: true
                                            }}
                                        />
                                    </StatisticValue>
                                    <StatisticLabel>New cases</StatisticLabel>
                                    <StatisticLabel>
                                        On{" "}
                                        <LastDateDisplay
                                            params={{ usedata: "detailC" }}
                                        />
                                    </StatisticLabel>
                                </Statistic>
                            </Grid.Column>
                        </GridRow>

                        <Grid.Column width={16}>
                            <Segment>
                                <ProvinceChart params={{ usedata: "detailC",loc:"Province"  }} />
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
                    {/* <DailyTimeChart params={{usedata:'detailC'}}/> */}
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
                    <TimeChart params={{ stacked: true, usedata: "deathC" ,loc:"Province"  }} />
                </Tab.Pane>
            )
        },
        {
            menuItem: "Total",
            pane: (
                <Tab.Pane attached="top" key={12}>
                    <TimeChart params={{ stacked: false, usedata: "deathC" ,loc:"Province"  }} />
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
                        params={{ stacked: true, usedata: "deathC" ,loc:"Province"  }}
                    />
                </Tab.Pane>
            )
        },
        {
            menuItem: "Total",
            pane: (
                <Tab.Pane attached="top" key={14}>
                    <DailyTimeChart
                        params={{ stacked: false, usedata: "deathC" ,loc:"Province"  }}
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
                            <Grid.Column width={6}>
                                <Statistic size="small">
                                    <StatisticValue>
                                        <StatNumber
                                            params={{
                                                usedata: "deathC",
                                                total: true
                                            }}
                                        />
                                    </StatisticValue>
                                    <StatisticLabel>
                                        Total casualties
                                    </StatisticLabel>
                                </Statistic>
                            </Grid.Column>
                            <Grid.Column width={6}>
                                <Statistic size="small">
                                    <StatisticValue>
                                        <StatNumber
                                            params={{
                                                usedata: "deathC",
                                                total: false,
                                                date: true
                                            }}
                                        />
                                    </StatisticValue>
                                    <StatisticLabel>New casualties</StatisticLabel>
                                    <StatisticLabel>
                                        On{" "}
                                        <LastDateDisplay
                                            params={{ usedata: "deathC" }}
                                        />
                                    </StatisticLabel>
                                </Statistic>
                            </Grid.Column>
                        </GridRow>
                        <Grid.Column width={16}>
                            <Segment>
                                <ProvinceChart params={{ usedata: "deathC",loc:"Province" }} />
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
                    {/* <DailyTimeChart params={{usedata:'detailC'}}/> */}
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
                            params={{ usedata: "detailC", normalize: true, loc:"Province" }}
                        />
                    </Segment>
                </Grid.Column>
                <Grid.Column width={6}>
                    <Segment>
                        <NormalizedChart
                            params={{ usedata: "detailC", normalize: true, loc:"Province" }}
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
                <Header as="h2">CASUALTIES PER 1M</Header>
                {/* </Grid.Column> */}
            </GridRow>
            <Grid.Row centered columns={5}>
                <Grid.Column width={4}>
                    <Segment>
                        <ProvinceChart
                            params={{ usedata: "deathC", normalize: true,loc:"Province"  }}
                        />
                    </Segment>
                </Grid.Column>
                <Grid.Column width={6}>
                    <Segment>
                        <NormalizedChart
                            params={{ usedata: "deathC", normalize: true,loc:"Province"  }}
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
                <Tab.Pane attached="top" key={1} className="plotPane">
                    {cases}
                </Tab.Pane>
            )
        },
        {
            menuItem: "Casualties",
            pane: (
                <Tab.Pane attached="top" key={2} className="plotPane">
                    {deaths}
                </Tab.Pane>
            )
        },
        {
            menuItem: "Cases per million",
            pane: (
                <Tab.Pane attached="top" key={3} className="plotPane">
                    {normalized}
                </Tab.Pane>
            )
        },
        {
            menuItem: "Casualties per million",
            pane: (
                <Tab.Pane attached="top" key={4} className="plotPane">
                    {normalizedd}
                </Tab.Pane>
            )
        }
    ];
    return (
        <Fragment>
                <Tab
                    menu={{ secondary: true, pointing: true, borderless:true, attached:false, tabular:false }}
                    panes={panes}
                    renderActiveOnly={false}
                />
        </Fragment>
    );
};
