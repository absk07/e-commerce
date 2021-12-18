const express = require('express');
const router = express.Router();
const catchAsyncError = require('../utils/catchAsync');
const { getProducts, productDetails } = require('../controllers/product');

/**GET products by category */
router.get('/products/:category', catchAsyncError(getProducts)); 

/**GET product's details */
router.get('/products/:category/:product', catchAsyncError(productDetails));


module.exports = router;