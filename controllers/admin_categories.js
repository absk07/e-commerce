const Category = require('../models/categories');

module.exports = {

    //GET all categories
    async getCategories(req, res) {
        const categories = await Category.find({});
        if(!categories) {
            req.flash('error', 'Opps! Something went wrong');
            return res.redirect('back');
        }
        req.app.locals.category = categories;
        res.render('admin/categories', { categories });
    },
    
    //GET add-categories form
    addCategoryForm(req, res) {
        res.render('admin/add_category');
    },
    
    //POST add-page form
    async addCategory(req, res) {
        const title = req.body.title;
        const slug = title.replace(/\s+/g, '-').toLowerCase();
        const newCategory = {
            title: title,
            slug: slug
        };
        const category = await Category.findOne({slug: slug});
        if (category) {
            req.flash('error', 'Category already exists, Please choose another one!');
            res.redirect('back');
        } else {
            await Category.create(newCategory);
            req.flash('success', 'Category added Successfully.');
            res.redirect('/admin/categories');
        }
    },
    
    
    //GET edit category form
    async editCategoryForm(req, res) {
        const category = await Category.findById(req.params.id);
        if(!category) {
            req.flash('error', 'Something went wrong !');
            return res.redirect('back');
        }
        res.render('./admin/edit-category', { category });
    },
    
    //PUT edit category form
    async editCategory(req, res) {
        const title = req.body.title;
        const slug = title.replace(/\s+/g, '-').toLowerCase();
        const newCat = { title: title, slug: slug };
        const cat = await Category.findOne({ slug: slug, _id: {'$ne': req.params.id} });
        if(cat) {
            req.flash('error', 'Catrgory already exists, Please choose another one!');
            res.redirect('back');
        } else {
            await Category.findByIdAndUpdate(req.params.id, newCat);
            req.flash('success', 'Category updated Successfully !');
            res.redirect('/admin/categories');
        }
    },
    
    //DELETE delete-category 
    async deleteCategory(req, res) {
        await Category.findByIdAndDelete(req.params.id);
        req.flash('success', 'Page deleted Successfully !');
        res.redirect('/admin/categories');
    }

};
