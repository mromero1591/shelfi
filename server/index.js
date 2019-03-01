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

//ENDPOINTS
app.get('/api/products', prodcutController.getAll);
app.get('/api/products/:id', prodcutController.getOne);
app.post('/api/products', prodcutController.create);
app.delete('/api/products/:id', prodcutController.delete);
app.put('/api/products/:id', prodcutController.update);

const PORT = process.env.PORT;

app.listen(PORT, () => console.log(`Listening at port: ${PORT}`));