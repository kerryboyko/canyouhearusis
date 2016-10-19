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
const logoSVG = '../../img/logo.svg';
const logoISSVG = '../../img/logo-is.svg';

const TwitterIcon = (props) => (<img {...props} src={twitterIconSVG} />);
const FacebookIcon = (props) => (<img {...props} src={facebookIconSVG} />);

const styles = StyleSheet.create({
  heroStyle: {
    backgroundColor: palette.transparent,
    width: '100%',
    paddingBottom: '100px',
  },
  wrapper: {
    marginTop: '1.5vw',
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
  firstLine: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
  },
  logo: {
    width: '33vw',
    marginBottom: '1vw',
    '@media (max-width:800px)': {
      margin: 'auto',
      padding: '20%',
      float:'none',
      width: "100%",
    }
  },
  subheadline: {
    marginLeft: '2vw',
    color: 'white',
    backgroundColor: palette.heroBackground,
    fontFamily: 'Roboto',
    fontWeight: '300',
    fontSize: "24px",
    padding: '3vw',
  },
  buttonLine: {
    display: 'flex',
    textAlign: 'center',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'flex-start',
    padding: '1vh',
    marginTop: '3vh',
    paddingTop: '3vh',
    marginBottom: '2vh',
  },
  changeElection: {
    textAlign: 'center',
    fontSize: '24px',
    fontFamily: "Roboto Condensed",
    maxWidth: '800px',
    '@media (max-device-width: 800px)': {
      fontSize: '48px',
    }
  },
  videoWrapper : {
    textAlign: 'center',
    justifyContent: 'center',
    paddingBottom: '40px',
    '@media (max-width:800px)': {
      position: 'relative',
      paddingTop: '1vh',
    },
  },
  videoWrapperIframe : {
    '@media (max-width:800px)': {
      width: 'calc(100% - 2vw)',
      top: '0',
      left: '0',
      height: 'calc(96vw * (9 / 16) )',
    },
  },
});

const videoLinks = {
  first: {
    EN: "https://www.youtube.com/embed/RxguS56TnxQ", // do shorter first
    IS: "https://www.youtube.com/embed/RxguS56TnxQ",
  },
  second: {
    EN: "https://www.youtube.com/embed/C1qk-BQwNlA",
    IS: "https://www.youtube.com/embed/TS3zoZFxmuI",
  },
};

const videoLine = {
  EN: "The natural beauty of Iceland is considered one of the great wonders of the world. Entertainer and journalist Omar Ragnarsson talks about the strong provisions on the protection of nature and sustainable use of natural resources in the new constitution in this video.",
  IS: "Íslensk náttúra er talin ein af undrum veraldar eins og Ómar Ragnarsson bendir hér á. Í drögum Stjórnalagaráðs að nýrri stjórnarskrá er að finna mjög sterk ákvæði um náttúruvernd auk kröfu um sjálfbærrar nýtingar náttúruauðlinda.",
};

class Hero extends Component {
  constructor(props){
    super(props);
    this.componentWillMount = this.componentWillMount.bind(this);
  }
  componentWillMount () {
    if(this.props.forceLang){
      this.props.actions.setLanguage(this.props.forceLang);
      console.log('forced language to be ' + this.props.forceLang);
    }
  }
  render () {


    return (<div>
      <div className={css(styles.heroStyle)}>
        <div className={css(styles.wrapper)}>
          <div ref="firstLine" className={css(styles.firstLine)}>
              <img src={(this.props.language === "EN") ? logoSVG : logoISSVG } className={css(styles.logo)}/>
              <Paper className={css(styles.subheadline)}>
                {subheadline[this.props.language]}
              </Paper>
          </div>
          <Paper zDepth={5}>
          <div className={css(styles.buttonLine)}>
              <a href="http://eepurl.com/cjSF51">
                <RaisedButton
                  backgroundColor={palette.iceFlagBlue}
                  label={"Join Us!"}
                  style={{width: '300px', height: '7vh'}}
                  labelStyle={{fontWeight: '900',  lineHeight: '7vh', fontSize: "4vh", fontFamily: "Roboto Condensed", color: palette.white }}
                  labelColor={palette.white}
                />
              </a>edit

          </div>
            <div className={css(styles.changeElection)}>{videoLine[this.props.language]}</div>
            <Social transparent={true}/>
            <div ref="video" className={css(styles.videoWrapper)}>
              <iframe className={css(styles.videoWrapperIframe)} src={videoLinks.first[this.props.language]} width="640" height="360" frameborder="0" allowFullScreen></iframe>
            </div>
            </Paper>
        </div>
      </div>
    </div>
    );
  }
}

export default reduxify(actions, ['language'], Hero);
