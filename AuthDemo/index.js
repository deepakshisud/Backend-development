const express = require('express');
const ejs = require('ejs');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const session = require('express-session');
const app = express();
const User = require('./models/user');

mongoose.connect('mongodb://localhost:27017/movieApp', {useNewUrlParser: true, useUnifiedTopology: true})
    .then(() => {
        console.log("Connection open");
    })
    .catch(err => {
        console.log("Error detected");
        console.log(err);
    })

app.set('view engine', 'ejs');
app.set('views', 'views');

app.use(express.urlencoded({extended: true}));
app.use(session({secret:'secret'}))

app.get('/', (req, res) => {
    res.send("Home page");
})

app.get('/register', (req, res) => {
    res.render('register');
})


app.get('/login', (req, res) => {
    res.render('login');
})

app.post('/login', async(req, res) => {
    const {username, password} = req.body;
    const user = await User.findOne({username})
    const validPassword = await bcrypt.compare(password,user.password);
    if(validPassword) {
        req.session.user_id = user._id;
        res.redirect('/secret')
    }
    else {
        res.redirect('/login');
    }
})

app.post('/register', async(req, res) => {
    const {password, username} = req.body;
    const hash = await bcrypt.hash(password, 12);
    const user = new User({
        username,
        password: hash
    })
    await user.save();
    req.session.user_id = user._id;
    res.redirect('/');
})

app.get('/secret', (req, res) => {
    if(!req.session.user_id) {
        res.redirect('/login');
    }
    res.send('Secret');
})

app.listen(3000, () => {
    console.log("Running on port 3000");
})