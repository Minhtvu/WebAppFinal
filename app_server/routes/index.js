var express = require('express');
var router = express.Router();
var ctrlPostings = require('../controllers/postings');

/* GET postings pages. */
router.get('/', ctrlPostings.postList);
router.get('/postings/', ctrlPostings.postInfo);
router.get('/postings/new', ctrlPostings.addPost);

module.exports = router;
