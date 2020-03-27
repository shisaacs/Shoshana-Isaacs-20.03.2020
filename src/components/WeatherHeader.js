import React from "react";

import {
    Header,
    Segment,
    Button
} from "semantic-ui-react";


export const WeatherHeader = ({ page, onClick }) => {

    return (
        <Segment basic inverted>
            <Header as="h1" textAlign='left'>
                Herolo Weather Task
        <Button.Group style={{ float: "right" }}>
                    <Button active={page === "home"} onClick={onClick}>Home</Button>
                    <Button active={page === "fav"} onClick={onClick}>Favourites</Button>
                </Button.Group>
            </Header>
        </Segment>
    );
}
