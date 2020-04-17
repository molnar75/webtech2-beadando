const { Author } = require('../models/author');
const express = require('express');
const router = express.Router();

router.get('/getAllAuthors', async (req, res) => {
    try{
        const authors = await Author.find();
        res.json(authors)
    }catch(err){
        res.json({message: err})
    }
});

router.get('/getAuthorByPenName/:penName', async (req, res) => {
    try{
        const author = await Author.findOne({penName: req.params.penName});
        res.json(author)
    }catch(err){
        res.json({message: err})
    }
});

router.delete('/deleteAuthorByPenName/:penName', async (req, res) => {
    try{
        const deletedAuthor = await Author.deleteOne({penName: req.params.penName});
        res.json(deletedAuthor)
    }catch(err){
        res.json({message: err})
    }
});

router.post('/createAuthor', async (req, res) => {

    let author = await Author.findOne({ penName: req.body.penName, realName: req.body.realName });

    if (author) {
        return res.status(400).send('The author: ' + req.body.penName + ' already exists!');
    } else {
        author = new Author({
            penName: req.body.penName,
            realName: req.body.realName,
            birthYear: req.body.birthYear
        });
        try {
        const saveAuthor = await author.save();
        res.json(saveAuthor);
        } catch(err) {
            res.json({ message: err })
        }
    }
});

module.exports = {
    router: router
}