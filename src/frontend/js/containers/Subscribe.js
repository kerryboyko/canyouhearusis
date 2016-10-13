import reduxify from 'reduxify';
import * as actions from '../actions/index';
import request from 'request';
import React, {
  Component
} from 'react';
import {StyleSheet, css} from 'aphrodite';
import palette from '../constants/palette';
import Dialog from 'material-ui/Dialog';
import TextField from 'material-ui/TextField';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import LinearProgress from 'material-ui/LinearProgress';
import SuccessIcon from 'material-ui/svg-icons/action/done';
import ErrorIcon from 'material-ui/svg-icons/alert/error';

import {
  READY,
  PROCESSING,
  SUCCESS,
  FAIL,
} from '../constants/index';

const emailIsValid = (email) => {
  let validEmailRE = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
  return validEmailRE.test(email);
};

class Subscribe extends Component {
  constructor(props){
    super(props);
    this.state = {
      status: READY,
      email: "",
      firstName: "",
      lastName:"",
      open: false,
      invalidEmailWarn: false,
      zIndex: -1000,
    };
    this.handleFirst = this.handleFirst.bind(this);
    this.handleLast = this.handleLast.bind(this);
    this.handleEmail = this.handleEmail.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleOpen = this.handleOpen.bind(this);
    this.handleClose = this.handleClose.bind(this);
  }
  handleFirst (event, value) {
    this.setState({firstName: value});
  }
  handleLast (event, value) {
    this.setState({lastName: value});
  }
  handleEmail (event, value) {
    this.setState({email: value});
  }
  handleOpen () {
    this.setState({open:true, zIndex: 1500});
  }
  handleClose () {
    this.setState({open: false, zIndex: -1000});
  }
  handleSubmit () {
    if(!emailIsValid(this.state.email)){
      this.setState({invalidEmailWarn: true});
    } else {
      this.setState({
        invalidEmailWarn: false,
        status: PROCESSING
      });
      request.post({
        headers: {
          'Access-Control-Allow-Origin': '*',
          "Access-Control-Allow-Headers": "Origin, X-Requested-With, Content-Type, Accept",
        },
        url: 'https://lessig2016.us11.list-manage.com/subscribe/post',
        form: {
          "ht": "840fa0c5b710b6720b1ee25473dd8212bc230c55:MTQ3NjMzNjgxMS4xMjcy",
          "mc_signupsource": 'hosted',
          "id": "9fd14d103b",
          "u": "25e9e913a75b88071b086a84a",
          "MERGE0": this.state.email,
          "MERGE1": this.state.firstName,
          "MERGE2": this.state.lastName,
        }},
        (err, response, body) => {
          if (err) {
            this.setState({status: FAIL});
            console.log(err);
          } else {
            console.log("ERR", err);
            console.log("RESPONES", response);
            console.log("BODY", body);
            this.setState({status: SUCCESS});
            setTimeout(() => {
              this.setState({open: false});
            }, 5000);
          }
        });
    }
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
          onTouchTap={this.handleOpen}
        />
        <Dialog
          title={"Sign up to join in the fight for Iceland's Constitution"}
          actions={actions}
          modal={false}
          open={this.state.open}
          onRequestClose={this.handleClose}
          style={{width:'600px', left: 'calc(50% - 240px)', zIndex: this.state.zindex}}
        >
          {(this.state.status === SUCCESS || this.state.status === PROCESSING) ? null :
          (<div><div><TextField
            floatingLabelText="* Email Address"
            onChange={this.handleEmail}
            errorText={this.state.invalidEmailWarn ? "This field is required" : null}
          /></div>
          <div><TextField
            floatingLabelText="First Name"
            onChange={this.handleFirst}

          /></div>
          <div><TextField
            floatingLabelText="Last Name"
            onChange={this.handleLast}
          /></div>
          <RaisedButton
            label="Sign Up"
            onTouchTap={this.handleSubmit}
          /></div>)}
          {this.state.status === SUCCESS ? <SuccessIcon color={'green'}/> : null }
          {this.state.status === FAIL ? <ErrorIcon color={'red'} /> : null}
          {this.state.status === PROCESSING ? <LinearProgress mode="indeterminate" /> : null}
          {JSON.stringify(this.state   )}
        </Dialog>
      </div>
    );
  }
}

export default reduxify(actions, ["language"], Subscribe);
