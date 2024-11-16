const express = require('express');
const productModel = require('./ProductModal');
const cartModel = require('./CartModel');
const authMiddleware = require('./Authmiddleware');
const cartRouter = express.Router();

cartRouter.post('/add', authMiddleware, async (req, res) => {
    const { productId, quantity } = req.body;
    const userId = req.userId; // `userId` is now available from `authMiddleware`
  
    try {
        const product = await productModel.findById(productId);
  
        if (!product) {
            return res.status(404).json({ msg: 'Product not found' });
        }
  
        // Find the user's cart
        let cart = await cartModel.findOne({ userId });
  
        if (!cart) {
            cart = new cartModel({ userId, items: [] });
        }
  
        const productIndex = cart.items.findIndex(item => item.productId.toString() === productId);
  
        if (productIndex > -1) {
            cart.items[productIndex].quantity += quantity;
        } else {
            cart.items.push({ productId, quantity });
        }
  
        // Save the updated cart
        await cart.save();
        res.status(200).json({ msg: 'Product added to cart', cart });
  
    } catch (error) {
        console.error("Error adding to cart:", error);
        res.status(500).json({ msg: 'Failed to add product to cart', error: error.message });
    }
});
  
cartRouter.get('/getcart', authMiddleware, async (req, res) => {
    const userId = req.userId;
    try {
        const cart = await cartModel.findOne({ userId }).populate('items.productId');
  
        if (!cart) {
            return res.status(404).json({ msg: 'Cart not found' });
        }
  
        res.status(200).json({ cart });
    } catch (error) {
        console.error("Error fetching cart:", error);
        res.status(500).json({ msg: 'Failed to fetch cart', error: error.message });
    }
});



cartRouter.delete('/delete/:productId', authMiddleware, async (req, res) => {
  const { productId } = req.params;
  const userId = req.userId;

  try {
    const cart = await cartModel.findOne({ userId });

    if (!cart) {
      return res.status(404).json({ msg: 'Cart not found' });
    }

    cart.items = cart.items.filter(item => item.productId.toString() !== productId);
    await cart.save();

    res.status(200).json({ msg: 'Product removed from cart', cart });
  } catch (error) {
    console.error("Error deleting product from cart:", error);
    res.status(500).json({ msg: 'Failed to delete product', error: error.message });
  }
});





cartRouter.delete('/clear', authMiddleware, async (req, res) => {
  const userId = req.userId;

  try {
    const cart = await cartModel.findOne({ userId });

    if (!cart) {
      return res.status(404).json({ msg: 'Cart not found' });
    }

    cart.items = [];
    await cart.save();

    res.status(200).json({ msg: 'Cart cleared successfully' });
  } catch (error) {
    console.error("Error clearing cart:", error);
    res.status(500).json({ msg: 'Failed to clear cart', error: error.message });
  }
});





module.exports = cartRouter;
