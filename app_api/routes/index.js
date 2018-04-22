var express = require('express');
var router = express.Router();
var ctrlUsers = require('../controllers/users');
var ctrlPostings = require('../controllers/postings');

// Users
router.get('/users/:userid', ctrlUsers.userById);

// Postings
router.get('/', ctrlPostings.postingList);
router.get('/users/:userid/postings/:postingid', ctrlPostings.postingById);
router.post('/users/:userid/postings/:postingid', ctrlPostings.addComment);
router.post('/users/:userid/new', ctrlPostings.createPost);

module.exports = router;	