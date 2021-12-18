const express = require('express');
const router = express.Router();
const catchAsyncError = require('../utils/catchAsync');
const { getProducts, addProductsForm, addProducts, editProductForm, editProduct, deleteProduct } = require('../controllers/admin_products');
const { isAdmin } = require('../middleware/middleware');

const multer = require('multer');
const { storage } = require('../cloudinary');
const upload = multer({ storage });

router.get('/admin/products', isAdmin, catchAsyncError(getProducts));

router.get('/admin/products/add-product', isAdmin, catchAsyncError(addProductsForm));

router.post('/admin/products/add-product', upload.array('images', 5), isAdmin, catchAsyncError(addProducts));

router.get('/admin/products/edit-product/:id', isAdmin, catchAsyncError(editProductForm));

router.put('/admin/products/edit-product/:id', upload.array('images', 5), isAdmin, catchAsyncError(editProduct));

router.delete('/admin/products/delete-product/:id', isAdmin, catchAsyncError(deleteProduct));

module.exports = router;