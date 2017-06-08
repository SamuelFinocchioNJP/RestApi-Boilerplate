var FacebookStrategy = require('passport-facebook');
var User = require('../../models/user');

module.exports = function(passport, apiCredentials, configMain) {
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