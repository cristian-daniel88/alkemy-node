require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');

const apiRouter = require('./routes/api');



const app = express();

require('./db');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true}));

// app.get('/', (req, res) => {
//     res.send('holaaa')
// });


app.use('/api', apiRouter);


app.listen(3000, (req, res) => {
    console.log('servidor arrancando!!');
    
});


