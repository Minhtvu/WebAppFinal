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

/* GET postings pages. */
router.get('/', ctrlPostings.postList);
router.get('/postings/', ctrlPostings.postInfo);
router.get('/postings/new', ctrlPostings.addPost);

module.exports = router;
