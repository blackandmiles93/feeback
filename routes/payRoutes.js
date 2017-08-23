const keys = require('../config/keys');
const stripe = require('stripe')(keys.stripeSecretKey);
const requireLogin = require('../middlewares/requireLogin');
//billing the card in the backend. this charge object is what actually charges the card through the stripe api
module.exports = app => {
  app.post('/api/stripe', requireLogin, async (req, res) => {
    const charge = await stripe.charges.create({
      amount: 500,
      currency: 'usd',
      description: '$5 for 5 credits',
      source: req.body.id
    });
    // after successful charge, add credits to user and save it to the db
    req.user.credits += 5;
    const user = await req.user.save();

    res.send(user);
  });
};
