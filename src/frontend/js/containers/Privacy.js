import reduxify from 'reduxify';
import * as actions from '../actions/index';
import React, {Component} from 'react';
import {StyleSheet, css} from 'aphrodite';
import palette from '../constants/palette';
import Paper from 'material-ui/Paper';
import privacyText from '../text/privacy'; // text.
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
    color: palette.white,
    fontSize: "16px",
    lineHeight: "16px",
    marginBottom: "16px",
  },
});






class Privacy extends Component {
  constructor(props){
    super(props);
  }

  render () {
    return (<div>
      <Paper className={css(styles.aboutStyle)} zDepth={1} >
        <div className={css(styles.container)}>
          {privacyText.EN.part1.map((pgraph, i) => (<div key={"pg" + i} className={css(styles.textStyle)}>{pgraph}</div>))}}
          <ul>
            {privacyText.EN.list1.map((bullet, i) => (<li key={"pg" + i} className={css(styles.textStyle)}>{bullet}</li>))}}
          </ul>
          {privacyText.EN.part2.map((pgraph, i) => (<div key={"pg" + i} className={css(styles.textStyle)}>{pgraph}</div>))}}
          <ul>
            {privacyText.EN.list2.map((bullet, i) => (<li key={"pg" + i} className={css(styles.textStyle)}>{bullet}</li>))}}
          </ul>
          {privacyText.EN.part3.map((pgraph, i) => (<div key={"pg" + i} className={css(styles.textStyle)}>{pgraph}</div>))}}
          <ul>
            {privacyText.EN.list3.map((bullet, i) => (<li key={"pg" + i} className={css(styles.textStyle)}>{bullet}</li>))}}
          </ul>
          {privacyText.EN.part4.map((pgraph, i) => (<div key={"pg" + i} className={css(styles.textStyle)}>{pgraph}</div>))}}
        </div>
      </Paper>
    </div>
    );
  }
}

export default reduxify(actions, ['language'], Privacy);
