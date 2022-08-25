/* eslint-disable */
import axios from 'axios';
import { showAlert } from './alerts';
const stripe = Stripe(
  'pk_test_51LAlwhKvVSOCj2Q7hwnOBhodG7KrBt5fkKQ6k868GZcqNifzp1tjL7hkUjv4LdDNuu8xgOdndax9V1RrlrO8tjpz00tSr5hdrX'
);
// get "Publishable key" from https://dashboard.stripe.com/test/apikeys // Developers > API key

export const bookTour = async tourId => {
  try {
    // 1) Get checkout session from API
    const session = await axios(`/api/v1/bookings/checkout-session/${tourId}`);
    console.log('stripe.js', session);

    // 2) Create checkout form + charge credit card
    await stripe.redirectToCheckout({
      sessionId: session.data.session.id
    });
  } catch (err) {
    console.log(err);
    showAlert('error', err);
  }
};
