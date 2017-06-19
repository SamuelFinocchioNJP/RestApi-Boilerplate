const PaypalSDK = require('paypal-rest-sdk');
const apiCredentials = require('../api_credentials.js');

PaypalSDK.configure({
  'mode': 'sandbox',
  'client_id': apiCredentials.PAYPAL_CLIENT_ID,
  'client_secret': apiCredentials.PAYPAL_CLIENT_SECRET
});