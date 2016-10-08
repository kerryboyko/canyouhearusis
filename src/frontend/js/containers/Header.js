// import {bindAllMethods} from './util';
import reduxify from '../utilities/reduxify';
import * as actions from '../actions/index';
import React, {Component} from 'react';
import _ from 'lodash';

import AppBar from 'material-ui/AppBar';
import IconButton from 'material-ui/IconButton';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import HamburgerIcon from 'material-ui/svg-icons/navigation/menu';
import LanguageIcon from 'material-ui/svg-icons/action/language';
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';

import Slider from 'material-ui/Slider';


import FontIcon from 'material-ui/FontIcon';
import NavigationExpandMoreIcon from 'material-ui/svg-icons/navigation/expand-more';
import DropDownMenu from 'material-ui/DropDownMenu';
import {Toolbar, ToolbarGroup, ToolbarSeparator, ToolbarTitle} from 'material-ui/Toolbar';

import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import NavigationClose from 'material-ui/svg-icons/navigation/close';
import palette from '../constants/palette';
import icelandFlagSVG from '../../img/icelandFlag.svg';
import englishFlagSVG from '../../img/englishFlag.svg';
import {Tabs, Tab} from 'material-ui/Tabs';
import {StyleSheet, css} from 'aphrodite';

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


class Header extends Component {
  constructor(props){
    super(props);
    this.handleLanguageChange = this.handleLanguageChange.bind(this);
    this.languageDivProps = _.pick(props, ['language']);
    this.state = {
     value: 3,
    };
  }

  handleLanguageChange (event, value) {
    this.props.actions.setLanguage(value);
  }
  handlePageSelect (event, value) {
    console.log("Nothing here yet!")
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
            primaryText={"Home"}
            value="EN"
          />
          <MenuItem
            primaryText={"Learn"}
            value="EN"
          />
          <MenuItem
            primaryText={"About"}
            value="EN"
          />
          <MenuItem
            primaryText={"The Constitution"}
            value="EN"
          />
          <MenuItem
            style={{backgroundColor: palette.redHighlight}}
            primaryText={"Donate"}
            value="EN"
          />

        </IconMenu>
        <FlatButton className={css(styles.buttonStyle, styles.hideMobile)} backgroundColor={palette.white} hoverColor={palette.redHighlight} labelStyle={{fontWeight: '900', fontFamily: "Roboto Condensed"}} label="Home" />
        <FlatButton className={css(styles.buttonStyle, styles.hideMobile)} backgroundColor={palette.white} hoverColor={palette.redHighlight} labelStyle={{fontWeight: '900', fontFamily: "Roboto Condensed"}} label="Learn" />
        <FlatButton className={css(styles.buttonStyle, styles.hideMobile)} backgroundColor={palette.white} hoverColor={palette.redHighlight} labelStyle={{fontWeight: '900', fontFamily: "Roboto Condensed"}} label="About" />
        <FlatButton className={css(styles.buttonStyle, styles.hideMobile)} backgroundColor={palette.white} hoverColor={palette.redHighlight} labelStyle={{fontWeight: '900', fontFamily: "Roboto Condensed"}} label="The&nbsp;Constitution" />
        <FlatButton className={css(styles.buttonStyle)} backgroundColor={palette.iceFlagRed} hoverColor={palette.redHighlight} style={{color: palette.white }} labelStyle={{fontWeight: '900', fontFamily: "Roboto Condensed"}} label="Donate" />
        </ToolbarGroup>
        <ToolbarGroup lastChild={true}>
          <IconMenu
            style={{marginLeft: '0.5vw', marginRight: '0.5vw', marginTop: '0.5vh'}}

            onChange={this.handleLanguageChange}
            iconButtonElement={<div style={{display:'flex', alignItems: 'center', color: palette.white}}><img height={'20px'} width={'35px'} style={{marginRight: '1vw'}} src={this.props.language === 'IS' ? icelandFlagSVG : englishFlagSVG}/>{this.props.language}<IconButton><LanguageIcon color="white"/></IconButton></div>
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
