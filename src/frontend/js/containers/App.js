import React, { Component } from 'react';
import * as actions from '../actions/index';
import reduxify from 'reduxify';
import HeaderBar from './HeaderBar';
import ProgressBar from './ProgressBar';
import DonationBox from './DonationBox';

class App extends Component {
  constructor(props){
    super(props);
  }

  render() {
    return (
      <div>
        <HeaderBar />
        <ProgressBar />
        <DonationBox />
      </div>
    );
  }
}

export default reduxify(actions, [], App);
