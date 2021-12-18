const express = require('express');
const router = express.Router();
const catchAsyncError = require('../utils/catchAsync');
const { home, getPage } = require('../controllers/pages');

router.get('/', catchAsyncError(home)); 

router.get('/:slug', catchAsyncError(getPage));

module.exports = router;