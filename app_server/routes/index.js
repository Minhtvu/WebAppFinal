var express = require('express');
//var exphbs = require('express-handlebars');
//var methodOverride = require('method-override');
//var session = require('express-session');
var passport = require('passport');
var LocalStrategy = require('passport-local');
var router = express.Router();
var ctrlPostings = require('../controllers/postings');
var config = require('../controllers/config');
var funct = require('../controllers/functions');

var app = express();
//app.use(session({secret: 'supernova', savedUninitialized: true, resave:true}));
app.use(passport.initialize());
app.use(passport.session());


//============PASSPORT==================
 // Passport session setup.
 passport.serializeUser(function(user, done) {
   console.log("serializing " + user.username);
   done(null, user);
 });

 passport.deserializeUser(function(obj, done) {
   console.log("deserializing " + obj);
   done(null, obj);
 });

 // User the LocalStrategy within Passport to login/signin users.
 passport.use('local-signin', new LocalStrategy(
   {passReqToCallback : true}, // allows us to pass back the request to the callback
   function(req, username, password, done) {
     funct.localAuth(username, password).then(function (user) {
       if (user) {
         console.log("LOGGED IN AS: " + user.username);
         req.session.success = 'You are successfully logged in ' + user.username + '!';
         done(null, user);
       }
       if (!user) {
         console.log("COULD NOT LOG IN");
         req.session.error = 'Could not log user in. Please try again.';
         done(null, user);
       }
     })
     .fail(function (err) {
       console.log(err.body);
     });
   }
 ));
 // Use the LocalStrategy within Passport to register/"signup" users.
 passport.use('local-signup', new LocalStrategy(
   {passReqToCallback : true}, // allows us to pass back the request to the callback
   function(req, username, password, done) {
     funct.localReg(username, password).then(function (user) {
       if (user) {
         console.log("REGISTERED: " + user.username);
         req.session.success = 'You are successfully registered and logged in ' + user.username;
         done(null, user);
       }
       if (!user) {
         console.log("COULD NOT REGISTER");
         req.session.error = 'That username is already in use, please try a different one.';
         done(null, user);
       }
     })
     .fail(function (err) {
       console.log(err.body);
     });
   }
 ));

 // Signin Pages
 router.get('/signin', function(req, res){
   res.render('signin');
 });

 router.post('/local-reg', passport.authenticate('local-signup', {
   successRedirect: '/',
   failureRedirect: '/signin'
   })
 );

 router.post('/login', passport.authenticate('local-signin', {
   successRedirect: '/',
   failureRedirect: '/signin'
   })
 );

 router.get('/logout', function(req, res) {
   var name = req.user.username;
   console.log("LOGGING OUT " + req.user.username);
   req.logout();
   res.redirect('/');
   req.session.notice = "You have succesfully been logged out";
 });

// Postings
router.get('/user/:userid', ctrlPostings.userById);
router.get('/', ctrlPostings.postingList);
router.get('/user/:userid/postings/:postingid', ctrlPostings.postingById);
router.post('/user/:userid/postings/:postingid', ctrlPostings.addComment);
router.post('/user/:userid/new', ctrlPostings.createPost);

module.exports = router;
