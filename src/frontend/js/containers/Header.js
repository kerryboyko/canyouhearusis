// import {bindAllMethods} from './util';
import reduxify from 'reduxify';
import * as actions from '../actions/index';
import React, {Component} from 'react';
import _ from 'lodash';

import IconButton from 'material-ui/IconButton';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import HamburgerIcon from 'material-ui/svg-icons/navigation/menu';
import LanguageIcon from 'material-ui/svg-icons/action/language';
import RaisedButton from 'material-ui/RaisedButton';

import {Toolbar, ToolbarGroup} from 'material-ui/Toolbar';
import palette from '../constants/palette';
import {Tab} from 'material-ui/Tabs';
import {StyleSheet, css} from 'aphrodite';
import DonateDialog from './DonateDialog';
import labels from '../text/labels';



const styles = StyleSheet.create({
  buttonStyle: {
    marginLeft: '0.5vw',
    marginRight: '0.5vw'
  },
  hideMobile: {
    '@media (max-width: 800px)': {
      display: 'none'
    }
  }
});

const icelandFlagSVG = '../../img/icelandFlag.svg';
const englishFlagSVG = '../../img/englishFlag.svg';

class Header extends Component {
  constructor(props){
    super(props);
    this.handleLanguageChange = this.handleLanguageChange.bind(this);
    this.handlePageSelect = this.handlePageSelect.bind(this);
    this.handleHomeButton = this.handleHomeButton.bind(this);
    this.handleLearnButton = this.handleLearnButton.bind(this);
    this.handleAboutButton = this.handleAboutButton.bind(this);
    this.handleConstitutionButton = this.handleConstitutionButton.bind(this);
    this.handlePartiesButton = this.handlePartiesButton.bind(this);
    this.languageDivProps = _.pick(props, ['language']);
    this.state = {
      value: 3,
    };

  }

  handleLanguageChange (event, value) {
    this.props.actions.setLanguage(value);
  }
  handlePageSelect (event, value) {
    this.props.actions.push(value);
  }
  handleHomeButton () {
    this.props.actions.push('/');
  }
  handleLearnButton () {
    this.props.actions.push('/learn');
  }
  handleAboutButton () {
    this.props.actions.push('/about');
  }
  handleConstitutionButton () {
    this.props.actions.push('/constitution');
  }
  handlePartiesButton () {
    this.props.actions.push('/parties');
  }





  render () {
    return (
      <div>
      <Toolbar style={{backgroundColor: palette.iceFlagBlue}}>
        <ToolbarGroup firstChild={true}>
        <IconMenu
          style={{marginLeft: '0.5vw', marginRight: '0.5vw', marginTop: '0.5vh'}}
          onChange={this.handlePageSelect}
          iconButtonElement={<IconButton><HamburgerIcon color="white"/></IconButton>}
          targetOrigin={{horizontal: 'right', vertical: 'top'}}
          anchorOrigin={{horizontal: 'right', vertical: 'top'}}
        >
          <MenuItem
            primaryText={labels.home[this.props.language]}
            value="/"
          />
          <MenuItem
            primaryText={labels.learn[this.props.language]}
            value="/learn"
          />
          <MenuItem
            primaryText={labels.about[this.props.language]}
            value="/about"
          />
          <MenuItem
            primaryText={labels.theConstitution[this.props.language]}
            value="/constitution"
          />
          <MenuItem
            primaryText={labels.parties[this.props.language]}
            value="/parties"
          />
        </IconMenu>
        <RaisedButton className={css(styles.buttonStyle, styles.hideMobile)} backgroundColor={palette.white} onClick={this.handleHomeButton} labelStyle={{fontWeight: '900', fontFamily: "Roboto Condensed"}} label={labels.home[this.props.language]} />
        <RaisedButton className={css(styles.buttonStyle, styles.hideMobile)} backgroundColor={palette.white} onClick={this.handleLearnButton} labelStyle={{fontWeight: '900', fontFamily: "Roboto Condensed"}} label={labels.learn[this.props.language]} />
        <RaisedButton className={css(styles.buttonStyle, styles.hideMobile)} backgroundColor={palette.white} onClick={this.handleAboutButton} labelStyle={{fontWeight: '900', fontFamily: "Roboto Condensed"}} label={labels.about[this.props.language]} />
        <RaisedButton className={css(styles.buttonStyle, styles.hideMobile)} backgroundColor={palette.white} onClick={this.handleConstitutionButton} labelStyle={{fontWeight: '900', fontFamily: "Roboto Condensed"}} label={labels.theConstitution[this.props.language]} />
        <RaisedButton className={css(styles.buttonStyle, styles.hideMobile)} backgroundColor={palette.white} onClick={this.handlePartiesButton} labelStyle={{fontWeight: '900', fontFamily: "Roboto Condensed"}} label={labels.parties[this.props.language]} />

        <DonateDialog backgroundColor={palette.iceFlagRed} style={Object.assign(styles.buttonStyle, {margin: '10px 6px'})} labelStyle={{fontWeight: '900', color: palette.white, fontFamily: "Roboto Condensed"}} label={labels.donate[this.props.language]} />
        </ToolbarGroup>
        <ToolbarGroup lastChild={true}>
          <IconMenu
            style={{marginLeft: '0.5vw', marginRight: '0.5vw', marginTop: '0.5vh'}}

            onChange={this.handleLanguageChange}
            iconButtonElement={
              <div style={{display:'flex', alignItems: 'center', color: palette.white}}>
                <img height={'20px'} width={'35px'} style={{marginRight: '1vw'}} src={this.props.language === 'IS' ? icelandFlagSVG : englishFlagSVG}/>
                {this.props.language}
                <IconButton>
                  <LanguageIcon color="white"/>
                </IconButton>
              </div>
            }
            targetOrigin={{horizontal: 'right', vertical: 'top'}}
            anchorOrigin={{horizontal: 'right', vertical: 'top'}}
          >
            <MenuItem
              primaryText={<span><img height={'20px'} width={'35px'} src={englishFlagSVG}/>&nbsp;&nbsp;English</span>}
              value="EN"
            />
            <MenuItem
              primaryText={<span><img height={'20px'} width={'35px'} src={icelandFlagSVG}/>&nbsp;&nbsp;Íslenska</span>}
              value="IS"
            />
          </IconMenu>
        </ToolbarGroup>
      </Toolbar>
      </div>
    );
  }
}

export default reduxify(actions, ['language'], Header);
