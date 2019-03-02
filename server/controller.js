module.exports = {

    //Purpose: adds an item to the database
    //Params: req, data containting the request from the front end.
    //        res, data being sent back to the frontend.
    //Return: status, returns a status of what occured.
    //Outcome: database is upadated to include new product.
    create: function( req, res) {
        //get the database.
        const dbInstance = req.app.get('db');
        //grab the product info
        const {name, price, img} = req.body;
        
        //add the product to the database.
        dbInstance.create_product([name, price, img])
        .then( () => {
            res.sendStatus(200);
        }).catch( err => {
            console.log('error at create:', err);
            res.status(500).send({errorMessage: 'could not create product'});
        });
    },

    //Purpose: gets all the products from the database
    //Params: req, data containting the request from the front end.
    //        res, data being sent back to the frontend.
    //Return: array, contains the products from the database.
    //Outcome: none.
    getAll: function(req, res) {
        const dbInstance = req.app.get('db');

        //get all the itmes from the database.
        dbInstance.get_products()
        .then( products => {
            res.status(200).send(products);
        }).catch( err => {
            console.log('error at create:', err);
            res.status(500).send({errorMessage: 'could not create product'});
        });
    },

    //Purpose: gets a products from the database
    //Params: req, data containting the request from the front end.
    //        res, data being sent back to the frontend.
    //Return: array, contains the product from the database.
    //Outcome: none.
    getOne: function(req,res,next) {
        const dbInstance = req.app.get('db');
        const {id} = req.params;

        dbInstance.get_product(id)
        .then( product => {
            res.status(200).send(product);
        }).catch( err => {
            console.log(err);
            res.sendStatus(500);
        })
    },

    //Purpose: remove a product from the database
    //Params: req, data containting the request from the front end.
    //        res, data being sent back to the frontend.
    //Return: status, the status of what occured.
    //Outcome: item has been removed from the database.
    delete: function(req, res, next) {
        const dbInstance = req.app.get('db');
        const {id} = req.params;

        dbInstance.delete_product(id)
        .then( () => {
            res.sendStatus(200);
        } ).catch( err => {
            console.log('error at create:', err);
            res.status(500).send({message: 'error in deleting product'});
        })
    },

    //Purpose: Updates a product from the database
    //Params: req, data containting the request from the front end.
    //        res, data being sent back to the frontend.
    //Return: status, the status of what occured.
    //Outcome: item has been updated in the database.
    update: function(req,res,next) {
        const dbInstance = req.app.get('db');
        const {id} = req.params;
        const {name, price, img} = req.body;
        console.log(id);
        dbInstance.update_product([id,name,price,img])
        .then( () => {
            res.sendStatus(200);
        }).catch( err => {
            console.log('error at create:', err);
            res.sendStatus(500);
        })

    }
}