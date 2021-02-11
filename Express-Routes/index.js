const express = require('express');
const app = express();
const shelterRouters = require('./routes/shelters');
const adminRouters = require('./routes/admin');


app.use('/admin', adminRouters);
app.use('/shelters', shelterRouters);



app.listen(3000, () => {
    console.log('Listening on port 3000');
})

