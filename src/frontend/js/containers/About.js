import reduxify from '../utilities/reduxify';
import * as actions from '../actions/index';
import React, {Component} from 'react';
import {StyleSheet, css} from 'aphrodite';
import palette from '../constants/palette';

import Paper from 'material-ui/Paper';
import DonateDialog from './DonateDialog';

import Social from './Social';

import labels from '../text/labels';
import {main, us} from '../text/aboutTexts'; // text.

const styles = StyleSheet.create({
  aboutStyle: {
    minHeight: 'calc(96vh - 56px)',
    backgroundColor: palette.transparent,
    width: '100%',
    padding: '3vw',
  },
  container: {
    maxWidth: '800px',
    padding: '2vw',
    margin: '0 auto',
    backgroundColor: palette.heroBackground,
  },
  us: {
    padding: '2vw',
    backgroundColor: palette.iceFlagBlue,
    fontFamily: "Roboto Condensed",
    color: palette.white,
  },
  textStyle: {
    fontFamily: "Roboto",
    fontWeight: '300',
    color: palette.white,
    fontSize: "26px",
    lineHeight: "30px",
    marginBottom: "30px",
  },
  buttonStyle: {
    margin: 'auto',
    textAlign: 'center',
  }
});






class About extends Component {
  constructor(props){
    super(props);
  }

  render () {
    return (<div>
      <Paper className={css(styles.aboutStyle)} zDepth={1} >
        <Paper zDepth={5} className={css(styles.container)}>
          {main.map((pgraph, index) => (<div key={'pgraph' + index} className={css(styles.textStyle)}>{pgraph[this.props.language]}</div>))}
          <Paper zDepth={5} className={css(styles.us)}>
            {us[this.props.language]}
          </Paper>
        </Paper>
        <div className={css(styles.buttonStyle)}>
        <DonateDialog
          backgroundColor={palette.iceFlagRed}
          style={{margin: 'auto', marginTop: '20px', marginBottom: '20px', width: '25%', height: '7vh'}}
          labelStyle={{fontWeight: '900',  lineHeight: '7vh', fontSize: "4vh", fontFamily: "Roboto Condensed", color: palette.white }}
          label={labels.donate[this.props.language]}
          />
        </div>
        <Social />

      </Paper>
    </div>
    );
  }
}

export default reduxify(actions, ['language'], About);
