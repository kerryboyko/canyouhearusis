import React, {Component} from 'react';
import reduxify from 'reduxify';
import * as actions from '../actions/index';
import palette from '../constants/palette';
import {StyleSheet, css} from 'aphrodite';
import ProgressMeter from '../components/ProgressMeter'

class ProgressBar extends Component {
  constructor(props){
    super(props);
    this.state = {
      progress: 70,
    };
  }

  render() {
    return (
      <div><ProgressMeter completed={10} width={50} height={20}/></div>
    );
  }
}

export default reduxify(actions, ['language'], ProgressBar);
