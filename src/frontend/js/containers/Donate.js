import React, {
  Component
} from 'react';
import reduxify from 'reduxify';
import * as actions from '../actions/index';
import palette from '../constants/palette';
import FlatButton from 'material-ui/FlatButton';
import TextField from 'material-ui/TextField';
import Paper from 'material-ui/Paper';
import Divider from 'material-ui/Divider';
import CloseIcon from 'material-ui/svg-icons/navigation/close';
import LinearProgress from 'material-ui/LinearProgress';
import StripeCheckout from 'react-stripe-checkout';
import {
  StyleSheet,
  css
} from 'aphrodite';
import _ from 'lodash';
import request from 'superagent';
const poweredByStripeSVG = '../../img/powered_by_stripe.svg';
const generositySVG = '../../img/generosity.svg';


const PUBLIC_KEY = process.env.STRIPE_PUBLIC_KEY;


const styles = StyleSheet.create({
  centerMe: {
    margin: 'auto',
    textAlign: 'center',
  },
  twoWays: {
    textAlign: 'center',
    fontFamily: "Roboto Condensed",
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
    width: '80px'
  },
  paperPad: {
    marginTop: '1vh',
    marginBottom: '2vh',
    padding: '1vh',
  }
});

class Donate extends Component {
  constructor(props) {
    super(props);
    this.state = {
      amount: 0,
      isValidAmount: false,
      isDirect: false,
    };
    this.handleAmountChange = this.handleAmountChange.bind(this);
    this.onToken = this.onToken.bind(this);
  }



  onToken(token, amount) {
    this.props.actions.setProcessing(true);
    request
      .post('/api/donation')
      .send({
        token,
        amount
      })
      .end((err, res) => {
        this.setState({
          open: false
        });
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

  handleAmountChange(event, value) {
    if (!isNaN(value)) {
      this.setState({
        amount: value,
        isValidAmount: (!isNaN(value) && value >= 1),
      });
    } else {
      this.setState({
        isValidAmount: false
      });
    }
  }

  render() {

    const pwdBy = (<a href="https://stripe.com/"><img src={poweredByStripeSVG} className={css(styles.poweredBy)}/></a>);

    const processingIndicator = (<div>Processing...{pwdBy}<br /><LinearProgress mode="indeterminate" /></div>);

    const generosityLink = (
      <a href="https://www.generosity.com/fundraisers/can-you-hear-us-now--2" target="_self"><Paper className={css(styles.paperPad)} zDepth={2}>
        <div>Click here to pledge donations<br /> in USD or ISK via</div>
        <img width={'260px'} src={generositySVG}/>
        <div>and get pledge rewards</div>
      </Paper></a>);

    return (
      <div className={css(styles.centerMe)}>
        {this.props.processing ? processingIndicator : null}
        {this.props.processing ? null : (<div className={css(styles.twoWays)}>There are <em>two</em> ways to support the campaign: </div>)}
        {this.props.processing ? null : generosityLink}
        {this.props.processing ? null : <div>
          <div>Donate Directly {pwdBy}</div>
            <div style={{fontFamily: "Roboto Condensed", fontSize: '12px'}}>
              Currency for direct donations in USD.<br />(Support for ISK coming soon!)
            </div>
              {_.chunk(this.props.currency.amounts, 3).map((chunk, i) => (
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
                  />
                  </div>))}
                </div> ))}
            <div>
                $<TextField floatingLabelText={" Other Amount (USD)"} onChange={this.handleAmountChange} value={this.state.amount}/>
                {this.state.isValidAmount ? <StripeCheckout
                    className={css(styles.cashButton)}
                    stripeKey={PUBLIC_KEY}
                    amount={this.props.amount * 100}
                    allowRememberMe
                    token={(token) => this.onToken(token, this.props.amount * 100)}
                    currency={"USD"}
                    panelLabel={"Donate"}
                    label={"Custom Amount"}
                  /> : null}
            </div>
          </div>}
      </div>
    );
  }
}

export default reduxify(actions, ['language', 'currency', 'processing'], Donate);
