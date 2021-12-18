const Page = require('../models/page');
const Product = require('../models/products');

module.exports = {

    //GET home/index page
    async home(req, res) {
        const page = await Page.findOne({slug: 'home'});
        const product = await Product.find({});
        res.render('index', { page, product });
    },

    //GET a page
    async getPage(req, res) {
        const { slug } = req.params;
        const page = await Page.findOne({slug: slug});
        if(!page) {
            req.flash('error', `Cannot find page, something went wrong!`);
            return res.redirect('/');
        }
        res.render('other_pages', { page });
    }

};