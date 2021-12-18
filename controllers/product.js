const Product = require('../models/products');
const Category = require('../models/categories');

module.exports = {
    async getProducts(req, res) {
        const categorySlug = req.params.category;
        const category = await Category.findOne({ slug: categorySlug });
        if(category) {
            const product = await Product.find({ category: categorySlug });
            if(!product) {
                // console.log(err);
                req.flash('error', 'Cannot find product, something went wrong!');
                return res.redirect('/');
            }
            return res.render('cat_products', { product });
        }
        req.flash('error', 'Cannot find category, something went wrong!');
        res.redirect('/');
    }, 
    
    /**GET product's details */
    async productDetails(req, res) {
        const product = await Product.findOne({ slug: req.params.product });
        if(!product) {
            req.flash('error', 'Cannot find product, something went wrong!');
            return res.redirect('back');
        }
        res.render('product', { product });
    }
};