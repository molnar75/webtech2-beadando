const { Publisher } = require('../models/publisher');
const express = require('express');
const router = express.Router();

router.get('/getAllPublishers', async (req, res) => {
    try{
        const publishers = await Publisher.find();
        res.json(publishers)
    }catch(err){
        res.json({message: err})
    }
});

router.get('/getPublisherByPenName/:name', async (req, res) => {
    try{
        const publisher = await Publisher.findOne({name: req.params.name});
        res.json(publisher)
    }catch(err){
        res.json({message: err})
    }
});

router.delete('/deletePublisherByName/:name', async (req, res) => {
    try{
        const deletedPublisher = await Publisher.deleteOne({name: req.params.name});
        res.json(deletedPublisher)
    }catch(err){
        res.json({message: err})
    }
});

router.post('/createPublisher', async (req, res) => {

    let publisher = await Publisher.findOne({ name: req.body.name });

    if (publisher) {
        return res.json({"error": true});
    } else {
        publisher = new Publisher({
            name: req.body.name,
            address: req.body.address,
            fundationYear: req.body.fundationYear
        });
        try {
        const savePublisher = await publisher.save();
        res.json(savePublisher);
        } catch(err) {
            res.json({ message: err })
        }
    }
});

module.exports = {
    router: router
}