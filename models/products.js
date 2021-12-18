const mongoose = require('mongoose');

const productSchema = mongoose.Schema({
    title: {
        type: String
    },
    slug: {
        type: String
    },
    description: {
        type: String
    },
    category: {
        type: String
    },
    price: {
        type: Number
    },
    images: [{
        url: String, 
        filename: String
    }],
});

const Product = mongoose.model('Product', productSchema);

module.exports = Product;