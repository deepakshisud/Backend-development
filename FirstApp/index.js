const express = require("express");
const app = express()

// app.use((req, res) => {
//     console.log("WE GOT A NEW REQUESST");
//     res.send({ color: 'red'})
// })
app.listen(3000, () => {
    console.log("LISTENING ON PORT 3000");
})

app.get('/cats', (req,res) => {
    res.send('MEOW!!!')
});

app.get('/', (req,res) =>{
    res.send("This is homepage");
})

