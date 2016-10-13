import reduxify from 'reduxify';
import * as actions from '../actions/index';
import React, {Component} from 'react';
import {StyleSheet, css} from 'aphrodite';
import palette from '../constants/palette';
import Paper from 'material-ui/Paper';
import RaisedButton from 'material-ui/RaisedButton';
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
    '@media (max-width:800px)': {
      display: 'inline-block',
      textAlign: 'center',
      width: '100%',
      margin: 'auto',
      border: '0',
    }
  },
  logo: {
    width: '53vw',
    display:'flex',
    textAlign: 'center',
    marginBottom: '1vw',
    marginTop: '0.5vw',
    '@media (max-width:800px)': {
      margin: 'auto',
      float:'none',
      width: "100%",
    }
  },
  leftContainer: {
    float: 'left',
    width: '53vw',
    textAlign: 'left',
    marginLeft: '10px',
    '@media (max-width:800px)': {
      width: '100%',
      marginRight: '0px',
      marginLeft: '0px',
      float: 'none',
      textAlign: 'center',
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
    width: '40vw',
    textAlign: 'center',
    '@media (max-width:800px)': {
      float:'none',
      margin: 'auto',
      width: "100%",

    }
  },
  subheadline: {
    color: 'white',
    backgroundColor: palette.heroBackground,
    fontFamily: 'Roboto',
    fontWeight: '300',
    fontSize: "26px",
    padding: '3vw',
  },
  videoWrapper : {
    justifyContent: 'center',
    '@media (max-width:800px)': {
      position: 'relative',
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
  joinus: {
    margin: 'auto',
    textAlign: 'center',
    width: '300px',
    paddingTop: '30px',
  }

});

const videoLinks = {
  first: {
    EN: "https://www.youtube.com/embed/JC0mZnJFhUg", // do shorter first
    IS: "https://www.youtube.com/embed/tSLoMgiNL6s",
  },
  second: {
    EN: "https://www.youtube.com/embed/C1qk-BQwNlA",
    IS: "https://www.youtube.com/embed/TS3zoZFxmuI",
  },
};

class Hero extends Component {
  constructor(props){
    super(props);
  }
  render () {
    return (<div>
      <div className={css(styles.heroStyle)} zDepth={1} >
        <div className={css(styles.wrapper)}>
          <div ref="leftContainer" className={css(styles.leftContainer)}>
              <img src={(this.props.language === "EN") ? logoSVG : logoISSVG } className={css(styles.logo)}/>
              <Paper className={css(styles.subheadline)}>
                {subheadline[this.props.language]}
                <div className={css(styles.joinus)}>
                  <a href="http://eepurl.com/cjSF51">
                    <RaisedButton
                      backgroundColor={palette.iceFlagBlue}
                      label={"Join Us!"}
                      style={{margin: 'auto', width: '300px', height: '7vh'}}
                      labelStyle={{fontWeight: '900',  lineHeight: '7vh', fontSize: "4vh", fontFamily: "Roboto Condensed", color: palette.white }}
                      labelColor={palette.white}
                    />
                  </a>
                </div>
              </Paper>
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
              <iframe className={css(styles.videoWrapperIframe)} src={videoLinks.first[this.props.language]} width="640" height="360" allowFullScreen></iframe>
            </div>
            <Social transparent={true}/>
            <div ref="video" className={css(styles.videoWrapper)}>
              <iframe className={css(styles.videoWrapperIframe)} src={videoLinks.second[this.props.language]} width="640" height="360" allowFullScreen></iframe>
            </div>
          </Paper>
        </div>
      </div>
    </div>
    );
  }
}

export default reduxify(actions, ['language'], Hero);
