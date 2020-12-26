// GET /comments - list all comments
// POST /comments - Create a new comment
// GET /comments/:id - Get one comment (using ID)
// PATCH /comment/:id - Update one comment
// DLETE /comment/:id - Destroy one comment


const express = require('express');
const app = express();
const path = require('path');

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'))

app.use(express.urlencoded({extended: true}))
app.use(express.json())

app.get('/tacos', (req,res) =>  {
    res.send("GET / tacos response");
})

const comments = [
    {
        username: 'Deepakshi',
        comment: 'Lol thats so funny'
    },
    {
        username: 'Aadi',
        comment: 'I love u'
    },
    {
        username: 'Maanas',
        comment: 'Lets play something'
    },
    {
        username: 'Muma',
        comment: 'Where is Spinny?'
    }

];

app.get('/comments', (req,res) => {
    res.render('comments/index.ejs', {comments})
})

app.get('/comments/new', (req,res) => {
    res.render('comments/new.ejs')
})

app.post('/comments', (req, res) => {
    const {username, comment} = req.body;
    comments.push({username, comment});
    res.send("It worked")
})
app.post('/tacos', (req,res) => {
    const {meat, quantity} = req.body;
    res.send(`Ok. Here are your ${meat} tacos with quantity ${quantity}`); 
})
app.listen(3000, () => {
    console.log("Listening on Port 3000");
})