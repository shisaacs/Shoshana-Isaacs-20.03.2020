import React from "react";

import {
    Header,
    Button,
    Segment,
    Search,
    Message,
    Grid,
    Icon
} from 'semantic-ui-react'

import {
    filter,
    debounce,
    map
} from "lodash"

import moment from "moment";

import { Day } from "./";

class Home extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            fav: JSON.parse(localStorage.getItem("weatherFav")), source: []
        };
    }

    fetchAutocomplete(value) {
        fetch(`http://dataservice.accuweather.com/locations/v1/cities/autocomplete?apikey=MzXJNjffBwTEExu6A7IMmqv5WUhQz7WQ&q=${value}`)
            .then(res =>
                res.json()
            )
            .then(result => {
                this.setState({
                    source: map(result,
                        (city) => {
                            return {
                                key: city.Key,
                                title: city.LocalizedName
                            }
                        }
                    )
                });
            }
            )
    }

    fetchForecast(key) {
        fetch(`http://dataservice.accuweather.com/forecasts/v1/daily/5day/${key}?apikey=MzXJNjffBwTEExu6A7IMmqv5WUhQz7WQ&metric=true`)
            .then(res =>
                res.json()
            )
            .then(result => {
                this.setState({
                    now: result.Headline,
                    forecast: result.DailyForecasts
                });
            }
            )
    }

    handleResultSelect = (e, { result }) => this.setState({ value: result.title, key: result.key }, () => {
        this.fetchForecast(this.state.key)
    })

    handleSearchChange = (e, { value }) => {
        e.persist()
        this.setState({ isLoading: true, value })

        setTimeout(() => {
            if (this.state.value.length < 1) return this.setState({})

            const re = new RegExp("^" + this.state.value + ".*", 'i')
            const isMatch = (result) => {
                return re.test(result.title)
            }

            this.fetchAutocomplete(e.target.value);

            this.setState({
                isLoading: false,
                results: filter(this.state.source, isMatch),
            })
        }, 300)
    }

    toggleFavourite = () => {
        let fav = this.state.fav;
        if (fav) {
            if (fav.find(element => element.key === this.state.key)) {
                this.setState({ fav: fav.filter((favCode) => favCode.key !== this.state.key) },
                    () =>
                        localStorage.setItem("weatherFav", JSON.stringify(this.state.fav))
                )
            }
            else {
                fav.push({ city: this.state.value, key: this.state.key })
                this.setState({ fav: fav },
                    () => {
                        localStorage.setItem("weatherFav", JSON.stringify(this.state.fav))
                    })
            }
        } else {
            this.setState({ fav: [{ city: this.state.value, key: this.state.key }] },
                () => {
                    localStorage.setItem("weatherFav", JSON.stringify(this.state.fav))
                })
        }
    }

    componentDidMount() {
        if (!this.state.value) {
            this.fetchForecast("215854")
        }
    }

    render() {

        const { value, results } = this.state

        return (<>
            <Segment basic style={{ textAlign: "center" }}>
                <Search
                    onResultSelect={this.handleResultSelect}
                    onSearchChange={debounce(this.handleSearchChange, 500, {
                        leading: true,
                    })}
                    results={results}
                    value={value}
                    resultRenderer={({ title }) => <p>{title}</p>}
                    {...this.props}
                />
            </Segment>
            {this.state.error ? <Segment basic>
                <Message negative>
                    <Message.Header>There was an error fetching the data</Message.Header>
                </Message>
            </Segment> :
                this.state.now && <Segment basic>
                    <Grid centered columns={2}>
                        <Grid.Column>
                            <Segment textAlign='center'>
                                <Header as="h1">
                                    {this.state.value ? this.state.value : "Tel Aviv"}
                                </Header>
                                <Button basic circular icon style={{ position: "absolute", right: "1rem", top: "1rem" }} onClick={this.toggleFavourite} size='massive'>
                                    {
                                        this.state.fav && this.state.fav.find(element => element.key === this.state.key) ?
                                            <Icon name='star' color="yellow" style={{ outline: "none" }} /> :
                                            <Icon name='star outline' color="black" style={{ outline: "none" }} />
                                    }
                                </Button>
                                <Header as="h2">
                                    {this.state.now.Text}
                                </Header>
                            </Segment>
                        </Grid.Column>
                        <Grid.Row centered columns={5}>
                            <Day header={moment(this.state.forecast[0].Date).format("dddd")} max={this.state.forecast[0].Temperature.Maximum.Value} min={this.state.forecast[0].Temperature.Minimum.Value} weather={this.state.forecast[0].Day.Icon} />
                            <Day header={moment(this.state.forecast[1].Date).format("dddd")} max={this.state.forecast[1].Temperature.Maximum.Value} min={this.state.forecast[1].Temperature.Minimum.Value} weather={this.state.forecast[1].Day.Icon} />
                            <Day header={moment(this.state.forecast[2].Date).format("dddd")} max={this.state.forecast[2].Temperature.Maximum.Value} min={this.state.forecast[2].Temperature.Minimum.Value} weather={this.state.forecast[2].Day.Icon} />
                            <Day header={moment(this.state.forecast[3].Date).format("dddd")} max={this.state.forecast[3].Temperature.Maximum.Value} min={this.state.forecast[3].Temperature.Minimum.Value} weather={this.state.forecast[3].Day.Icon} />
                            <Day header={moment(this.state.forecast[4].Date).format("dddd")} max={this.state.forecast[4].Temperature.Maximum.Value} min={this.state.forecast[4].Temperature.Minimum.Value} weather={this.state.forecast[4].Day.Icon} />
                        </Grid.Row>
                    </Grid>
                </Segment >}
        </>
        );
    }
}

export default Home;