const express = require("express");
const app = express()

// app.use((req, res) => {
//     console.log("WE GOT A NEW REQUESST");
//     res.send({ color: 'red'})
// })
app.listen(3000, () => {
    console.log("LISTENING ON PORT 3000");
})

app.get('/r/:subreddit', (req, res) => {
    const { subreddit } = req.params;
    res.send(`<h1>Browing the ${subreddit} page</h1>`);
    console.log(req.params);
})

app.get('/search', (req,res) => {
    const {q} = req.query;
    res.send(`Hello ${q}`);
})

app.get('/cats', (req,res) => {
    res.send('MEOW!!!')
});

app.get('/', (req,res) =>{
    res.send("This is homepage");
})

app.get('*',(req, res) => {
    res.send("Cannot find the path");
})

