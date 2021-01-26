const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/movieApp', {useNewUrlParser: true, useUnifiedTopology: true})
    .then(() => {
        console.log("Connection open");
    })
    .catch(err => {
        console.log("Error detected");
        console.log(err);
    })

const personSchema = new mongoose.Schema( {
    first: String,
    last: String
})

personSchema.virtual('fullName').get(function() {
    return `${this.first} ${this.last}`
})

const Person = mongoose.model('Person', personSchema);