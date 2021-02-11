const express = require('express');
const app = express();
const shelterRouters = require('./routes/shelters');

app.listen(3000, () => {
    console.log('Listening on port 3000');
})

