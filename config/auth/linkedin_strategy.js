var LinkedInStrategy = require('passport-linkedin').Strategy;
var User = require('../../models/user');

module.exports = function(passport, apiCredentials, configMain){
    passport.use(new LinkedInStrategy({
            consumerKey: apiCredentials.LINKEDIN_API_KEY,
            consumerSecret: apiCredentials.LINKEDIN_SECRET_KEY,
            callbackURL: apiCredentials.LINKEDIN_CALLBACK_URL
        },
        function(token, tokenSecret, profile, done) {
            /*User.findOrCreate({ linkedinId: profile.id }, function (err, user) {
             return done(err, user);
             });*/
            console.log(JSON.stringify(profile));
        }
    ));
};