const mongoose = require('mongoose');

const AuthorsSchema = mongoose.Schema({
    penName: {
        type: String
    },
    realName: {
        type: String
    },
    birthYear: {
        type: Number
    }
});
 
exports.Author = mongoose.model('Author', AuthorsSchema);
