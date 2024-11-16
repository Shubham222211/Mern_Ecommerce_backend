const express = require('express');
const productModel = require('./ProductModal');
// const productModel = require('./productModel')
const productRouter = express.Router();

// Route to add a new product
productRouter.post('/create', async (req, res) => {
    try {
        // Creating a new product with data from the request body
        const newProduct = await productModel.create(req.body);
        res.status(200).json({ msg: 'Product added successfully', product: newProduct });
    } catch (error) {
        console.error("Error adding product:", error);
        res.status(500).json({ msg: 'Failed to add product', error: error.message });
    }
});





productRouter.get('/allProduct', async (req, res) => {
    try {
        // Fetch all products from the database
        const products = await productModel.find();
        res.status(200).json({ products });
    } catch (error) {
        console.error("Error fetching products:", error);
        res.status(500).json({ msg: 'Failed to fetch products', error: error.message });
    }
});

module.exports = productRouter;
