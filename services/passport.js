const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const mongoose = require('mongoose');
const keys = require('../config/keys');

const User = mongoose.model('users');

passport.use(
  new GoogleStrategy(
    {
      clientID: keys.googleClientID,
      clientSecret: keys.googleClientSecret,
      callbackURL: '/auth/google/callback'
    },
    (accessToken, refreshToken, profile, done) => {
      // checks if user exists
      User.findOne({ googleId: profile.id }).then(existingUser => {
        if (existingUser) {
          //record already exists with this id
          done(null, existingUser);
        } else {
          //record does not exist make a new user
          new User({ googleId: profile.id }) //creates model instance
            .save() //saves it to the db
            .then(user => done(null, user)); //creates a newer model instance
        }
      });
    }
  )
);
