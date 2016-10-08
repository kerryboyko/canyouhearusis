import React, { Component } from 'react';
import * as actions from '../actions/index';
import reduxify from 'reduxify';
import Header from './Header';
import Hero from './Hero';


class App extends Component {
  constructor(props){
    super(props);
  }

  render() {
    return (
      <div>
        <Header />
        <Hero />
      </div>
    );
  }
}

export default reduxify(actions, ['language'], App);
