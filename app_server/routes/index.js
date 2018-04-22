var express = require('express');
var exphbs = require('express-handlebars');
var methodOverride = require('method-override');
var session = require('express-session');
var passport = require('passport');
var LocalStrategy = require('passport-local');
var router = express.Router();
var ctrlPostings = require('../controllers/postings');
var config = require('../controllers/config');
var funct = require('../controllers/functions');

var app = express();
app.use(session({secret: 'supernova', savedUninitialized: true, resave:true}));
app.use(passport.initialize());
app.use(passport.session());

// Postings
router.get('/user/:userid', ctrlPostings.userById);
router.get('/', ctrlPostings.postingList);
router.get('/user/:userid/postings/:postingid', ctrlPostings.postingById);
router.post('/user/:userid/postings/:postingid', ctrlPostings.addComment);
router.post('/user/:userid/new', ctrlPostings.createPost);

module.exports = router;	