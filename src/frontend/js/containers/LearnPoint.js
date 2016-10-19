import reduxify from 'reduxify';
import * as actions from '../actions/index';
import React, {Component} from 'react';
import {StyleSheet, css} from 'aphrodite';
import palette from '../constants/palette';
import Paper from 'material-ui/Paper';


class LearnPoint extends Component {
  constructor(props){
    super(props);
    this.styles = StyleSheet.create({

      pointText: {
        fontFamily: 'Roboto',
        fontSize: '18px',
        padding: '1vw',
      },
      boldFirstLine:{
        fontWeight: 'bold',
      },
      wrapper: {
        overflow: 'hidden',
        padding: '1vw',
      },
      videoPaper: {
        backgroundColor: palette.white,
        margin: '2vh 2vw',
      },
      videoAndTextWrapper: {
        display: 'flex',
        flexDirection: props.left ? 'row' : 'row-reverse',
        flexFlow: 'flex-start',
        alignItems: 'flex-start',
        alignContent: 'flex-start',
        '@media (max-device-width: 800px)': {
          flexDirection: 'column',
          // paddingBottom: '56.25%',
          /* 16:9 */

          paddingTop: '1vh',
        },
      },

      videoWrapper : {
        padding: '2vw',
        // justifyContent: 'center',
        width: '44vw',

        '@media (max-device-width: 800px)': {
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
        '@media (max-device-width: 800px)': {
          width: 'calc(100% - 2vw)',
          top: '0',
          left: '0',
          height: 'calc(96vw * (9 / 16) )',
        },
      },

    });
  }

  render () {

    const videoBox = (
      <div  ref="video" className={css(this.styles.videoWrapper)}>
        <iframe className={css(this.styles.videoWrapperIframe)} src={this.props.point.video} width="640" height="360" allowFullScreen></iframe>
      </div>);
    const textBox = (
        <div className={css(this.styles.pointText)}>
          {this.props.point.text[this.props.language].map((pgraph, i) => (<div key={"pgraph" + i} className={css(this.styles.pointText, (i === 0) ? this.styles.boldFirstLine : null)}>{pgraph}</div>))}
        </div>
    );

    return (
          <Paper className={css(this.styles.videoPaper)} zDepth={3}>
            <div className={css(this.styles.videoAndTextWrapper)}>
              {videoBox}{textBox}
            </div>
          </Paper>
    );
  }
}

export default reduxify(actions, ['language'], LearnPoint);
