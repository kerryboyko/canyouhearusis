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
import Header from './Header';
import points from '../text/learnTexts';


const styles = StyleSheet.create({
  learnStyle: {
    backgroundColor: palette.learnBackground,
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
  },
  point: {
    fontFamily: 'Roboto Condensed',
    fontWeight: '700',

  },
  wrapper: {
    overflow: 'hidden',
    padding: '1vw',
  },
  headlineStyle: {
    color: 'white',
    fontFamily: "Roboto Condensed",
    fontWeight: '900',
    fontSize: '15vh',
    margin: '2vh 0',
    padding: '1vh 2vw',
    '@media (max-width: 800px)': {
      fontSize: '7vh'
    }
  },
  subheadline: {
    color: 'white',
    fontFamily: 'Roboto',
    fontSize: '2vw',
    margin: '2vh 4vw',
  },
  videoPaper: {
    backgroundColor: palette.videoPaper,
    margin: '2vh 2vw',
    width: '90vw',
  },
  videoAndTextWrapper: {
    display: 'flex',
    flexDirection: 'row',
    flexFlow: 'flex-start',
    alignItems: 'flex-start',
    alignContent: 'flex-start',
    '@media (max-width: 800px)': {
      flexDirection: 'column',
      // paddingBottom: '56.25%',
      /* 16:9 */

      paddingTop: '1vh',
    },
  },
  videoText: {
    padding: '2vw',
  },
  videoWrapper : {
    padding: '2vw',
    // justifyContent: 'center',
    width: '44vw',

    '@media (max-width: 800px)': {
      position: 'relative',
      // paddingBottom: '56.25%',
      /* 16:9 */
      margin: '2vw',
      width: 'calc(100% - 2vw)',

      paddingTop: '1vh',
    },
  },
  videoWrapperIframe : {
    width: 'calc(40vw)',
    height: 'calc(40vw * (9 / 16))',
    '@media (max-width: 800px)': {
      width: 'calc(100% - 2vw)',
      top: '0',
      left: '0',
      height: 'calc(96vw * (9 / 16) )',
    },
  },

});

class Learn extends Component {
  constructor(props){
    super(props);
  }

  render () {
    return (<div>
      <Paper className={css(styles.learnStyle)} zDepth={1} >
        <div className={css(styles.wrapper)}>
          {points.map((point, index) => (<LearnPoint key={"point-num-" + index} point={point}/>))}
        </div>
      </Paper>
    </div>
    );
  }
}

export default reduxify(actions, ['language'], Learn);
