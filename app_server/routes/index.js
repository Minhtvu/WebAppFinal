var express = require('express'),
    exphbs  = require('express-handlebars'),
    passport = require('passport'),
    LocalStrategy = require('passport-local');
    var router = express.Router();
    config = require('../controllers/config.js'),
    funct = require('../controllers/functions.js');
    ctrlPostings = require('../controllers/postings');

//var router = express();
var router = express.Router();
//===============PASSPORT=================

// Passport session setup.
passport.serializeUser(function(user, done) {
  console.log("serializing " + user.username);
  done(null, user);
});

passport.deserializeUser(function(obj, done) {
  console.log("deserializing " + obj);
  done(null, obj);
});

// Use the LocalStrategy within Passport to login users.
passport.use('local-signin', new LocalStrategy(
  {passReqToCallback : true}, //allows us to pass back the request to the callback
  function(req, username, password, done) {
    funct.localAuth(username, password)
    .then(function (user) {
      if (user) {
        console.log("LOGGED IN AS: " + user.username);
        req.session.success = 'You are successfully logged in ' + user.username + '!';
        done(null, user);
      }
      if (!user) {
        console.log("COULD NOT LOG IN");
        req.session.error = 'Could not log user in. Please try again.'; //inform user could not log them in
        done(null, user);
      }
    })
    .fail(function (err){
      console.log(err.body);
    });
  }
));

// Use the LocalStrategy within Passport to Register/"signup" users.
passport.use('local-signup', new LocalStrategy(
  {passReqToCallback : true}, //allows us to pass back the request to the callback
  function(req, username, password, done) {
    funct.localReg(username, password)
    .then(function (user) {
      if (user) {
        console.log("REGISTERED: " + user.username);
        req.session.success = 'You are successfully registered and logged in ' + user.username + '!';
        done(null, user);
      }
      if (!user) {
        console.log("COULD NOT REGISTER");
        req.session.error = 'That username is already in use, please try a different one.'; //inform user could not log them in
        done(null, user);
      }
    })
    .fail(function (err){
      console.log(err.body);
    });
  }
));

// Simple route middleware to ensure user is authenticated.
function ensureAuthenticated(req, res, next) {
  if (req.isAuthenticated()) { return next(); }
  req.session.error = 'Please sign in!';
  res.redirect('/signin');
}


//===============EXPRESS=================

// Configure Express
var logger = require('morgan');
router.use(logger());
var cookieParser = require('cookie-parser');
router.use(cookieParser(config.cookieSecret))
var bodyParser = require('body-parser');
router.use(bodyParser());
var methodOverride = require('method-override');
router.use(methodOverride());
var session = require('express-session');
router.use(session({secret:'secretKey'}));
router.use(passport.initialize());
router.use(passport.session());

// Session-persisted message middleware
router.use(function(req, res, next){
  var err = req.session.error,
      msg = req.session.notice,
      success = req.session.success;

  delete req.session.error;
  delete req.session.success;
  delete req.session.notice;

  if (err) res.locals.error = err;
  if (msg) res.locals.notice = msg;
  if (success) res.locals.success = success;

  next();
});
// Configure express to use handlebars templates
var hbs = exphbs.create({
    defaultLayout: 'main',
});
// router.engine('handlebars', hbs.engine);
// router.set('view engine', 'handlebars');


//===============ROUTES=================
//displays our signup page
router.get('/signin', function(req, res){
  if (req.user)
  {
     res.redirect('/myaccount');
  }
  res.render('signin');
});

//sends the request through our local signup strategy, and if successful takes user to homepage, otherwise returns then to signin page
router.post('/local-reg', passport.authenticate('local-signup', {
  successRedirect: '/',
  failureRedirect: '/signin'
  })
);

//sends the request through our local login/signin strategy, and if successful takes user to homepage, otherwise returns then to signin page
router.post('/login', passport.authenticate('local-signin', {
  successRedirect: '/',
  failureRedirect: '/signin'
  })
);

//logs user out of site, deleting them from the session, and returns to homepage
router.get('/logout', function(req, res){
  if(!req.user)
  {
     res.redirect('/');
  }
  var name = req.user.username;
  console.log("LOGGIN OUT " + req.user.username)
  req.logout();
  res.redirect('/');
  req.session.notice = "You have successfully been logged out " + name + "!";
});


// Postings
router.get('/user/:userid', ctrlPostings.userById);
router.get('/myaccount', ctrlPostings.myAccount);
router.get('/', ctrlPostings.postingList);
router.get('/about', ctrlPostings.about);
router.get('/user/:userid/postings/:postingid', ctrlPostings.postingById);
router.post('/user/:userid/postings/:postingid', ctrlPostings.addComment);
router.post('/user/:userid/new', ctrlPostings.doCreatepost);
router.get('/user/:userid/new', ctrlPostings.createPost);

module.exports = router;
