const express = require('express');
const morgan = require('morgan');
const app = express();

// app.use(morgan('tiny'));

app.use((req, res, next) => {
    req.method = 'GET';
    console.log(req.method, req.path);
    next();
})


app.get('/', (req, res) => {
    res.send("Homepage");
})

app.get('/dogs', (req, res) => {
    res.send("Woof");
})

app.listen(3000, () => {
    console.log("Listening on host 3000");
})