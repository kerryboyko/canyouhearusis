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
import Slider from 'material-ui/Slider';

import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import NavigationClose from 'material-ui/svg-icons/navigation/close';
import palette from '../constants/palette';
import icelandFlagSVG from '../../img/icelandFlag.svg';
import englishFlagSVG from '../../img/englishFlag.svg';
import {Tabs, Tab} from 'material-ui/Tabs';

const styles = {
  headline: {
    fontSize: 24,
    paddingTop: 16,
    marginBottom: 12,
    fontWeight: 400,
  },
};


const buttonStyle = {
  backgroundColor: 'transparent',
  color: 'white'
};
class Header extends Component {
  constructor(props){
    super(props);
    this.handleLanguageChange = this.handleLanguageChange.bind(this);
    this.languageDivProps = _.pick(props, ['language']);
  }

  handleLanguageChange (event, value) {
    this.props.actions.setLanguage(value);
  }
  handlePageSelect (event, value) {
    console.log("Nothing here yet!")
  }



  render () {
    return (
      <AppBar
        style={{backgroundColor: palette.iceFlagBlue}}
        title={<div>
          <RaisedButton style={{margin: '1vh'}} label="Home" />
          <RaisedButton style={{margin: '1vh'}} label="Learn" />
          <RaisedButton style={{margin: '1vh'}} label="About" />
          <RaisedButton style={{margin: '1vh'}} label="The Constitution" />
          <RaisedButton backgroundColor={palette.iceFlagRed} style={{margin: '1vh'}} label="Donate" /></div>          
        }
        iconElementLeft={
          <IconMenu
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
              primaryText={"Donate"}
              value="EN"
            />

          </IconMenu>
                }
        iconElementRight={
          <IconMenu
            onChange={this.handleLanguageChange}
            iconButtonElement={<div style={{display:'flex', alignItems: 'center', color: palette.white}}>{this.props.language}<IconButton><LanguageIcon color="white"/></IconButton></div>
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
        }
      >
      </AppBar>
    );
  }
}

export default reduxify(actions, ['language'], Header);
