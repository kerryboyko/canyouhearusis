import {reduxify} from '../util'
import * as actions from '../actions/index';
import React, {Component} from 'react';
import {StyleSheet, css} from 'aphrodite';
import palette from '../constants/palette';
import Paper from 'material-ui/Paper';
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
});






class ThankYou extends Component {
  constructor(props){
    super(props);
  }

  render () {
    return (<div>
      <Paper className={css(styles.aboutStyle)} zDepth={1} >
        <div className={css(styles.container)}>
          {thankYou.map((pgraph, i) => (<div key={"pg" + i} className={css(styles.textStyle)}>{pgraph[this.props.language]}</div>))}
        </div>
        <Social />
      </Paper>
    </div>
    );
  }
}

export default reduxify(actions, ['language'], ThankYou);
