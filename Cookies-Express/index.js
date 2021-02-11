const express = require('express');
const cookieParser = require('cookie-parser');
const app = express();

app.use(cookieParser());

app.get('/greet', (req, res) => {
    const {name} = req.cookies;
    res.send(`Hey there ${name}`);
})

app.get('/setname', (req, res) => {
    res.cookie('name', 'Aadi');
    res.send("Sent your cookie");
})


app.listen(3000, () => {
    console.log("Listening on route 3000");
})