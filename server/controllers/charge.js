var Customer = require('./models/customer.js');
var stripeKeys = require('./config.js');
var stripe = require('stripe')(stripeKeys.secretKey);

module.exports = function(req, res) {
  'use strict';
  // obtain StripeToken
  var transaction = req.body;
  var stripeToken = transaction.stripeToken;
  var newCustomer = new Customer({token: stripeToken });
  newCustomer.save(function(err) {
    if (err) {
      console.log(err);
    } else {
      console.log('CHARGE: Success!');
    }
  });
  
  // create charge
  var charge = {
    amount: 10*100,
    currency: 'USD',
    card: stripeToken
  };
  
  stripe.charges.create(charge, function(err, charge) {
    if(err) {
      console.log(err);
    }
    else {
      res.json(charge);
      console.log('CHARGE:  Successful charge sent to Stripe!');
    }
  });

  // render congrats page
  res.render('congrats', { title: 'Congrats!', charge: charge.amount/100.00});
};
