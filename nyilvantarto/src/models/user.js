const mongoose = require('mongoose');

const UserSchema = mongoose.Schema({
    email: {
        type: String
    },
    password: {
        type: String
    }
});
 
exports.User = mongoose.model('User', UserSchema);
