const TwitterStrategy = require('passport-twitter').Strategy;
var User = require('../../models/user');

module.exports = function(passport, apiCredentials, configMain) {
    passport.use(new TwitterStrategy({
            consumerKey: apiCredentials.TWITTER_CONSUMER_KEY,
            consumerSecret: apiCredentials.TWITTER_CONSUMER_SECRET,
            callbackURL: apiCredentials.TWITTER_CALLBACK_URL
        },
        function(token, tokenSecret, profile, done) {
            /*User.findOrCreate(..., function(err, user) {
             if (err) { return done(err); }
             done(null, user);
             });*/
            console.log(JSON.stringify(profile));
        }
    ));
};