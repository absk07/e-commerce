const mongoose = require('mongoose');
var passportLocalMongoose = require('passport-local-mongoose');


const userSchema = mongoose.Schema({
    name: {
        type: String
    },
    email: {
        type: String
    },
    username: {
        type: String
    },
    admin: {
        type: Number
    }
});

userSchema.plugin(passportLocalMongoose);

const User = mongoose.model('User', userSchema);

module.exports = User;