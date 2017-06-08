var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
var User = require('../../models/user');

module.exports = function(passport, apiCredentials, configMain){
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
};