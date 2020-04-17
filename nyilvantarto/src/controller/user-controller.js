const { User} = require('../models/user');
const express = require('express');
const router = express.Router();

router.get('/getAllUsers', async (req, res) => {
    try{
        const users = await User.find();
        res.json(users)
    }catch(err){
        res.json({message: err})
    }
});

module.exports = {
    router: router
}