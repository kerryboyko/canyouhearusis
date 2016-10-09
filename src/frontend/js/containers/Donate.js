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



const styles = StyleSheet.create({
  centerMe: {
    width: '100%',
    margin: 'auto',
    textAlign: 'center',
  },
  currencyHeader: {
    textAlign: 'center',
    padding: '10px',
    fontSize: '14px',
  },
  thankYou:{
    fontFamily: "Roboto Condensed",
    color: palette.white,
    backgroundColor: palette.iceFlagBlue,
    padding: '5px',
    fontSize: '24px',

    textAlign: 'center',
  },

  cashButton: {
    margin: '12px',
    width: '95px',
  },
  donateItself: {
    margin: '2vh auto',
    borderRadius: '15px',
    padding: '10px',
    width: '400px',
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
    };
    this.handleAmountChange = this.handleAmountChange.bind(this);
    this.handleOpen = this.handleOpen.bind(this);
    this.handleClose = this.handleClose.bind(this);
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
        <Paper className={css(styles.donateItself)} zDepth={5}>
          <Paper zIndex={1} className={css(styles.thankYou)}>
            <div>Thank you for your donation!</div>
          </Paper>
          <div className={css(styles.currencyHeader)}>
            Currency amounts are in {this.props.currency.name}.
          </div>
          {_.chunk(this.props.currency.amounts, 3).map((chunk) => (
            <div className={css(styles.buttonChunk)}>
              {chunk.map((amount) => (<div><StripeCheckout
                className={css(styles.cashButton)}
                stripeKey='pk_test_2svq4z4MVul7BOQvgdPPvRjV'
                amount={amount}
                panelLabel={"Donate"}
                allowRememberMe
                token="foo"
                label={"" + this.props.currency.symbol + (Math.floor(amount/100))}
              /></div>))}
            </div>
          ))}
          <div>
            <span>$<TextField hintText={'0.00'} floatingLabelText={"Enter a different amount"} onChange={this.handleAmountChange} value={this.props.amount}/>
            <StripeCheckout
              className={css(styles.cashButton)}
              stripeKey='pk_test_2svq4z4MVul7BOQvgdPPvRjV'
              amount={this.state.amount * 100}
              allowRememberMe
              token="foo"
              panelLabel={"Donate"}
              label={"Other"}
            /></span>
          </div>
        </Paper>
      </div>);
  }
}

export default reduxify(actions, ['language', 'currency'], Donate);
