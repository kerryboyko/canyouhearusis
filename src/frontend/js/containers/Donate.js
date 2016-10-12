import React, {Component} from 'react';
import reduxify from 'reduxify';
import * as actions from '../actions/index';
import palette from '../constants/palette';
import FlatButton from 'material-ui/FlatButton';
import TextField from 'material-ui/TextField';
import CloseIcon from 'material-ui/svg-icons/navigation/close';
import StripeCheckout from 'react-stripe-checkout';
import {StyleSheet, css} from 'aphrodite';
import _ from 'lodash';
import request from 'superagent';
const poweredByStripeSVG = '../../img/powered_by_stripe.svg';
import LinearProgress from 'material-ui/LinearProgress';

const PUBLIC_KEY = 'pk_test_2svq4z4MVul7BOQvgdPPvRjV';


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
  },
  poweredBy: {
    float: 'right',
    width: '80px'
  }
});

class Donate extends Component {
  constructor(props){
    super(props);
    this.state = {
      amount: 0,
      isValidAmount: false,
    };
    this.handleAmountChange = this.handleAmountChange.bind(this);
    this.onToken = this.onToken.bind(this);
  }



  onToken (token, amount) {
    this.props.actions.setProcessing(true);
    request
      .post('/api/donation')
      .send({token, amount})
      .end((err, res) => {
        this.setState({open:false});
        if (err) {
          console.log("ERR", err);
          alert(err);
        } else {
          this.props.actions.setProcessing(false);
          this.props.closeCallback();
          this.props.actions.push('/thankyou');
        }
      });
  }

  handleAmountChange (event, value) {
    if(!isNaN(value) && value >= 1){
      this.setState({amount: value, isValidAmount: true});
    } else {
      this.setState({isValidAmount: false});
    }
  }
  render(){


    return(<div className={css(styles.centerMe)}>
          <div className={css(styles.currencyHeader)}>
            <a href="https://stripe.com/"><img src={poweredByStripeSVG} className={css(styles.poweredBy)}/></a>
            { this.props.processing ? (<div>Processing...<br /><LinearProgress mode="indeterminate" /></div>) : ("Currency amounts are in " + this.props.currency.name + ".")}
          </div>
          {this.props.processing ? null : _.chunk(this.props.currency.amounts, 3).map((chunk, i) => (
            <div key={"chunk" + i} className={css(styles.buttonChunk)}>
              {chunk.map((amount, i) => (<div key={"amount" + amount}><StripeCheckout
                className={css(styles.cashButton)}
                stripeKey={PUBLIC_KEY}
                amount={amount}
                panelLabel={"Donate"}
                allowRememberMe
                token={(token) => this.onToken(token, amount)}
                currency={"USD"}
                label={"" + this.props.currency.symbol + (Math.floor(amount/100))}
              /></div>))}
            </div>
          ))}
          {this.props.processing ? null : (<div>
            <span>
              $<TextField floatingLabelText={" Other Amount (USD)"} onChange={this.handleAmountChange} value={this.props.amount}/>
              {this.state.isValidAmount ? <StripeCheckout
                className={css(styles.cashButton)}
                stripeKey={PUBLIC_KEY}
                amount={this.props.amount * 100}
                allowRememberMe
                token={(token) => this.onToken(token, this.props.amount * 100)}
                currency={"USD"}
                panelLabel={"Donate"}
                label={"Custom Amount"}
              /> : null }
            </span>
          </div>)}
      </div>);
  }
}

export default reduxify(actions, ['language', 'currency', 'processing'], Donate);
