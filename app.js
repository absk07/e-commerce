require('dotenv').config();
const express = require('express');
const path = require('path');
const session = require('express-session');
const flash = require('connect-flash');
const ExpressError = require('./utils/ExpressError');
const mongoose = require('mongoose');
const passport = require('passport');
const localStrategy = require('passport-local');
const methodOverride = require('method-override');

const User = require('./models/user');
const Page = require('./models/page');
const Category = require('./models/categories');

//init app
const app = express();

//connect to database
const URI = process.env.DB_URL;

mongoose.connect(URI, {
  useNewUrlParser:true,
  useCreateIndex:true,
  useUnifiedTopology:true 
});

const db = mongoose.connection;
db.on('error',console.error.bind(console, 'connection error'));
db.once('open', () => {
  console.log('Database connected');
});

//view engine setup
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

//set public folder
app.use(express.static(path.join(__dirname, 'public')));
app.use(methodOverride('_method'));

// Set global errors variable
// app.locals.errors = null;


//body-parser middleware
app.use(express.urlencoded({ extended: true }));

//connect-flash config
app.use(flash());

const secret = process.env.SECRET || 'thisshouldbeabettersecret!';

//express-session config
app.use(session({
	secret,
	resave: false,
  saveUninitialized: false
}));

//passport config
app.use(passport.initialize());
app.use(passport.session());
passport.use(new localStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

//local variables
app.use(function (req, res, next) {
	res.locals.currentUser = req.user || null;
  res.locals.error = req.flash('error');
  res.locals.success = req.flash('success');
  next();
})

Page.find({}, (err, pages) => {
  if(err) {
    console.log(err);
    return res.send(err); 
  }
  app.locals.pages = pages;
});

Category.find({}, (err, category) => {
  if(err) {
    console.log(err);
    return res.send(err); 
  }
  app.locals.category = category;
});

app.get('*', (req, res, next) => {
  res.locals.cart = req.session.cart;
  next();
});

//Require Routes
const pages = require('./routes/pages.js');
const adminPages = require('./routes/admin_pages.js');
const adminCategories = require('./routes/admin_categories.js');
const adminProducts = require('./routes/admin_products.js');
const products = require('./routes/products.js');
const cart = require('./routes/cart.js');
const user = require('./routes/user.js')

//Mount Routes
app.use(pages);
app.use(adminPages);
app.use(adminCategories);
app.use(adminProducts);
app.use(products);
app.use(cart);
app.use(user);


app.all('*', (req, res, next) => {
  next(new ExpressError('Page Not Found', 404));
});

app.use((err, req, res, next) => {
  const { statusCode = 500 } = err;
  if (!err.message) err.message = 'Oh No, Something Went Wrong!'
  res.status(statusCode).send(err);
});

//Start server
const Port = process.env.PORT || 3000;
app.listen(Port, () => {
    console.log(`Listening on PORT ${Port}..........`);
});