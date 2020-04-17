const { Book } = require('../models/book');
const express = require('express');
const router = express.Router();

router.get('/getAllBooks', async (req, res) => {
    try{
        const books = await Book.find();
        res.json(books)
    }catch(err){
        res.json({message: err})
    }
});

router.delete('/deleteBookByTitle/:title', async (req, res) => {
    try{
        const deletedBook = await Book.deleteOne({title: req.params.title});
        res.json(deletedBook)
    }catch(err){
        res.json({message: err})
    }
});

router.post('/createBook', async (req, res) => {

    let book = await Book.findOne({ title: req.body.title });

    if (book) {
        return res.status(400).send('The book: ' + req.body.title + ' already exists!');
    } else {
        book = new Book({
            title: req.body.title,
            pageNumber: req.body.pageNumber,
            publicationYear: req.body.publicationYear,
            author_name: req.body.author.penName,
            publisher_name: req.body.publisher.name
        });
        try {
        const saveBook = await book.save();
        res.json(saveBook);
        } catch(err) {
            res.json({ message: err })
        }
    }
});

module.exports = {
    router: router
}