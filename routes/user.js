// Express
const express = require('express');
const router = express.Router();

// Application configuration
const config = require('../config/main');

// Authentication dependencies
var jwt = require('jsonwebtoken');
var passport = require('passport');

// Models
const User = require('../models/user');
const expressJwt = require('express-jwt');
const passportConfig = require('../config/passport');
const mainConfig = require('../config/main');
const authenticate = expressJwt({secret: mainConfig.secret});

// POST request CREATE
router.post('/register', function(req, res, next) {
    // Creates a user in the database
    var newUser = new User({
        email: req.body.email,
        password: req.body.password
    });
    newUser.save(function(err) {
        if (err) next(err);
        res.json({email: req.body.email});
    })
});

// GET request LOGIN
router.post('/login', function(req, res, next) {
    // Lists all the users in the database
    User.findOne({email: req.body.email}).then(function(user) {
        user.comparePassword(req.body.password, function(err, matching) {
            if(!err && matching) {
                console.log(config.secret);
                var token = jwt.sign(user, config.secret, {expiresIn: 600});
                res.send( {success: true, message: 'JWT ' + token} );
            } else {
                res.status(403).send( {success: false, message: "Wrong username or password"} );
            }
        });
    }).catch(next);
});

router.get('/protected',  authenticate, function (req, res, next) {
     res.status(200).send( {success: true, message: "logged"} );
});


module.exports = router;