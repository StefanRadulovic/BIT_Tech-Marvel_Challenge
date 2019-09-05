import React, { Component } from 'react';
import './App.css';

import Header from '../partials/Header'
import ShowHeroes from './Heroes/ShowHeroes'

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isList: false
    }
  }

  onClickHandler = () => {
    this.setState((prevState) => {

      return { isList: !prevState.isList }
    });
  }
  render() {
    return (
      <div>
        <Header onClickHandler={this.onClickHandler} isList={this.state.isList} />
        <ShowHeroes isList={this.state.isList} />
      </div>
    );
  }
}

export default App;
