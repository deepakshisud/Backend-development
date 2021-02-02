const express = require('express');
const app = express();
const path = require('path');
const mongoose = require('mongoose');
const methodOverride = require('method-override');
const AppError = require('./AppError');
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
app.use(methodOverride('_method'));

app.get('/books', async (req, res) => {
    const books = await Book.find({})
    res.render('index.ejs', {books});
})

app.get('/books/new', (req, res) => {
    throw new AppError('NOT ALLOWED', 401);
    res.render('new');
})

app.get('/books/:id/edit', async (req, res) => {
    const {id} = req.params;
    const foundBook = await Book.findById(id);
    if(!foundBook) {
        return next(new AppError('Book not found', 404));
    }
    res.render('edit', {foundBook});
})

app.post('/books', async (req, res, next) => {
    try {
        const newBook = new Book(req.body);
        await newBook.save();
        res.redirect(`/books/${newBook._id}`)
    } catch(e) {
        next(e);
    }

})

app.get('/books/:id', async (req, res, next) => {
    const {id} = req.params;
    const foundBook = await Book.findById(id);
    if(!foundBook) {
        return next(new AppError('Book not found', 404));
    }
    res.render('show', {foundBook});
})

app.put('/books/:id', async (req, res, next) => {
    try {
        const {id} = req.params;
        const book = await Book.findByIdAndUpdate(id, req.body, {runValidators: true, new: true});
        res.redirect(`/books/${book._id}`)
    } catch(e) {
        next(e);
    }

})

app.delete('/books/:id', async (req, res) => {
    const {id} = req.params;
    const deletedBook = await Book.findByIdAndDelete(id);
    res.redirect('/books');
})

app.use((err,req,res,next) => {
    const { status = 500, message='Something went wrong'} = err;
    res.status(status).send(message);
})

app.listen(3000, () => {
    console.log("Listening on port 3000!");
})