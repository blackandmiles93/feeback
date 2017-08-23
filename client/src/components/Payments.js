import React, { Component } from 'react';
import ReactStripeCheckout from 'react-stripe-checkout';
import { connect } from 'react-redux';
import * as actions from '../actions';
//This sets up the stripe payment popup for the front end
class Payments extends Component {
  render() {
    return (
      <ReactStripeCheckout
        name="Feeback"
        description="$5 for 5 survey credits"
        amount={500} //the amount is denoted in cents so this is $5
        token={token => this.props.handleToken(token)}
        stripeKey={process.env.REACT_APP_STRIPE_KEY}
      >
        <button className="btn">Add Credits</button>
      </ReactStripeCheckout>
    );
  }
}

export default connect(null, actions)(Payments);
