const express =require("express")
const path = require("path");
const app = express()
const redditData = require('./data.json');

app.set('view engine', 'ejs');
app.set('views',path.join(__dirname,'/views'));

app.get('/', (req,res) => {
    res.render('home.ejs');
})

app.get('/random', (req, res) => {
    const num = Math.floor(Math.random() *10) + 1;
    res.render('random',{num: num})
})

app.get('/r/:subreddit', (req,res) =>{
    const {subreddit} = req.params;
    const data = redditData[subreddit];
    res.render('subreddit', {...data});
})

app.get('/dogs', (req, res) => {
    const dogs = [
        'Spinny', 'Bow', 'Arrow', 'Billy'
    ];
    res.render('dogs', {dogs})
})
app.listen(3000, () => {
    console.log("Listening on Port 3000");
})