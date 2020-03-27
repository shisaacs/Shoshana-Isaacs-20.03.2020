import React from 'react';
import './App.css';

import {
  Header,
  Button,
  Segment
} from 'semantic-ui-react'


import Home from "./components/home";
import Favourites from "./components/favourites";


class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      page: "home"
    };
  }


  render() {

    return (
      <Segment basic style={{ padding: "0" }}>
        <Segment basic inverted>
          <Header as="h1" textAlign='left'>
            Herolo Weather Task
        <Button.Group style={{ float: "right" }}>
              <Button active={this.state.page === "home"} onClick={() => this.setState({ page: "home" })}>Home</Button>
              <Button active={this.state.page === "fav"} onClick={() => this.setState({ page: "fav" })}>Favourites</Button>
            </Button.Group>
          </Header>
        </Segment>
        {this.state.page === "home" ? <Home /> : <Favourites />}
      </Segment >
    );
  }
}

export default App;
