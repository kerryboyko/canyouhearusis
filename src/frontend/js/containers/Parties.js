import reduxify from 'reduxify';
import * as actions from '../actions/index';
import React, {Component} from 'react';
import {StyleSheet, css} from 'aphrodite';
import palette from '../constants/palette';
import Paper from 'material-ui/Paper';
import partyText from '../text/partyText';
import Statement from './Statement';

class Parties extends Component {
  constructor(props){
    super(props);
  }

  render () {
    return (
          <Paper className={css(styles.videoPaper)} zDepth={3}>
            <Statement />
          </Paper>
    );
  }
}

export default reduxify(actions, ['language'], Parties);
