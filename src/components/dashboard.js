import React from "react";
import "semantic-ui-css/semantic.min.css";

import DataContext from "./cxContext";
import {CanadaDashboard} from "./canadaDashboard.js"
import {WorldDashboard} from "./worldDashboard.js"
import {
    Tab,
    Segment,
    Header,
    Icon
} from "semantic-ui-react";

export const Dashboard = props => {
    const panes = [
        {
            menuItem: {content:"Canada", key:"canada", icon:'tree'},
            pane: (
                <Tab.Pane attached="top" key={1}>
                    <CanadaDashboard/>
                </Tab.Pane>
            )
        },
        {
            menuItem: {content:"World", key:"world", icon:'globe'},
            pane: (
                <Tab.Pane attached="top" key={2}>
                    <WorldDashboard/>
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
                        Canada+World Covid-19 data visualization
                    </Header>
                </Segment>
                <Segment>
                    <Tab
                        menu={{ secondary: true, pointing: false }}
                        panes={panes}
                        renderActiveOnly={false}
                    />
                </Segment>
                <Segment color="orange">
                    Data source:{" "}
                    <a href="https://github.com/CSSEGISandData/COVID-19" target="_blank"> Johns Hopkins University CSSE</a>
                </Segment>
            </DataContext>
        </div>
    );
};
