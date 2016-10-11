import reduxify from '../utilities/reduxify';
import * as actions from '../actions/index';
import React, {Component} from 'react';
import ReactDOM, {findDOMNode} from 'react-dom';
import {StyleSheet, css} from 'aphrodite';
import _ from 'lodash';
import palette from '../constants/palette';
import Paper from 'material-ui/Paper';
import RaisedButton from 'material-ui/RaisedButton';
import ShareIcon from 'material-ui/svg-icons/social/share';
import facebookIconSVG from '../../img/facebookIcon.svg';
import twitterIconSVG from '../../img/twitterIcon.svg';
import IconButton from 'material-ui/IconButton';
import SvgIcon from 'material-ui/SvgIcon';
import LearnPoint from './LearnPoint';
import aboutTexts from '../text/aboutTexts'; // text.
import Header from './Header';
import DonateDialog from './DonateDialog';
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
        <div className={css(styles.container)}>
          {aboutTexts.map((pgraph, index) => (<div key={'pgraph' + index} className={css(styles.textStyle)}>{pgraph[this.props.language]}</div>))}
        </div>
        <div className={css(styles.buttonStyle)}>
        <DonateDialog
          backgroundColor={palette.iceFlagRed}
          style={{margin: 'auto', marginTop: '20px', marginBottom: '20px', width: '25%', height: '7vh'}}
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

export default reduxify(actions, ['language'], About);
