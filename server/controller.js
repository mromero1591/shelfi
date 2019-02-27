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
    }
}