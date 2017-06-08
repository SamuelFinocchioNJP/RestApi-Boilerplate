// Express
const express = require('express');
const router = express.Router();

require('../config/passport');

// Application configuration
const config = require('../config/main');

// Authentication dependencies
var passport = require('passport');

// Models
const User = require('../models/user');
const expressJwt = require('express-jwt');
const jwt = require('jsonwebtoken');

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
                var token = jwt.sign(user, config.secret, {expiresIn: 2592000});
                res.send( {success: true, message: 'Bearer ' + token} );
            } else {
                res.status(403).send( {success: false, message: "Wrong username or password"} );
            }
        });
    }).catch(next);
});


// Protected api example
router.get('/protected',  authenticate, function (req, res, next) {
     res.status(200).send( {success: true, message: "logged"} );
});

// Google authentication routes
router.get('/auth/google',
    passport.authenticate('google', { scope: ['https://www.googleapis.com/auth/plus.login'] }));

router.get('/auth/google/callback',
    passport.authenticate('google', { failureRedirect: '/login' }),
    function(req, res) {
        res.redirect('/');
    });

// Facebook authentication routes
router.get('/auth/facebook', passport.authenticate('facebook'));

router.get('/auth/facebook/callback',
  passport.authenticate('facebook', { successRedirect: '/', failureRedirect: '/login' }));

// Twitter authentication routes
router.get('/auth/twitter', passport.authenticate('twitter'));

router.get('/auth/twitter/callback',
    passport.authenticate('twitter', { successRedirect: '/',
        failureRedirect: '/login' }));

// GitHub authentication routes
router.get('/auth/github',
    passport.authenticate('github', { scope: [ 'user:email' ] }));

router.get('/auth/github/callback',
    passport.authenticate('github', { failureRedirect: '/login' }),
    function(req, res) {
        // Successful authentication, redirect home.
        res.redirect('/');
    });

//LinkedIn authentication routes
router.get('/auth/linkedin',
    passport.authenticate('linkedin'));

router.get('/auth/linkedin/callback',
    passport.authenticate('linkedin', { failureRedirect: '/login' }),
    function(req, res) {
        // Successful authentication, redirect home.
        res.redirect('/');
    });

router.get('/auth/instagram',
    passport.authenticate('instagram'));

router.get('/auth/instagram/callback',
    passport.authenticate('instagram', { failureRedirect: '/login' }),
    function(req, res) {
        // Successful authentication, redirect home.
        res.redirect('/');
    });

module.exports = router;