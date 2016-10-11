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
import theConstitutionText from '../text/theConstitutionText';
import FileDownload from 'material-ui/svg-icons/file/file-download';
import icelandFlagSVG from '../../img/icelandFlag.svg';
import englishFlagSVG from '../../img/englishFlag.svg';
import Header from './Header';
import DonateDialog from './DonateDialog';
import Social from './Social';
import labels from '../text/labels';


const styles = StyleSheet.create({
  constitutionStyle: {
    backgroundColor: palette.transparent,
    width: '100%',
    padding: '3vw',
  },
  container: {
    maxWidth: '800px',
    padding: '2vw',
    margin: '0 auto',
    backgroundColor: palette.heroBackground,
  },
  textStyle: {
    fontFamily: "Roboto",
    fontWeight: '300',
    color: palette.white,
    fontSize: "26px",
    lineHeight: "30px",
    marginBottom: "30px",
  },
  headlineStyle: {
    fontFamily: "Roboto Condensed",
    color: palette.white,
    fontSize: "40px",
    marginBottom: "24px",
  },
  buttonStyle: {
    margin: 'auto',
    textAlign: 'center',
  }
});

class TheConstitution extends Component {
  constructor(props){
    super(props);
  }

  render () {
    return (<div>
      <Paper className={css(styles.constitutionStyle)} zDepth={1} >
        <div className={css(styles.container)}>
          <div className={css(styles.headlineStyle)}>{theConstitutionText.headline[this.props.language]}</div>
          {theConstitutionText.pgraphs.map((pgraph, index) => (<div key={'pgraph' + index} className={css(styles.textStyle)}>{pgraph[this.props.language]}</div>))}
        </div>
        <div className={css(styles.buttonStyle)}>
          <RaisedButton
          icon={<FileDownload />}

          backgroundColor={palette.iceFlagBlue}
          style={{height: '5vh', margin: '1.5vw'}}
          labelStyle={{lineHeight: '5vh', fontSize: "2vh", fontFamily: "Roboto Condensed", color: palette.white }}
          label={theConstitutionText.buttonEN[this.props.language]}
          />
          <RaisedButton
          icon={<FileDownload />}

          backgroundColor={palette.iceFlagBlue}
          style={{height: '5vh', margin: '1.5vw'}}
          labelStyle={{lineHeight: '5vh', fontSize: "2vh", fontFamily: "Roboto Condensed", color: palette.white }}
          label={theConstitutionText.buttonIS[this.props.language]}
          />
        </div>
        <div className={css(styles.buttonStyle)}>
        <DonateDialog
          backgroundColor={palette.iceFlagRed}
          style={{margin: 'auto', marginTop: '20px', marginBottom: '20px', width: '25%', height: '7vh'}}
          labelStyle={{fontWeight: '900',  lineHeight: '7vh', fontSize: "4vh", fontFamily: "Roboto Condensed", color: palette.white }}
          label={labels.donate[this.props.language]}
          />
        </div>
        <Social />
      </Paper>
    </div>
    );
  }
}

export default reduxify(actions, ['language'], TheConstitution);
