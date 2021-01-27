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
app.use(express.urlencoded({extended: true}))


app.get('/books', async (req, res) => {
    const books = await Book.find({})
    res.render('index.ejs', {books});
})

app.get('/books/new', (req, res) => {
    res.render('new');
})

app.get('/books/:id/edit', async (req, res) => {
    const {id} = req.params;
    const foundBook = await Book.findById(id);
    res.render('edit', {foundBook});
})

app.post('/books', async (req, res) => {
    const newBook = new Book(req.body);
    await newBook.save();
    console.log(newBook);
    res.redirect(`/books/${newBook._id}`)
})

app.get('/books/:id', async (req, res) => {
    const {id} = req.params;
    const foundBook = await Book.findById(id);
    res.render('show', {foundBook});
})

app.listen(3000, () => {
    console.log("Listening on port 3000!");
})