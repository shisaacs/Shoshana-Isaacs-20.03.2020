import React from "react";

import {
    Segment,
    Grid,
    Message
} from 'semantic-ui-react'

import {
    map
} from "lodash"

import { Day } from "./";

class Favourites extends React.Component {

    constructor(props) {
        super(props);
        this.state = { fav: JSON.parse(localStorage.getItem("weatherFav")) }
    };

    fetchFav(fav) {
        fetch(`http://dataservice.accuweather.com/currentconditions/v1/${fav.key}?apikey=MzXJNjffBwTEExu6A7IMmqv5WUhQz7WQ`)
            .then(res =>
                res.json()
            )
            .then(result => {
                this.setState({ [fav.city]: { city: fav.city, result: result[0] } });
            }
            ).catch(
                this.setState({ [fav.city]: { error: true } })
            )
    }

    fetchFaves() {
        this.state.fav.forEach((fav) => {
            this.fetchFav(fav)
        })
    }

    componentWillMount() {
        this.fetchFaves();
    }

    render() {

        const items = map(this.state.fav, fav => {
            return this.state[fav.city] && this.state[fav.city].error ? <Grid.Column key={fav.key}><Segment basic>
                <Message negative>
                    <Message.Header>There was an error fetching the data for {fav.city}</Message.Header>
                </Message>
            </Segment>
            </Grid.Column> : <Day key={fav.key} header={this.state[fav.city].city} max={this.state[fav.city].result.Temperature.Metric.Value} weather={this.state[fav.city].result.WeatherIcon} />
        }
        )

        return (<>
            <Segment basic style={{ textAlign: "center" }}>
                <Grid>
                    <Grid.Row centered columns={5}>
                        {items}
                    </Grid.Row>
                </Grid>
            </Segment >
        </>
        );
    }
}

export default Favourites;