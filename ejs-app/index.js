const express =require("express")
const path = require("path");
const app = express()

app.set('view engine', 'ejs');
app.set('views',path.join(__dirname,'/views'));

app.get('/', (req,res) => {
    res.render('home.ejs');
})

app.get('/random', (req, res) => {
    const num = Math.floor(Math.random() *10) + 1;
    res.render('random',{rand: num})
})
app.listen(3000, () => {
    console.log("Listening on Port 3000");
})