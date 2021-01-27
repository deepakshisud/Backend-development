const Book = require('./models/books');
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/booksApp', {useNewUrlParser: true, useUnifiedTopology: true})
    .then(() => {
        console.log("Mongo Connection open");
    })
    .catch(err => {
        console.log("Mongo Error detected");
        console.log(err);
    })

// const b = new Book( {
//     name: 'I too had a love story',
//     price: 150,
//     category: 'romance'
// });
// b.save().then(b=> {
//     console.log(b);
// })
// .catch( e => {
//     console.log(e);
// })

const seedBooks = [
    {
        name: 'Fifty Shades of Grey',
        price: 500,
        category: 'romance'
    },
    {
        name: 'Harry Potter and the Deathly Hollows',
        price: 700,
        category: 'thriller'
    },
    {
        name: 'The girl in room 201',
        price: 250,
        category: 'romance'
    },
    {
        name: 'The Boy in Stripped Pajamas',
        price: 550,
        category: 'horror'
    }
]

Book.insertMany(seedBooks)
.then(res => {
    console.log(res)
})
.catch(err => {
    console.log(err);
})