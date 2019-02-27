const express = require('express');
const bodyParser = require('body-parser');
const massive = require('massive'); 
const cors = require('cors');

require('dotenv').config();
const prodcutController = require('./controller');

const app = express();
app.use(bodyParser.json());
app.use(cors());

//set up database
massive(process.env.CONNECTION)
.then( dbInstance => {
    app.set('db', dbInstance);
})

app.post('/api/products', prodcutController.create);


const PORT = process.env.PORT;

app.listen(PORT, () => console.log(`Listening at port: ${PORT}`));