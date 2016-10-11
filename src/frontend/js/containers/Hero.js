import reduxify from '../utilities/reduxify';
import * as actions from '../actions/index';
import React, {Component} from 'react';
import {StyleSheet, css} from 'aphrodite';
import palette from '../constants/palette';
import Paper from 'material-ui/Paper';
import {headline, subheadline} from '../text/heroText';
import labels from '../text/labels';
import DonateDialog from './DonateDialog';
import Social from './Social';


const facebookIconSVG = '../../img/facebookIcon.svg';
const twitterIconSVG = '../../img/twitterIcon.svg';
const logoSVG = './img/logo.svg';
const logoISSVG = './img/logo-is.svg';

const TwitterIcon = (props) => (<img {...props} src={twitterIconSVG} />);
const FacebookIcon = (props) => (<img {...props} src={facebookIconSVG} />);

const styles = StyleSheet.create({
  heroStyle: {
    backgroundColor: palette.transparent,
    width: '100%',
    paddingBottom: '100px',
  },

  wrapper: {
    overflow: 'hidden',
    padding: '1vw',
    display: 'flex',
    justifyContent: 'space-around',
    alignItems: 'center',
    '@media (max-width:800px)': {
      display: 'inline-block',
      textAlign: 'center',
      width: '100%',
      margin: 'auto',
      border: '0',
    }
  },
  logo: {
    width: '43vw',
    display:'flex',
    justifyContent: 'center',
    marginTop: '6vh',
    textAlign: 'center',
    '@media (max-width:800px)': {
      margin: 'auto',
      float:'none',
      width: "100%",
    }
  },
  leftContainer: {
    float: 'left',
    marginRight: '1vw',
    width: '45vw',
    textAlign: 'left',
    '@media (max-width:800px and max-device-width:800px)': {
      float: 'none',
      marginRight: '0',
      textAlign: 'center',
      width: 'auto',
      border: '0',
    }
  },
  rightContainer: {
    backgroundColor: 'white',
    overflow: 'hidden',
    float: 'right',
    display:'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    width: '45vw',
    marginTop: '6vh',
    textAlign: 'center',
    '@media (max-width:800px)': {
      float:'none',
      margin: 'auto',
      width: "100%",

    }
  },
  headlineStyle: {
    color: 'white',
    fontFamily: "Roboto Condensed",
    fontWeight: '900',
    fontSize: '15vh',
    margin: '2vh 0',
    padding: '1vh 2vw',
    '@media (max-width:800px)': {
      fontSize: '7vh'
    }
  },
  subheadline: {
    color: 'white',
    backgroundColor: palette.heroBackground,
    width: '80%',
    margin: 'auto',
    fontFamily: 'Roboto',
    fontWeight: '300',
    fontSize: "26px",
    padding: '3vw',
  },
  videoWrapper : {
    justifyContent: 'center',

    '@media (max-width:800px)': {
      position: 'relative',
      // paddingBottom: '56.25%',
      /* 16:9 */

      paddingTop: '1vh',
    },
  },
  videoWrapperIframe : {
    width: 'calc(100% - 2vw)',
    height: 'calc(43vw * (9 / 16))',
    '@media (max-width:800px)': {
      width: 'calc(100% - 2vw)',
      top: '0',
      left: '0',
      height: 'calc(96vw * (9 / 16) )',
    },
  },

});

class Hero extends Component {
  constructor(props){
    super(props);
  }
  render () {
    return (<div>
      <Paper className={css(styles.heroStyle)} zDepth={1} >
        <div className={css(styles.wrapper)}>
          <div ref="leftContainer" className={css(styles.headlineStyle, styles.leftContainer)}>
              <img src={(this.props.language === "EN") ? logoSVG : logoISSVG } className={css(styles.logo)}/>
          </div>
          <Paper ref="rightContainer" className={css(styles.rightContainer)}>
            <div ref="donateLang" style={{padding: '2vh'}}>
              <DonateDialog
                backgroundColor={palette.iceFlagRed}
                style={{margin: 'auto', width: '100%', height: '7vh'}}
                labelStyle={{fontWeight: '900',  lineHeight: '7vh', fontSize: "4vh", fontFamily: "Roboto Condensed", color: palette.white }}
                label={labels.donate[this.props.language]}
                />

            </div>
            <div ref="video" className={css(styles.videoWrapper)}>
              <iframe className={css(styles.videoWrapperIframe)} src="https://player.vimeo.com/video/7416225?byline=0&portrait=0" width="640" height="360" allowFullScreen></iframe>
            </div>
            <Social transparent={true}/>
          </Paper>
        </div>
        <Paper className={css(styles.subheadline)}>
          {subheadline[this.props.language]}
        </Paper>
      </Paper>
    </div>
    );
  }
}

export default reduxify(actions, ['language'], Hero);
