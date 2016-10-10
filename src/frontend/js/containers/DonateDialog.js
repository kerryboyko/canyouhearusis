import React, {Component} from 'react';
import reduxify from 'reduxify';
import * as actions from '../actions/index';
import palette from '../constants/palette';
import Paper from 'material-ui/Paper';
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';
import TextField from 'material-ui/TextField';
import CloseIcon from 'material-ui/svg-icons/navigation/close';
import Dialog from 'material-ui/Dialog';
import StripeCheckout from 'react-stripe-checkout';
import {StyleSheet, css} from 'aphrodite';
import _ from 'lodash';

import Donate from './Donate';

class DonateDialog extends Component {
  constructor(props){
    super(props);
    this.state = {
      open: false,
      zindex: -1000,
    };
    this.handleOpen = this.handleOpen.bind(this);
    this.handleClose = this.handleClose.bind(this);
  }

  handleOpen () {
    this.setState({open: true, zindex: 1500});
  }

  handleClose () {
    this.setState({open: false, zindex: -1000});
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
          backgroundColor={this.props.backgroundColor}
          style={this.props.style}
          labelStyle={this.props.labelStyle}
          label={this.props.label}
          onTouchTap={this.handleOpen}
        />
        <Dialog
          title="Thank you for your donation!"
          actions={actions}
          modal={false}
          open={this.state.open}
          onRequestClose={this.handleClose}
          style={{width:'480px', left: 'calc(50% - 240px)', zIndex: this.state.zindex}}
        >
          <Donate />
        </Dialog>
      </div>
    );
  }

}

export default reduxify(actions, ['language'], DonateDialog);
