var express = require('express');
var router = express.Router();
var ctrlPostings = require('../controllers/postings');

// Postings
router.get('/user/:userid', ctrlPostings.userById);
router.get('/', ctrlPostings.postingList);
router.get('/user/:userid/postings/:postingid', ctrlPostings.postingById);
router.post('/user/:userid/postings/:postingid', ctrlPostings.addComment);
router.post('/user/:userid/new', ctrlPostings.doCreatepost);
router.get('/user/:userid/new', ctrlPostings.createPost);

module.exports = router;	