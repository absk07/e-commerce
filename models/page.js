const mongoose = require('mongoose');

const pageSchema = mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    slug: {
        type: String
    },
    content: {
        type: String
    }
});

const Page = mongoose.model('Page', pageSchema);

module.exports = Page;