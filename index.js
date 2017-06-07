/**
 * NodeJS Auth
 * Author: SamuelFinocchio (InformaticageNJP)
 */

// Dependencies
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const passport = require('passport');
const morgan = require('morgan');
const session = require('express-session');

const mainConfig = require('./config/main');

// Initialization
const app = express();

// Database connection
mongoose.connect(mainConfig.mongoDatabase);
mongoose.Promise = global.Promise;

// Adding bodyParser middleware
app.use(bodyParser.json());

// Morgan initialization
app.use(morgan(mainConfig.environment));

// Express Session initialization
app.use(session({ secret: 'keyboard cat', resave: true, saveUninitialized: true }));

// Passport initialization
app.use(passport.initialize());
app.use(passport.session());

// Requests handling
app.get('/', function (req, res, next) {
    res.send('Api running under /api route!');
});

// Using custom routes
const demo = require('./routes/demo');
app.use('/custom', demo);

const user = require ('./routes/user');
app.use(user);

// Error handling middleware
app.use(function(err, req, res, next) {
    res.status(422).send({error: err.message});
});

// Configuration
const port = process.env.port || 8000;

// Listening 
app.listen(port, function() {
    console.log ("A penguin is dancing on http://localhost:" + port);
    console.log ("App is running in " + mainConfig.environment + " mode.");
});