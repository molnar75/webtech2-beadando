const mongoose = require('mongoose');

const PublishersSchema = mongoose.Schema({
    name: {
        type: String
    },
    address: {
        type: String
    },
    fundationYear: {
        type: Number
    }
});
 
exports.Publisher = mongoose.model('Publisher', PublishersSchema);
