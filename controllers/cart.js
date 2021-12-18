const Product = require('../models/products');

module.exports = {
    //GET add products to cart
    async cart(req, res) {
        var slug = req.params.product;
        const product = await Product.findOne({
            slug: slug
        });
        if (!product) {
            req.flash('error', 'Cannot add product, something went wrong!');
            return res.redirect('/');
        }
        if (typeof (req.session.cart) == 'undefined') {
            req.session.cart = [];
            req.session.cart.push({
                title: slug,
                qty: 1,
                price: product.price,
                image: product.images
            });
        } else {
            var cart = req.session.cart;
            var newItem = true;
            for (let i = 0; i < cart.length; i++) {
                if (cart[i].title == slug) {
                    cart[i].qty++;
                    newItem = false;
                    break;
                }
            }
            if (newItem) {
                cart.push({
                    title: slug,
                    qty: 1,
                    price: product.price,
                    image: product.images
                });
            }
        }
        // console.log(req.session.cart);
        req.flash('success', 'Product added to cart successfully!');
        res.redirect('back');
    },


    //GET checkout page
    async checkout(req, res) {
        if(req.session.cart && req.session.cart.length == 0) {
            delete req.session.cart;
            return res.redirect('/cart/checkout'); 
        }
        res.render('./checkout', { title: 'Checkout', cart: req.session.cart });
    },


    //GET update product 
    async updateCart(req, res) {
        const slug = req.params.product;
        const cart =  req.session.cart;
        const action = req.query.action;
        for(let i = 0; i < cart.length; i++) {
            if(cart[i].title == slug) {
                switch(action) {
                    case 'add': cart[i].qty++;
                                break;
                    case 'remove': cart[i].qty--;
                                if(cart[i].qty < 1) {
                                    cart.splice(i, 1);
                                }  
                                break;  
                    case 'clear': cart.splice(i, 1);
                                if(cart.length == 0) {
                                    delete req.session.cart;
                                }  
                                break;  
                    default: req.flash('error', 'Problem updating cart!');
                            break;                         
                }
                break;
            }
        }
        req.flash('success', 'Cart updated successfully!');
        res.redirect('back');
    },


    //GET clear cart
    async clearCart(req, res) {
        await delete req.session.cart;
        req.flash('success', 'Cart Cleared!');
        res.redirect('/cart/checkout'); 
    },


    //GET buy now
    async purchase(req, res) {
        await delete req.session.cart;
        res.sendStatus(200); 
    }
};
