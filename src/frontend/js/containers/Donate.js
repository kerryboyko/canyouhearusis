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
import request from 'superagent';


const styles = StyleSheet.create({
  centerMe: {
    margin: 'auto',
    textAlign: 'center',
  },
  currencyHeader: {
    textAlign: 'center',
    padding: '10px',
    fontSize: '14px',
  },
  cashButton: {
    margin: '12px',
    width: '95px',
  },
  buttonChunk: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'left',
  }
});

class Donate extends Component {
  constructor(props){
    super(props);
    this.state = {
      amount: 0,
      open: false,
      token: null,
    };
    this.handleAmountChange = this.handleAmountChange.bind(this);
    this.handleOpen = this.handleOpen.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.onToken = this.onToken.bind(this);
  }

  onToken (token, amount) {
    request
      .post('/api/donation')
      .send({token, amount})
      .end((err, res) => {
        if (err) {
          console.log("ERR", err);
          alert(err);
        } else {
          this.props.actions.push('/thankyou');
        }
      });
  }


  handleOpen () {
    this.setState({open:true});
  }

  handleClose (){
    this.setState({open: false});
  }

  handleAmountChange (event, value) {
    if(!isNaN(value)){
      this.setState({amount: value});
    }
  }
  render(){
    const actions = [
      (<FlatButton
        label="Cancel"
        primary={true}
        icon={<CloseIcon color={palette.iceFlagRed} />}
        onTouchTap={this.handleClose}
        labelColor={palette.iceFlagRed}
      />)
    ];


    return(<div className={css(styles.centerMe)}>
          <div className={css(styles.currencyHeader)}>
            Currency amounts are in {this.props.currency.name}.
          </div>
          {_.chunk(this.props.currency.amounts, 3).map((chunk, i) => (
            <div key={"chunk" + i} className={css(styles.buttonChunk)}>
              {chunk.map((amount, i) => (<div key={"amount" + amount}><StripeCheckout
                className={css(styles.cashButton)}
                stripeKey='pk_test_2svq4z4MVul7BOQvgdPPvRjV'
                amount={amount}
                panelLabel={"Donate"}
                allowRememberMe
                token={(token) => this.onToken(token, amount)}
                currency={"USD"}
                label={"" + this.props.currency.symbol + (Math.floor(amount/100))}
              /></div>))}
            </div>
          ))}
          <div>
            <span>$<TextField floatingLabelText={" Other Amount (USD)"} onChange={this.handleAmountChange} value={this.props.amount}/>
            <StripeCheckout
              className={css(styles.cashButton)}
              stripeKey='pk_test_2svq4z4MVul7BOQvgdPPvRjV'
              amount={this.state.amount * 100}
              allowRememberMe
              token={(token) => this.onToken(token, this.state.amount * 100)}
              currency={"USD"}
              panelLabel={"Donate"}
              label={"Custom Amount"}
            /></span>
          </div>
      </div>);
  }
}

export default reduxify(actions, ['language', 'currency'], Donate);
