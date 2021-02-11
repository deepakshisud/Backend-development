const express = require('express');

const router = express.Router();


router.use((req, res, next) => {
    if(req.query.isAdmin) {
        next();
    }
    res.send("Not an admin");
})

router.get('/topsecret', (req, res) => {
    res.send("This is top secret");
})

router.get('/deleteeverything', (req, res) => {
    res.send("Ok deleted");
})

module.exports = router;