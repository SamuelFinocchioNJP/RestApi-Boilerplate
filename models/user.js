/** 
 * Defining user Schema and Model
*/

const mongoose = require('mongoose');
const Schema = mongoose.Schema;
var bcrypt = require('bcryptjs');

const UserSchema = new Schema ({
    // User email
    email: {
        type: String,
        lowercase: true,
        unique: true,
        required: [true, 'attribute required']
    },
    // User password
    password: {
        type: String,
        required: true
    },
    // Account verified and enabled
    enabled: {
        type: Boolean,
        default: false
    }
});

UserSchema.pre('save', function(next) {
    var user = this;
    if(this.isModified('password') || this.isNew) {
        bcrypt.genSalt(10, function(err, salt) {
            if(err) return next(err);
            bcrypt.hash(user.password, salt, function (err, hash) {
                if(err) return next(err);
                user.password = hash;
                next(null);
            })
        })
    } else {
        return next(null);
    }
});

UserSchema.methods.comparePassword = function (password, next) {
    bcrypt.compare(password, this.password, function(err, isMatch) {
        if(err) return next(err);
        next(null, isMatch);
    });
};

// Creating model from schema
const User = mongoose.model('user', UserSchema);

module.exports = User;