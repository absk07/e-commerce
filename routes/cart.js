const express = require('express');
const router = express.Router();
const catchAsyncError = require('../utils/catchAsync');
const { cart, checkout, updateCart, clearCart, purchase } = require('../controllers/cart');
const { isLoggedIn } = require('../middleware/middleware');


//GET add products to cart
router.get('/cart/add/:product',catchAsyncError(cart));


//GET checkout page
router.get('/cart/checkout', isLoggedIn, checkout);


//GET update product 
router.get('/cart/update/:product', isLoggedIn, updateCart);


//GET clear cart
router.get('/cart/clear', isLoggedIn, catchAsyncError(clearCart));


//GET buy now
router.get('/cart/buynow', isLoggedIn, catchAsyncError(purchase));


module.exports = router;