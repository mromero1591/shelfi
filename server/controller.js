module.exports = {
    create: function( req, res, next) {
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

    getAll: function(req, res, next) {
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