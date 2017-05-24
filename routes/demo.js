const express = require('express');
const router = express.Router();
const Demo = require('../models/demo');

// POST request CREATE
router.post('/demo', function(req, res) {
    // Creates a demo in the database
    Demo.create(req.body).then(function(demo){
        // Sends the object created as a response
        res.send(demo);
    });
    
});

// GET request READ
router.get('/demo', function(req, res) {
    res.send({request: 'GET DEMO'});
});

// PUT request UPDATE
router.put('/demo/:id', function(req, res) {
    res.send({ request: 'PUT DEMO'});
});

// DELETE request DELETE
router.delete('/demo/:id', function(req, res) {
    res.send({request: 'DELETE DEMO'});
});

module.exports = router;