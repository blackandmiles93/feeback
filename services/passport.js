const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const FacebookStrategy = require('passport-facebook').Strategy;
const mongoose = require('mongoose');
const keys = require('../config/keys');

const User = mongoose.model('users');

// function to take an existing user and generate a cookie
passport.serializeUser((user, done) => {
  //this user.id is the mongo id
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  User.findById(id).then(user => {
    done(null, user);
  });
});

passport.use(
  new GoogleStrategy(
    {
      clientID: keys.googleClientID,
      clientSecret: keys.googleClientSecret,
      callbackURL: '/auth/google/callback',
      proxy: true
    },
    async (accessToken, refreshToken, profile, done) => {
      // checks if user exists
      const existingUser = await User.findOne({ googleId: profile.id });
      if (existingUser) {
        //record already exists with this id
        return done(null, existingUser);
      } //record does not exist make a new user
      const user = await new User({ googleId: profile.id }).save(); //creates model instance and saves it to the db
      done(null, user); //creates a newer model instance
    }
  )
);

passport.use(
  new FacebookStrategy(
    {
      clientID: keys.facebookClientID,
      clientSecret: keys.facebookClientSecret,
      callbackURL: '/auth/facebook/callback'
    },
    async (accessToken, refreshToken, profile, done) => {
      const existingUser = await User.findOne({ facebookId: profile.id });
      if (existingUser) {
        return done(null, existingUser);
      }
      const user = await new User({ facebookId: profile.id }).save();
      done(null, user);
    }
  )
);
