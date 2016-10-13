import reduxify from 'reduxify';
import * as actions from '../actions/index';
import React, {
  Component
} from 'react';
import {StyleSheet, css} from 'aphrodite';
import palette from '../constants/palette';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';


class Subscribe extends Component {
  constructor(props){
    super(props);
    this.state = {
      open: false,
      zIndex: -1000,
    };
    this.handleOpen = this.handleOpen.bind(this);
    this.handleClose = this.handleClose.bind(this);
  }

  handleOpen () {
    this.setState({open:true, zIndex: 1500});
  }
  handleClose () {
    this.setState({open: false, zIndex: -1000});
  }
  render () {
    const actions = [
      <FlatButton
        label="Cancel"
        onTouchTap={this.handleClose}
        />
    ];

    return (
      <div>
        <RaisedButton
          backgroundColor={palette.iceFlagBlue}
          labelStyle={{color: palette.white, fontFamily: "Roboto Condensed"}}
          label={"Join Us"}
          actions={actions}
          onTouchTap={this.handleOpen}
        />
        <Dialog
          title={"Sign up to join in the fight for Iceland's Constitution"}
          actions={actions}
          modal={false}
          open={this.state.open}
          onRequestClose={this.handleClose}
          style={{zIndex: this.state.zindex}}
        >
        <iframe width={"100%"} height={"700px"} src="http://eepurl.com/cjSF51" frameBorder="0"/>
        </Dialog>
      </div>
    );
  }
}

export default reduxify(actions, ["language"], Subscribe);
