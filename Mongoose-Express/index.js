const express = require('express');
const app = express();
const path = require('path');
const mongoose = require('mongoose');

const Book = require('./models/books');

mongoose.connect('mongodb://localhost:27017/booksApp', {useNewUrlParser: true, useUnifiedTopology: true})
    .then(() => {
        console.log("Mongo Connection open");
    })
    .catch(err => {
        console.log("Mongo Error detected");
        console.log(err);
    })


app.set('views',path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.get('/books', async (req, res) => {
    const books = await Book.find({})
    res.render('index.ejs', {books});
})

app.get('/books/:id', async (req, res) => {
    const {id} = req.params;
    const foundBook = await Book.findById(id);
    console.log(foundBook);
    res.send('Details page');
})

app.listen(3000, () => {
    console.log("Listening on port 3000!");
})