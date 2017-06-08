var GitHubStrategy = require('passport-github2').Strategy;
var User = require('../../models/user');

module.exports = function(passport, apiCredentials, configMain) {
    passport.use(new GitHubStrategy({
            clientID: apiCredentials.GITHUB_CLIENT_ID,
            clientSecret: apiCredentials.GITHUB_CLIENT_SECRET,
            callbackURL: apiCredentials.GITHUB_CALLBACK_URL
        },
        function(accessToken, refreshToken, profile, done) {
            /*User.findOrCreate({ githubId: profile.id }, function (err, user) {
             return done(err, user);
             });*/
            console.log(JSON.stringify(profile));
        }
    ));
};