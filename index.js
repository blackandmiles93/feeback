const express = require('express');
const mongoose = require('mongoose');
const cookieSession = require('cookie-session'); // to make cookies
const passport = require('passport'); // to make passport know to make use of the cookies
const keys = require('./config/keys');
const bodyParser = require('body-parser');
require('./models/User');
require('./models/Survey');
require('./services/passport'); //ES6 doesn't require you to add the .js at the end of a js file

mongoose.connect(keys.mongoURI, {
  useMongoClient: true
});

const app = express();

app.use(bodyParser.json()); //parsing incoming post request

app.use(
  cookieSession({
    maxAge: 30 * 24 * 60 * 60 * 1000, //the age must be represented in milliseconds (this is 30 days in ms)
    keys: [keys.cookieKey] //encrypts the key
  })
);
app.use(passport.initialize());
app.use(passport.session());

require('./routes/authRoutes')(app);
require('./routes/payRoutes')(app);
require('./routes/surveyRoutes')(app);

if (process.env.NODE_ENV === 'production') {
  // make sure express will serve up production assets
  // like main.js, or main.css file
  app.use(express.static('client/build'));
  // express will serve up the index.html file
  // if it does not recognize route
  const path = require('path');
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
}

const PORT = process.env.PORT || 5000;
app.listen(PORT);
