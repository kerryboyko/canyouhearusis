import reduxify from 'reduxify';
import * as actions from '../actions/index';
import React, {Component} from 'react';
import {StyleSheet, css} from 'aphrodite';
import palette from '../constants/palette';
import Paper from 'material-ui/Paper';
import partyText from '../text/partyText';
const statement = partyText.statement;
const bfLogo = '../../img/partyLogos/bright_future.png';
const lgLogo = '../../img/partyLogos/left_green.png';
const ppLogo = '../../img/partyLogos/Piratar.png';
const xsLogo = '../../img/partyLogos/xs.png';


class Statement extends Component {
  constructor(props){
    super(props);
  }

  render () {
    return (
          <Paper className={css(styles.videoPaper)} zDepth={3}>
            <img src={bfLogo} />
            <img src={lgLogo} />
            <img src={ppLogo} />
            <img src={xsLogo} />
            {statement[this.props.language]}
          </Paper>
    );
  }
}

export default reduxify(actions, ['language'], Statement);
