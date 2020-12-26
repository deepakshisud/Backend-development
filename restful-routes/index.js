// GET /comments - list all comments
// POST /comments/new - Create a new comment
// GET /comments/:id - Get one comment (using ID)
// PATCH /comment/:id - Update one comment
// DLETE /comment/:id - Destroy one comment


const express = require('express');
const { request } = require('http');
const app = express();
const path = require('path');
const methodOverride = require('method-override')
const { v4: uuid} = require('uuid');

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'))

app.use(express.urlencoded({extended: true}))
app.use(express.json())
app.use(methodOverride('_method'))


app.get('/tacos', (req,res) =>  {
    res.send("GET / tacos response");
})

let comments = [
    {
        id: uuid(),
        username: 'Deepakshi',
        comment: 'Lol thats so funny'
    },
    {
        id: uuid(),
        username: 'Aadi',
        comment: 'I love u'
    },
    {
        id: uuid(),
        username: 'Maanas',
        comment: 'Lets play something'
    },
    {
        id: uuid(),
        username: 'Muma',
        comment: 'Where is Spinny?'
    }

];

app.get('/comments', (req,res) => {
    res.render('comments/index.ejs', {comments})
})

app.get('/comments/:id', (req, res) => {
    const {id} = req.params;
    const comment = comments.find(c => c.id === id);
    res.render('comments/show', {comment})
})

app.get('/comments/new', (req,res) => {
    res.render('comments/new.ejs')
})

app.post('/comments', (req, res) => {
    const {username, comment} = req.body;
    comments.push({username, comment, id : uuid()});
    res.redirect('/comments')
})

app.patch('/comments/:id' , (req,res) => {
    const {id} = req.params;
    const newCommentText = req.body.comment;
    const foundComment = comments.find(c => c.id === id);
    foundComment.comment = newCommentText;
    res.redirect('/comments');
})

app.get('/comments/:id/edit', (req,res) => {
    const {id} = req.params;
    const comment = comments.find(c => c.id === id);
    res.render('comments/edit', {comment});
})

app.delete('/comments/:id', (req, res) => {
    const {id} = req.params;
    comments = comments.filter(c => c.id !== id);
    res.redirect('/comments');
})

app.post('/tacos', (req,res) => {
    const {meat, quantity} = req.body;
    res.send(`Ok. Here are your ${meat} tacos with quantity ${quantity}`); 
})
app.listen(3000, () => {
    console.log("Listening on Port 3000");
})