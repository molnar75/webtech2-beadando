const mongoose = require('mongoose');

const BooksSchema = mongoose.Schema({
    title: {
        type: String
    },
    pageNumber: {
        type: Number
    },
    publicationYear: {
        type: Number
    },
    author_name: {
        type: String
    },
    publisher_name: {
        type: String
    }
});
 
exports.Book = mongoose.model('Book', BooksSchema);
