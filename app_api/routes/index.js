var express = require('express');
var router = express.Router();
var ctrlUsers = require('../controllers/users');
var ctrlPostings = require('../controllers/postings');

// Users
router.get('/users/:userid', ctrlUsers.userById);


// Postings
router.get('/', ctrlPostings.postingList);
router.get('/postings/:postingid', ctrlPostings.postingById);
router.post('/postings/:postingid', ctrlPostings.addComment);
router.post('/users/:userid/new', ctrlPostings.createPost);

/*
router.get('/postings/:courseid/assignments', ctrlAssignments.assignmentsList);
router.put('/courses/:courseid/assignments/:assignmentid', ctrlAssignments.assignmentsUpdateOne);
router.delete('/courses/:courseid/assignments/:assignmentid', ctrlAssignments.assignmentsDeleteOne);
*/

module.exports = router;
	