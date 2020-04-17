const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');	

mongoose.set('useCreateIndex', true);

const userRoutes = require('./src/controller/user-controller').router;
const booksRoutes = require('./src/controller/books-controller').router;
const authorsRoutes = require('./src/controller/authors-controller').router;
const publishersRoutes = require('./src/controller/publishers-controller').router;


var app = express();

app.use(cors());
app.use(bodyParser.json());

app.use('/', userRoutes);
app.use('/books', booksRoutes);
app.use('/authors/', authorsRoutes);
app.use('/publishers', publishersRoutes);

dbURL = 'mongodb://localhost:27017/webtech_2'
mongoose.connect(dbURL,
    {
        useNewUrlParser: true,
        useUnifiedTopology: true
    },
    () => {
        console.log("Connected to database: " + dbURL);
});

var server = app.listen(9000, () =>{
    var host = server.address().address;
    var port = server.address().port;
    console.log("App listening at http://%s:%s", host, port);
});

module.exports = app;