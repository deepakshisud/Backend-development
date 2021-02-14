const express = require('express');
const ejs = require('ejs');
const app = express();
const User = require('./models/user');


app.set('view engine', 'ejs');
app.set('views', 'views');

app.get('/register', (req, res) => {
    res.render('register');
})

app.get('/secret', (req, res) => {
    res.send("Someting");
})

app.listen(3000, () => {
    console.log("Running on port 3000");
})