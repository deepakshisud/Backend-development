const express = require('express');
const cookieParser = require('cookie-parser');
const { signedCookie } = require('cookie-parser');
const app = express();

app.use(cookieParser('thisismysecret'));

app.get('/greet', (req, res) => {
    const {name} = req.cookies;
    res.send(`Hey there ${name}`);
})

app.get('/setname', (req, res) => {
    res.cookie('name', 'Aadi');
    res.send("Sent your cookie");
})

app.get('/getsignedcookie', (req, res) => {
    res.cookie('fruit', 'mango', {signed: true})
    res.send('Signed cookie sent');
})

app.get('/verify', (req, res) => {
    res.send(req.signedCookies);
})


app.listen(3000, () => {
    console.log("Listening on route 3000");
})