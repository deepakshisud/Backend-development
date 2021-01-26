const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/movieApp', {useNewUrlParser: true, useUnifiedTopology: true})
    .then(() => {
        console.log("Connection open");
    })
    .catch(err => {
        console.log("Error detected");
        console.log(err);
    })

  
// const db = mongoose.connection;
// db.on('error', console.error.bind(console, 'connection error:'));
// db.once('open', function() {
//   console.log("Connection open");
// });


const moviesSchema = new mongoose.Schema( {
    title: String,
    year: Number,
    score: Number,
    rating: String
});

const Movie = mongoose.model('Movie', moviesSchema);

// Movie.insertMany( [
//     {title: 'Amelia', year:1908, score:9.0, rating:"R"},
//     {title: 'Iron Man', year:2002, score:8.2, rating:"R"},
//     {title: 'Thor', year:2012, score:5.6, rating:"PG"},
//     {title: 'Kalki', year:2000, score:7.8, rating:"R"},
//     {title: 'Bigboss', year:2003, score:9.9, rating:"PG-13"}
// ])
// .then( data => {
//     console.log("It worked");
//     console.log(data);
// })