import React from 'react';
import ReactDOM from 'react-dom';
import {loadStripe} from '@stripe/stripe-js';
import {
  CardElement,
  Elements,
  useStripe,
  useElements,
} from '@stripe/react-stripe-js';
import {
  Card, Button
} from "theme-ui"

const CheckoutForm = () => {
  const stripe = useStripe();
  const elements = useElements();

  const handleSubmit = async (event) => {
    event.preventDefault();
    const {error, paymentMethod} = await stripe.createPaymentMethod({
      type: 'card',
      card: elements.getElement(CardElement),
    });
  };

  return (
    <Card as="form" onSubmit={handleSubmit} sx={{maxWidth: "320px", mx:"auto"}}>
      <CardElement />
      <Button type="submit" disabled={!stripe}>
        Pay
      </Button>
    </Card>
  );
};

const stripePromise = loadStripe('pk_test_Lgr71n8BQ91Fl6TPQKE4jPDv00BO4ts8Kr');

export default (props) => (
  <Elements stripe={stripePromise}>
    <CheckoutForm />
  </Elements>
)