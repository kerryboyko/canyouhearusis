import reduxify from '../utilities/reduxify';
import * as actions from '../actions/index';
import React, {Component} from 'react';
import {StyleSheet, css} from 'aphrodite';
import palette from '../constants/palette';
import Paper from 'material-ui/Paper';
import BadSVG from '../../img/sad';
import GoodSVG from '../../img/joy';
import NeutralSVG from '../../img/confused';
import partyText from '../text/partyText';

const styles = StyleSheet.create({



});

class Party extends Component {
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

export default reduxify(actions, ['language'], Party);
