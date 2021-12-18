const Page = require('../models/page');

module.exports = {

    //GET all admin paes
    async getPages(req, res) {
        const pages = await Page.find({});
        if(!pages) {
            req.flash('error', 'Opps! Something went wrong');
            return res.redirect('back');
        }
        req.app.locals.pages = pages;
        res.render('admin/pages', { pages });
    },
    
    //GET add-page form
    addPageForm (req, res) {
        res.render('admin/add_page');
    },
    
    //POST add-page form
    async addPage(req, res) {
        const title = req.body.title;
        let slug = req.body.slug.replace(/\s+/g, '-').toLowerCase();
        if(slug == "") {
            slug = title.replace(/\s+/g, '-').toLowerCase();
        }
        const content = req.body.content;
        const newPage = { title: title, slug: slug, content: content };
        const page = await Page.findOne({slug: slug});
        if(page) {
            req.flash('error', 'Slug already exists, Please choose another one!');
            res.redirect('back');
        } else {
            await Page.create(newPage);
            req.flash('success', 'Page added Successfully.');
            res.redirect('/admin/pages');
        }
    },
    
    //GET edit page form
    async editPageForm(req, res) {
        const page = await Page.findById(req.params.id);
        if(!page) {
            req.flash('error', 'Something went wrong !');
            return res.redirect('back');
        }
        res.render('admin/edit-page', { page });
    },
    
    //PUT edit page form
    async editPage(req, res) {
        const {id} = req.params;
        const title = req.body.title;
        let slug = req.body.slug.replace(/\s+/g, '-').toLowerCase();
        if (slug == "") {
            slug = title.replace(/\s+/g, '-').toLowerCase();
        }
        const content = req.body.content;
        const newPage = {
            title: title,
            slug: slug,
            content: content
        };
        const page = await Page.findOne({slug: slug, _id: {'$ne': id}});
        if (page) {
            req.flash('error', 'Slug already exists, Please choose another one!');
            res.redirect('back');
        } else {
            await Page.findByIdAndUpdate(id, newPage);
            req.flash('success', 'Page updated Successfully !');
            res.redirect('/admin/pages');
        }
    },
    
    //DELETE delete-page 
    async deletePage(req, res) {
        await Page.findByIdAndDelete(req.params.id);
        req.flash('success', 'Page deleted Successfully !');
        res.redirect('/admin/pages');
    }
    
};

