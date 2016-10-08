import React, { Component } from 'react';
import * as actions from '../actions/index';
import reduxify from 'reduxify';
import Header from './Header';
import Hero from './Hero';
import Learn from './Learn';
import About from './About';
import TheConstitution from './TheConstitution';


class App extends Component {
  constructor(props){
    super(props);
  }

  render() {
    return (
      <div>
        <Header />
        <Hero />
        <Learn />
        <About />
        <TheConstitution />
      </div>
    );
  }
}

export default reduxify(actions, ['language'], App);
