var passport = require('config/auth/passport');
var configMain = require('../main');
var apiCredentials = require('../api_credentials');

module.exports = require('./facebook_strategy')(passport, apiCredentials, configMain);
module.exports = require('./github_strategy')(passport, apiCredentials, configMain);
module.exports = require('./google_strategy')(passport, apiCredentials, configMain);
module.exports = require('./instragram_strategy')(passport, apiCredentials, configMain);
module.exports = require('./jwt_strategy')(passport, apiCredentials, configMain);
module.exports = require('./linkedin_strategy')(passport, apiCredentials, configMain);
module.exports = require('./twitter_strategy')(passport, apiCredentials, configMain);