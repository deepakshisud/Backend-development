const express = require('express');
const morgan = require('morgan');
const app = express();
const AppError = require('./AppError');

// app.use(morgan('tiny'));

app.use((req, res, next) => {
    req.method = 'GET';
    console.log(req.method, req.path);
    next();
})


app.use('/hello', (req, res, next) => {
    console.log("Hello");
    next();
})


const verify_password = (req, res, next) => {
    const {p} = req.query;
    if(p  === 'deepakshi') {
    next(); }
    //res.send("Sorry you need the password");
    throw new AppError("Password required",401);
}


app.get('/', (req, res) => {
    res.send("Homepage");
})

app.get('/error', (req, res) => {
    chicken.fly();
})

app.get('/dogs', (req, res) => {
    res.send("Woof");
})

app.get('/secret', verify_password, (req, res) => {
    res.send("Sup?");
})


app.use((req,res) => {
    res.status(404).send('404 Error');
})

app.use((err,req,res,next) => {
    console.log('***************');
    next(err);

})

app.listen(3000, () => {
    console.log("Listening on host 3000");
})