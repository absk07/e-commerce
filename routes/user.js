const express = require('express');
const router = express.Router();
const passport = require('passport');
const catchAsync = require('../utils/catchAsync');
const users = require('../controllers/user');

router.route('/users/register')
    .get(users.renderRegister)
    .post(catchAsync(users.register));

router.route('/users/login')
    .get(users.renderLogin)
    .post(passport.authenticate('local', { failureFlash: true, failureRedirect: '/users/login' }), users.login);

router.get('/users/logout', users.logout);

module.exports = router;  