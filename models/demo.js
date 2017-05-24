/** 
 * Defining demo Schema and Model
*/

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const DemoSchema = new Schema ({
    // Defining a string attribute
    string_attribute: {
        type: String, 
        required: [true, 'attribute required']
    },
    // Defining a number attribute
    number_attribute: {
        type: Number
    },
    // Defining a boolean attribute
    boolean_attribute: {
        type: Boolean,
        default: false
    }
});

// Creating model from schema
const Demo = mongoose.model('demo', DemoSchema);

module.exports = Demo;