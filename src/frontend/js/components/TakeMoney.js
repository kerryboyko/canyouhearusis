import reduxify from '../utilities/reduxify';
import React, {Component} from 'react';
import ReactDOM, {findDOMNode} from 'react-dom';
import _ from 'lodash';

import StripeCheckout from 'react-stripe-checkout';
import fetch from 'fetch';

class TakeMoney extends Component {
  constructor(props){
    super(props);
    this.onToken = this.onToken.bind(this);
  }
  onToken (token) {
    fetch('/save-stripe-token', {
      method: 'POST',
      body: JSON.stringify(token),
    }).then(response => {
      response.json().then(data => {
        alert(`We are in business, ${data.email}`);
      });
    });
  }


  render() {
    return (
      <StripeCheckout
        token={this.onToken}
        stripeKey="my_PUBLISHABLE_stripekey"
      />
    );
  }
}

export default TakeMoney;
