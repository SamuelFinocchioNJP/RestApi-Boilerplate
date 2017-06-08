var InstagramStrategy = require('passport-instagram').Strategy;
var User = require('../../models/user');

module.exports = function(passport, apiCredentials, configMain){
    passport.use('instagram', new InstagramStrategy({
            clientID: apiCredentials.INSTAGRAM_CLIENT_ID,
            clientSecret: apiCredentials.INSTAGRAM_CLIENT_SECRET,
            callbackURL: apiCredentials.INSTAGRAM_CALLBACK_URL
        },
        function(accessToken, refreshToken, profile, done) {
            /*User.findOrCreate({ instagramId: profile.id }, function (err, user) {
                return done(err, user);
            });*/
            console.log(JSON.stringify(profile));
        }
    ));
};