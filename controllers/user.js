const User = require('../models/user');

module.exports.renderRegister = (req, res) => {
    res.render('register');
}

module.exports.register = async (req, res, next) => {
    try {
        const { email, username, password, name } = req.body;
        const user = new User({ email, username, name, admin: 0 });
        const registeredUser = await User.register(user, password);
        req.login(registeredUser, err => {
            if (err) return next(err);
            req.flash('success', `Welcome ${registeredUser.username}`);
            res.redirect('/');
        })
    } catch (e) {
        req.flash('error', e.message);
        res.redirect('/users/register');
    }
}

module.exports.renderLogin = (req, res) => {
    res.render('login');
}

module.exports.login = (req, res) => {
    req.flash('success', 'welcome back!');
    res.redirect('/');
}

module.exports.logout = (req, res) => {
    req.logout();
    // req.session.destroy();
    req.flash('success', 'Successfully Logged Out');
    res.redirect('/');
}