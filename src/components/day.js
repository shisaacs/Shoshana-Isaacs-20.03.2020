import React from "react";

import {
    Header,
    Segment,
    Grid
} from "semantic-ui-react";

import {
    Sunny,
    PartlyCloudy,
    Cloudy,
    Rain,
    Thunderstorm,
    Snow,
    Clear
} from "../icons"

function getWeatherIcon(weather) {
    switch (weather) {
        case 1:
            return <Sunny />;
        case 2:
        case 3:
        case 4:
        case 5:
        case 20:
        case 21:
            return <PartlyCloudy />;
        case 6:
        case 7:
        case 8:
        case 11:
        case 19:
        case 38:
            return <Cloudy />;
        case 12:
        case 13:
        case 14:
        case 18:
        case 26:
        case 39:
        case 40:
            return <Rain />;
        case 15:
        case 16:
        case 17:
        case 41:
        case 42:
            return <Thunderstorm />
        case 22:
        case 23:
        case 24:
        case 25:
        case 29:
        case 43:
        case 44:
            return <Snow />
        case 33:
        case 34:
        case 35:
        case 36:
        case 37:
            return <Clear />
        default:
            return null;
    }
}

export const Day = ({ header, max, min, weather }) => {

    let minimum = min ? " - " + min + '\u00b0C' : "";

    return (
        <Grid.Column>
            <Segment compact textAlign='center'>
                <Header as="h1">
                    {header}
                </Header>
                <Header as="h2">
                    {max + '\u00b0C' + minimum}
                </Header>
                {getWeatherIcon(weather)}
            </Segment>
        </Grid.Column>
    );
}