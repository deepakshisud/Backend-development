const mongoose = require('mongoose');
const Book = require('./books');
const { Schema } = mongoose;

const libSchema = new Schema({
    names: {
        type: String,
    },
    citys: String,
    emails: {
        type: String,
    },
    books: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Book'
        }
    ]
})

libSchema.post('findOneAndDelete', async function(library) {
    if(library.books.length) {
        const res = await Book.deleteMany({_id:{$in: library.books}})
        console.log(res);
    }
})


const Library = mongoose.model('Library', libSchema);
Library.deleteMany();
module.exports = Library;