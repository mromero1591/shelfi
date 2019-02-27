const express = require('express');
const bodyParser = require('body-parser');
const massive = require('massive'); 
require('dotenv').config();

const app = express();
app.use(bodyParser.json());

//set up database
massive(process.env.CONNECTION)
.then( dbInstance => {
    app.set('db', dbInstance);
})


const PORT = process.env.PORT;

app.listen(PORT, () => console.log(`Listening at port: ${PORT}`));