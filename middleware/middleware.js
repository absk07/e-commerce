const User = require('../models/user');

module.exports = {

    isLoggedIn: async (req, res, next) => {
        if(req.isAuthenticated()){
            return next();
        }
        req.flash('error', 'You need to LogIn first!');
        res.redirect('/users/login');
    },
    isAdmin: async (req, res, next) => {
        if(req.isAuthenticated()) {    
            if(req.user.admin === 1) {
                return next();
            }
        }
        req.flash('error', 'Please LogIn as Admin!');
        res.redirect('/');
    }  
}