const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema( {
    name: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true,
        min: 0
    },
    category: {
        type: String,
        lowercase: true,
        enum: ['romance', 'horror', 'thriller', 'comedy']
    }
})

const Book = mongoose.model('Book', bookSchema);

module.exports = Book;