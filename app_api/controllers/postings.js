var mongoose = require ('mongoose');
var User = mongoose.model('User');
var Posting = mongoose.model('Posting');

// Response function
var sendJsonResponse = function (res, status, content) {
   res.status(status);
   res.json(content);
};

module.exports.postingList = function (req, res) {};

module.exports.postingById = function (req, res) {};

module.exports.addComment = function (req, res) {};

var doCreatePost = function(req, res, user) {
  if (!user) {
    sendJsonResponse(res, 404, {
      "message": "userid not found"
    });
  } else {
    user.postings.push({
      title: req.body.title,
      description: req.body.description,
      deadline: req.body.deadline,
      userOffering: req.body.userOffering
    });
    user.save(function(err, user) {
      var thisPosting;
      if (err) {
        sendJsonResponse(res, 400, err);
      } else {
        thisPosting = user.postings[user.postings.length - 1];
        sendJsonResponse(res, 201, thisPosting);
      }
    });
  }
};

module.exports.createPost = function (req, res) {
	var userid = req.params.userid;
	if (userid) {
    User
    .findById(userid)
    .select('postings')
    .exec(
      function(err, user) {
        if (err) {
          sendJsonResponse(res, 400, err);
        } else {
          doCreatePost(req, res, user);
        }
      }
    );
  } else {
    sendJsonResponse(res, 404, {
      "message": "Not found, userid required"
    });
  }
};