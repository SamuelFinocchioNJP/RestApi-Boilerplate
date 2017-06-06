var JwtStrategy = require('passport-jwt').Strategy;
var ExtractJwt = require('passport-jwt').ExtractJwt;
var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;

var User = require('../models/user');
var config = require('../config/main');
var apiCredentials = require('../config/api_credentials');

// Setup work and export for the JWT passport strategy
module.exports = function(passport) {

    // JTW Strategy Login
    var opts = {};
    opts.jwtFromRequest = ExtractJwt.fromAuthHeader();
    opts.secretOrKey = config.secret;
    passport.use('jwt', new JwtStrategy(opts, function(jwt_payload, done) {
      User.findOne({id: jwt_payload.id}, function(err, user) {
        if (err) {
          return done(err, false);
        }
        if (user) {
          done(null, user);
        } else {
          done(null, false);
        }
      });
    }));

    // Google Strategy Login
    passport.use('google', new GoogleStrategy({
            clientID: apiCredentials.GOOGLE_CLIENT_ID,
            clientSecret: apiCredentials.GOOGLE_CLIENT_SECRET,
            callbackURL: apiCredentials.GOOGLE_CALLBACK_URL
        },
        function(accessToken, refreshToken, profile, done) {
            /*User.findOrCreate({ googleId: profile.id }, function (err, user) {
                return done(err, user);
            });*/
            console.log(JSON.stringify(profile));
        }
    ));

    // Facebook Strategy Login
    passport.use(new FacebookStrategy({
      clientID: apiCredentials.FACEBOOK_APP_ID,
      clientSecret: apiCredentials.FACEBOOK_APP_SECRET,
      callbackURL: apiCredentials.FACEBOOK_CALLBACK_URL
    },
    function(accessToken, refreshToken, profile, done) {
      /*User.findOrCreate(..., function(err, user) {
        if (err) { return done(err); }
        done(null, user);
      });*/
      console.log(JSON.stringify(profile));
    }
  ));
};