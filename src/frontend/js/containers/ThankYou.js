import reduxify from '../utilities/reduxify';
import * as actions from '../actions/index';
import React, {Component} from 'react';
import {StyleSheet, css} from 'aphrodite';
import palette from '../constants/palette';
import Paper from 'material-ui/Paper';
import RaisedButton from 'material-ui/RaisedButton';
import thankYou from '../text/thankYou'; // text.
import Social from './Social';

const styles = StyleSheet.create({
  aboutStyle: {
    minHeight: 'calc(96vh - 56px)',
    backgroundColor: palette.heroBackground,
    width: '100%',
    padding: '3vw',
  },
  container: {
    maxWidth: '800px',
    margin: '0 auto'
  },
  textStyle: {
    fontFamily: "Roboto",
    fontWeight: '300',
    color: palette.white,
    fontSize: "26px",
    lineHeight: "24px",
    marginBottom: "24px",
  },
  buttonStyle: {
    margin: 'auto',
    textAlign: 'center',
  }
});






class ThankYou extends Component {
  constructor(props){
    super(props);
  }

  render () {
    return (<div>
      <Paper className={css(styles.aboutStyle)} zDepth={1} >
        <div className={css(styles.container)}>
          {thankYou.map((pgraph) => (<div className={css(styles.textStyle)}>{pgraph[this.props.language]}</div>))}
        </div>
        <div className={css(styles.buttonStyle)}>
          <RaisedButton
          backgroundColor={palette.iceFlagRed}
          style={{margin: 'auto', height: '7vh'}}
          labelStyle={{fontWeight: '900',  lineHeight: '7vh', fontSize: "4vh", fontFamily: "Roboto Condensed", color: palette.white }}
          label="Donate"
          />
        </div>
        <Social />
      </Paper>
    </div>
    );
  }
}

export default reduxify(actions, ['language'], ThankYou);
