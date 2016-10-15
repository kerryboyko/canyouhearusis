import React, {
  Component
} from 'react';
import reduxify from 'reduxify';
import * as actions from '../actions/index';
import palette from '../constants/palette';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
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


const PUBLIC_KEY = 'pk_live_QUeujPDge97fm94rrD9VV6T8';



const styles = StyleSheet.create({
  centerMe: {
    margin: 'auto',
    textAlign: 'center',
    fontSize: '38px',
  },
  twoWays: {
    textAlign: 'center',
    fontFamily: "Roboto Condensed",
    fontSize: '26px',
  },
  currencyHeader: {
    textAlign: 'center',
    padding: '10px',
    fontSize: '28px',
  },
  cashButton: {
    margin: '24px',
    width: '100%',
  },
  buttonChunk: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'left',
  },
  poweredBy: {
    width: '200px'
  },
  paperPad: {
    marginTop: '1vh',
    marginBottom: '2vh',
    padding: '1vh',
    fontSize: '30px',
  }
});

class DonateMobile extends Component {
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
        <img width={'100%'} src={generositySVG}/>
        <div>and get pledge rewards</div>
      </Paper></a>);

    return (
      <div className={css(styles.centerMe)}>
        {this.props.processing ? processingIndicator : null}
        {this.props.processing ? null : (<div className={css(styles.twoWays)}>There are <em>two</em> ways to support the campaign: </div>)}
        {this.props.processing ? null : generosityLink}
        {this.props.processing ? null : (<div>
            <div>Donate Directly {pwdBy}</div>
              <div style={{fontFamily: "Roboto Condensed"}}>
                Currency for direct donations in USD.<br />(Support for ISK coming soon!)
              </div>
            <div>
              <div style={{marginTop: '10px', marginBottom: '10px'}}>
                $<TextField onChange={this.handleAmountChange} inputStyle={{fontSize: '36px'}}value={this.state.amount}/>
              </div>
              <div>
                <StripeCheckout
                className={css(styles.cashButton)}
                stripeKey={PUBLIC_KEY}
                amount={this.props.amount * 100}
                allowRememberMe
                token={(token) => this.onToken(token, this.props.amount * 100)}
                currency={"USD"}
                panelLabel={"Donate"}
                label={"Custom Amount"}>
                <RaisedButton
                  label={"Donate $" + (this.state.amount)}
                  backgroundColor={palette.iceFlagBlue}
                  style={{margin: 'auto', marginTop: '20px', marginBottom: '20px', width: 'auto', height: '5vh'}}
                  labelStyle={{fontWeight: '900',  lineHeight: '5vh', fontSize: "2.5vh", fontFamily: "Roboto Condensed", color: palette.white }}
                />
                </StripeCheckout>
              </div>
            </div>
          </div>) }
        </div>
    );
  }
}

export default reduxify(actions, ['language', 'currency', 'processing'], DonateMobile);
