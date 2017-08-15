const express = require('express');
const mongoose = require('mongoose');
const cookieSession = require('cookie-session'); // to make cookies
const passport = require('passport'); // to make passport know to make use of the cookies
const keys = require('./config/keys');
require('./models/User');
require('./services/passport'); //ES6 doesn't require you to add the .js at the end of a js file

mongoose.connect(keys.mongoURI);

const app = express();

app.use(
  cookieSession({
    maxAge: 30 * 24 * 60 * 60 * 1000, //the age must be represented in milliseconds (this is 30 days in ms)
    keys: [keys.cookieKey] //encrypts the key
  })
);
app.use(passport.initialize());
app.use(passport.session());

require('./routes/authRoutes')(app);

const PORT = process.env.PORT || 5000;
app.listen(PORT);
