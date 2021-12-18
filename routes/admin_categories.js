const express = require('express');
const router = express.Router();
const catchAsyncError = require('../utils/catchAsync');
const { getCategories, addCategoryForm, addCategory, editCategoryForm, editCategory, deleteCategory } = require('../controllers/admin_categories');
const { isAdmin } = require('../middleware/middleware');

//GET all categories
router.get('/admin/categories', isAdmin, catchAsyncError(getCategories));

//GET add-categories form
router.get('/admin/categories/add-category', isAdmin, addCategoryForm);

//POST add-page form
router.post('/admin/categories/add-category', isAdmin, catchAsyncError(addCategory));

//GET edit category form
router.get('/admin/categories/edit-category/:id', isAdmin, catchAsyncError(editCategoryForm));

//PUT edit category form
router.put('/admin/categories/edit-category/:id', isAdmin, catchAsyncError(editCategory));

//DELETE delete-category 
router.delete('/admin/categories/delete-category/:id', isAdmin, catchAsyncError(deleteCategory));


module.exports = router;