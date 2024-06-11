const Product = require('../models/product');

// function to show all the products
module.exports.products = async function(req, res){
    try {
        const foundProducts = await Product.find({});
        res.send(foundProducts);
    } catch (err) {
        res.status(500).send(err);
    }
};

// function to create a new product
module.exports.create = async function(req, res) {
    console.log(req.query);
    try {
        const newProduct = new Product({
            name: req.query.name,
            quantity: req.query.quantity
        });
        await newProduct.save();
        res.send('New product added successfully.');
    } catch (err) {
        res.status(500).send(err);
    }
};


// function to delete a product using it's ID
module.exports.delete = async function(req, res) {
    try {
        await Product.deleteOne({ _id: req.params.productID });
        res.send({
            message: "Product deleted"
        });
    } catch (err) {
        res.status(500).send(err);
    }
};

// function to update a product's quantity
module.exports.updateQunatity = function(req, res){
    const ID = req.params.productID;
    // find the product using id
    try {
        // Find the product using id
        const foundProduct = Product.findById(ID);

        if (!foundProduct) {
            return res.status(404).send({ message: 'Product not found' });
        }

        // Note - To increment the quantity of the product put number as a positive value in the query 
        //        and to decrement the quantity put the number as negative value in the query
        const newQty = parseInt(foundProduct.quantity) + parseInt(req.query.number);

        // Update the product's quantity
        foundProduct.quantity = newQty;
        const updatedProduct = foundProduct.save();

        res.send({
            product: updatedProduct,
            message: 'Updated successfully'
        });
    } catch (err) {
        res.status(500).send(err);
    }
};