const express = require('express');
const router = express.Router();
const catchAsyncError = require('../utils/catchAsync');
const { getPages, addPageForm, addPage, editPageForm, editPage, deletePage } = require('../controllers/admin_pages');
const { isAdmin } = require('../middleware/middleware');

//GET all admin paes
router.get('/admin/pages', isAdmin, catchAsyncError(getPages));

//GET add-page form
router.get('/admin/pages/add-page', isAdmin, addPageForm);

//POST add-page form
router.post('/admin/pages/add-page', isAdmin, catchAsyncError(addPage));

//GET edit page form
router.get('/admin/pages/edit-page/:id', isAdmin, catchAsyncError(editPageForm));

//PUT edit page form
router.put('/admin/pages/edit-page/:id', isAdmin, catchAsyncError(editPage));

//DELETE delete-page 
router.delete('/admin/pages/delete-page/:id', isAdmin, catchAsyncError(deletePage));

module.exports = router;