/** 
 * Defining demo Schema and Model
*/

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const DemoSchema = new Schema ({
    // Defining a string attribute
    stringAttribute: {
        type: String, 
        required: [true, 'attribute required']
    },
    // Defining a number attribute
    numberAttribute: {
        type: Number
    },
    // Defining a boolean attribute
    booleanAttribute: {
        type: Boolean,
        default: false
    }
});

// Creating model from schema
const Demo = mongoose.model('demo', DemoSchema);

module.exports = Demo;