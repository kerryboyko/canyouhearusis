import React, {Component} from 'react';
import reduxify from 'reduxify';
import * as actions from '../actions/index';
import palette from '../constants/palette';
import AppBar from 'material-ui/AppBar';
import IconButton from 'material-ui/IconButton';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import LanguageIcon from 'material-ui/svg-icons/action/language';
class HeaderBar extends Component {
  constructor(props){
    super(props);
    this.handleLanguageChange = this.handleLanguageChange.bind(this);
  }

  handleLanguageChange (event, value) {
    this.props.actions.setLanguage(value);
  }

  render() {
    return (
      <div>
        <AppBar
          title="CanYouHearUs.IS"
          showMenuIconButton={false}
          iconElementRight={
            <IconMenu
              onChange={this.handleLanguageChange}
              iconButtonElement={<div style={{display:'flex', alignItems: 'center', color: palette.white}}>{this.props.language}<IconButton><LanguageIcon color="white"/></IconButton></div>}
              targetOrigin={{horizontal: 'right', vertical: 'top'}}
              anchorOrigin={{horizontal: 'right', vertical: 'top'}}
            >
              <MenuItem
                primaryText="English"
                value="English"
              />
              <MenuItem
                primaryText="íslenska"
                value="íslenska"
              />
            </IconMenu>
          }
        />
      </div>
    );
  }
}

export default reduxify(actions, ['language'], HeaderBar);
