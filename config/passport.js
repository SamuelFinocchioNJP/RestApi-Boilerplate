var passport = require('passport');
var configMain = require('../config/main');
var apiCredentials = require('../config/api_credentials');

module.exports = require('./auth/facebook_strategy')(passport, apiCredentials, configMain);
module.exports = require('./auth/github_strategy')(passport, apiCredentials, configMain);
module.exports = require('./auth/google_strategy')(passport, apiCredentials, configMain);
module.exports = require('./auth/instragram_strategy')(passport, apiCredentials, configMain);
module.exports = require('./auth/jwt_strategy')(passport, apiCredentials, configMain);
module.exports = require('./auth/linkedin_strategy')(passport, apiCredentials, configMain);
module.exports = require('./auth/twitter_strategy')(passport, apiCredentials, configMain);