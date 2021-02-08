const mongoose = require('mongoose');
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

const Library = mongoose.model('Library', libSchema);
Library.deleteMany();
module.exports = Library;