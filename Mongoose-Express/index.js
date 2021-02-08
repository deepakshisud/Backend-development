const express = require('express');
const app = express();
const path = require('path');
const mongoose = require('mongoose');
const methodOverride = require('method-override');
const AppError = require('./AppError');
const Book = require('./models/books');
const Library = require('./models/libraries');
const { isRegExp } = require('util');

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

app.get('/libraries', async(req,res)=> {
    const libraries = await Library.find();
    res.render('libraries/index', {libraries});
})

app.get('/libraries/:id', async(req, res) => {
    const library = await Library.findById(req.params.id).populate('books');
    res.render('libraries/show', {library});
})


app.get('/libraries/new', (req, res) => {
    res.render('libraries/new');
})

app.post('/libraries', async(req,res) => {
    const library = new Library(req.body);
    await library.save();
    res.redirect('/libraries')
})

app.get('/libraries/:id/books/new', (req, res) => {
    const {id} = req.params;
    res.render('new',{id});
})

app.post('/libraries/:id/books', async(req,res) => {
    const {id} = req.params;
    const library = await Library.findById(id);
    const {name, price, category} = req.body;
    const book = new Book({name,price,category});
    library.books.push(book);
    book.library = library;
    await library.save();
    await book.save();
    res.redirect(`/libraries/${id}`);
})



app.get('/books', async (req, res) => {
    const books = await Book.find({})
    res.render('index.ejs', {books});
})

app.get('/books/new', (req, res) => {
    try{
        res.render('new');
    } catch {
        throw new AppError('NOT ALLOWED', 401);
    }

})

app.get('/books/:id/edit', async (req, res) => {
    const {id} = req.params;
    const foundBook = await Book.findById(id);
    if(!foundBook) {
        return next(new AppError('Book not found', 404));
    }
    res.render('edit', {foundBook});
})

app.post('/books', wrapAsync(async (req, res, next) => {
        const newBook = new Book(req.body);
        await newBook.save();
        res.redirect(`/books/${newBook._id}`)
}))

function wrapAsync(fn) {
    return function(req,res,next) {
        fn(req,res,next).catch(e => next(e))
    }
}

app.get('/books/:id', wrapAsync( async (req, res, next) => {
        const {id} = req.params;
        const foundBook = await Book.findById(id);
        if(!foundBook) {
            throw new AppError('Book not found', 404);
        }
        res.render('show', {foundBook});
}))

app.put('/books/:id', wrapAsync(async (req, res, next) => {
        const {id} = req.params;
        const book = await Book.findByIdAndUpdate(id, req.body, {runValidators: true, new: true});
        res.redirect(`/books/${book._id}`)
}))

app.delete('/books/:id', async (req, res) => {
    const {id} = req.params;
    const deletedBook = await Book.findByIdAndDelete(id);
    res.redirect('/books');
})

const handleValidationError = err => {
    console.log(err);
    return new AppError(`Validation failed...${err.message}`,400);
}

app.use((err, req, res, next) => {
    console.log(err.name);
    if(err.name === 'ValidationError') err = handleValidationError(err);
    next(err);
})

app.use((err,req,res,next) => {
    const { status = 500, message='Something went wrong'} = err;
    res.status(status).send(message);
})

app.listen(3000, () => {
    console.log("Listening on port 3000!");
})