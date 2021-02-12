const express = require('express');
const app = express();
const session = require('express-session');

const sessionOptions = {secret: 'thisisnotagoodsecret', resave: false, saveUninitialized: false}

app.use(session(sessionOptions));

app.get('/pages', (req, res) => {
    if(req.session.count) {
        req.session.count+=1;
    } else {
        req.session.count=1;
    }
    res.send(`You have viewed this page ${req.session.count}`);
})

app.listen(3000, () => {
    console.log("Listening on port 3000");
})