/**
 * NodeJS Auth
 * Author: SamuelFinocchio (InformaticageNJP) && Samuel Roberto 
 */

// Dependencies
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const passport = require('passport');
const morgan = require('morgan');
const session = require('express-session');

const swaggerTools = require('swagger-tools');
const jsyaml = require('js-yaml');
const fs = require('fs');

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
// swaggerRouter configuration
var options = {
    swaggerUi: './swagger.json',
    controllers: './controllers',
    useStubs: process.env.NODE_ENV === 'development' ? true : false // Conditionally turn on stubs (mock mode)
};

// The Swagger document (require it, build it programmatically, fetch it from a URL, ...)
var spec = fs.readFileSync('./api/swagger.yaml', 'utf8');
var swaggerDoc = jsyaml.safeLoad(spec);

// Initialize the Swagger middleware
swaggerTools.initializeMiddleware(swaggerDoc, function (middleware) {
    // Interpret Swagger resources and attach metadata to request - must be first in swagger-tools middleware chain
    app.use(middleware.swaggerMetadata());

    // Validate Swagger requests
    app.use(middleware.swaggerValidator());

    // Route validated requests to appropriate controller
    app.use(middleware.swaggerRouter(options));

    // Serve the Swagger documents and Swagger UI
    app.use(middleware.swaggerUi());

});

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