/**
 * NodeJS Auth
 * Author: SamuelFinocchio (InformaticageNJP)
 */

// Dependencies
const express = require ('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const passport = require('passport');

// Initialization
const app = express();

// Database connection
mongoose.connect('mongodb://localhost/demodb');
mongoose.Promise = global.Promise;

// Adding bodyParser middleware
app.use(bodyParser.json());

// Passport initilization
app.use(passport.initialize());

// Requests handling
app.get('/', function (req, res, next) {
    res.send('API Running successfully');
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
    console.log ("Application listening on port " + port);
});