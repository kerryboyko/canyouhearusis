import React, {Component} from 'react';
import reduxify from 'reduxify';
import * as actions from '../actions/index';
import palette from '../constants/palette';
import Paper from 'material-ui/Paper';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';

import {StyleSheet, css} from 'aphrodite';

const styles = StyleSheet.create({
  moneyButton: {

  }
})




class DonationBox extends Component {
  constructor(props){
    super(props);
    this.state = {
      donationAmount: 0,
      lockedDonation: 0,
      otherDonationField: 0,
      firstName: "",
      lastName:'',
      country:'',
      address1:'',
      address2:'',
      city:'',
      stateOrProvince:'',
      postalCode:'',
      email:'',
      sendMeUpdates: true,
      stage: 1,
    }
    this.handleDonationChange = this.handleDonationChange.bind(this);
    this.handleDonationButton = this.handleDonationButton.bind(this);
  }
  handleDonationButton (amount) {
    this.setState({donationAmount: amount, lockedDonation: amount, stage:2})
  }
  handleDonationChange (event) {
    this.setState({donationAmount: event.target.value})
  }



  render() {
    return (
      <div>
        <Paper zIndex={3}>
        <RaisedButton onClick={() => this.handleDonationButton(25)} label="$25 USD" />
        <RaisedButton onClick={() => this.handleDonationButton(50)} label="$50 USD" />
        <RaisedButton onClick={() => this.handleDonationButton(100)} label="$100 USD" />
        <RaisedButton onClick={() => this.handleDonationButton(250)} label="$250 USD" />
        <RaisedButton onClick={() => this.handleDonationButton(500)} label="$500 USD" />
        <RaisedButton onClick={() => this.handleDonationButton(1000)} label="$1000 USD" />
        <RaisedButton onClick={() => this.handleDonationButton(2500)} label="$2500 USD" />
        <RaisedButton onClick={() => this.handleDonationButton(10000)} label="$10000 USD" />


        <TextField onChange={this.handleDonationChange} value={this.state.donationAmount} hintText="Other Amount" />
        <RaisedButton onClick={() => this.handleDonationButton(this.state.donationAmount)} label="Other" value={this.state.donationAmount} />
        </Paper>
        <Paper>{JSON.stringify(this.state)}</Paper>
      </div>
    );
  }
}

export default reduxify(actions, ['language'], DonationBox);
