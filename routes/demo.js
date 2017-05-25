// Express
const express = require('express');
const router = express.Router();

// Models
const Demo = require('../models/demo');

// POST request CREATE
router.post('/demo', function(req, res, next) {
    // Creates a demo in the database
    Demo.create(req.body).then(function(demo) {
        // Sends the object created as a response
        res.send(demo);
    }).catch(next);
});

// GET request READ
router.get('/demo', function(req, res, next) {
    // Lists all the demos in the database
    Demo.find({}).then(function(demosList) {
        // Sends the list as a response
        res.send(demosList);
    });
});

// PUT request UPDATE
router.put('/demo/:id', function(req, res, next) {
    // Updates a demo in the database
    Demo.findByIdAndUpdate({_id: req.params.id}, req.body).then(function() {
        // Sends the updated object after the update call as a response
        Demo.findById({_id: req.params.id}).then(function(demo) {
            res.send(demo);
        });
    });
});

// DELETE request DELETE
router.delete('/demo/:id', function(req, res, next) {
    // Deletes a demo in the database 
    Demo.findByIdAndRemove({_id: req.params.id}).then(function(demo) {
        // Sends the object deleted as response
        res.send(demo);
    });
});

module.exports = router;