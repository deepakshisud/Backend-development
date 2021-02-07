const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/relationshipDB', {useNewUrlParser: true, useUnifiedTopology: true})
    .then(() => {
        console.log("Connection open");
    })
    .catch(err => {
        console.log("Error detected");
        console.log(err);
    })


const userSchema = new mongoose.Schema({
    name: String,
    age: Number
})

const tweetSchema = new mongoose.Schema({
    text: String,
    likes: Number,
    user: [{type: mongoose.Schema.Types.ObjectId, ref: 'User'}]
})

const User = mongoose.model('User', userSchema);
const Tweet = mongoose.model('Tweet', tweetSchema);

const makeTweets = async() => {
    // const u = new User({name:'Aadi', age:'21'});
    const u = await User.findOne({name: 'Aadi'})
    const tweet2 = new Tweet({text:'fdkjgsjdhf', likes:6});
    tweet2.user = u;
    tweet2.save();

}

makeTweets();

