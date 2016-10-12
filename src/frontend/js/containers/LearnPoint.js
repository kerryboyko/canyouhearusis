import reduxify from '../utilities/reduxify';
import * as actions from '../actions/index';
import React, {Component} from 'react';
import {StyleSheet, css} from 'aphrodite';
import palette from '../constants/palette';
import Paper from 'material-ui/Paper';

const styles = StyleSheet.create({

  pointHead: {
    fontFamily: 'Roboto Condensed',
    fontWeight: '700',
    fontSize: '1.5em',
    marginBottom: "0.75em",
  },
  pointText: {
    fontFamily: 'Roboto',

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

class LearnPoint extends Component {
  constructor(props){
    super(props);
  }

  render () {
    return (
          <Paper className={css(styles.videoPaper)} zDepth={3}>
            <div className={css(styles.videoAndTextWrapper)}>
              <div  ref="video" className={css(styles.videoWrapper)}>
                <iframe className={css(styles.videoWrapperIframe)} src={this.props.point.video} width="640" height="360" allowFullScreen></iframe>
              </div>
              <div className={css(styles.videoText)} >
                <div className={css(styles.pointHead)}>
                  {this.props.point.head[this.props.language]}
                </div>
                <div className={css(styles.pointText)}>
                  {this.props.point.text[this.props.language]}
                </div>
              </div>
            </div>
          </Paper>
    );
  }
}

export default reduxify(actions, ['language'], LearnPoint);
