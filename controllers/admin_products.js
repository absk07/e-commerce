const { cloudinary } = require("../cloudinary"); 
const Product = require('../models/products');
const Category = require('../models/categories');

module.exports = {

    //GET all products
    async getProducts(req, res) {
        const products = await Product.find({});
        if(!products) {
            req.flash('error', 'Opps! Something went wrong');
            return res.redirect('back');
        }
        // console.log(products);
        res.render('admin/products', { products });
    },
    
    //GET add-products form
    async addProductsForm(req, res) {
        const categories = await Category.find({});
        res.render('admin/add_product', { categories });
    },
    
    //POST add-products
    async addProducts(req, res) {
        req.body.slug = req.body.title.replace(/\s+/g, '-').toLowerCase();
        // console.log(req.body.slug);
        const pro = await Product.findOne({slug: req.body.slug});
        if (pro) {
            req.flash('error', 'Product title already exists, Please choose another one!');
            res.redirect('back');
        }
        const newProduct = new Product(req.body);
        newProduct.images = req.files.map(f => ({ url: f.path, filename: f.filename }));
        await newProduct.save();
        // console.log(newProduct);
        req.flash('success', 'Product added Successfully !');
        res.redirect('/admin/products');
    },
    
    
    //GET edit product form
    async editProductForm(req, res) {
        const category = await Category.find({});
        if(!category) {
            req.flash('error', 'Something went wrong !');
            return res.redirect('back');
        }
        const product = await Product.findById(req.params.id);
        if(!product) {
            req.flash('error', 'Something went wrong !');
            return res.redirect('back');
        }
        res.render('admin/edit-product', { category, product });
    },
    
    //PUT edit product
    async editProduct(req, res) {
        const { id } = req.params;
        const product = await Product.findById(id);
        if (!product) {
            req.flash('error', 'Something went wrong!');
            return res.redirect('back');
        }
        //update products with new properties
        const imgs = req.files.map(f => ({ url: f.path, filename: f.filename }));
        product.images.push(...imgs);
        product.title = req.body.title;
        product.slug = req.body.title.replace(/\s+/g, '-').toLowerCase();
        product.price = req.body.price;
        product.description = req.body.description;
        product.category = req.body.category;
        await product.save();
        if (req.body.deleteImages) {
            for (let filename of req.body.deleteImages) {
                await cloudinary.uploader.destroy(filename);
            }
            await product.updateOne({ $pull: { images: { filename: { $in: req.body.deleteImages } } } });
        }
        req.flash('success', 'Successfully updated product!');
        res.redirect('/admin/products');
    },
    
    //DELETE delete-product 
    async deleteProduct(req, res) {
        const { id } = req.params;
        const product = await Product.findByIdAndDelete(id);
        if (!product) {
            req.flash('error', 'Something went wrong!');
            return res.redirect('back');
        }
        req.flash('success', 'Product deleted successfully!');
        res.redirect('/admin/products');
    }

};
