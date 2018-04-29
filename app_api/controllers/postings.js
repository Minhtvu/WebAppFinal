var mongoose = require ('mongoose').set('debug', true);
var User = mongoose.model('User');
var posting = mongoose.model('Posting');

// Response function
var sendJsonResponse = function (res, status, content) {
   res.status(status);
   res.json(content);
};

module.exports.postingList = function (req, res) {
  User
    .find()
    .exec(function(err, users) {
      if (!users) {
        sendJsonResponse(res, 404, {
          "message": "no users"
        });
        return;
      } else if (err) {
        sendJsonResponse(res, 404, err);
        return;
      }
      sendJsonResponse(res, 200, users);
    });
};

module.exports.postingById = function (req, res) {
  if (!req.params.userid || !req.params.postingid) {
    sendJsonResponse(res, 404, {
      "message": "Not found, courseid and assignmentid are both required"
    });
    return;
  }
  User
    .findById(req.params.userid)
    .select('postings')
    .exec(
      function(err, user) {
        if (!user) {
          sendJsonResponse(res, 404, {
            "message": "courseid not found"
          });
          return;
        } else if (err) {
          sendJsonResponse(res, 400, err);
          return;
        }
        if (user.postings && user.postings.length > 0) {
          if (!user.postings.id(req.params.postingid)) {
            sendJsonResponse(res, 404, {
              "message": "assignmentid not found"
            });
          } else {
              if (err) {
                sendJsonResponse(res, 404, err);
              } else {
                sendJsonResponse(res, 200, user.postings.id(req.params.postingid));
              }
          }
        } else {
          sendJsonResponse(res, 404, {
            "message": "No review to delete"
          });
        }
      }
    );
};

var doAddComment = function(req, res, posting, user) {
  if (!posting) {
    sendJsonResponse(res, 404, {
      "message": "Posting not found"
    });
  } else {
    posting.comments.push({
      username: req.body.username,
	  comment: req.body.comment
    });
    posting.save(function(err, posting) {
      var thisComment;
      if (err) {
        sendJsonResponse(res, 400, err);
      } else {
        user.save(function(err,user){});
        thisComment = posting.comments[posting.comments.length - 1];
        sendJsonResponse(res, 201, posting);
      }
    });
  }
};

module.exports.addComment = function (req, res) {
	if (!req.params.userid || !req.params.postingid) {
    sendJsonResponse(res, 404, {
      "message": "Not found, courseid and assignmentid are both required"
    });
    return;
  }
  User
    .findById(req.params.userid)
    .select('postings')
    .exec(
      function(err, user) {
        if (!user) {
          sendJsonResponse(res, 404, {
            "message": "courseid not found"
          });
          return;
        } else if (err) {
          sendJsonResponse(res, 400, err);
          return;
        }
        if (user.postings && user.postings.length > 0) {
          if (!user.postings.id(req.params.postingid)) {
            sendJsonResponse(res, 404, {
              "message": "assignmentid not found"
            });
          } else {
              if (err) {
                sendJsonResponse(res, 404, err);
              } else {
                doAddComment(req, res, user.postings.id(req.params.postingid), user);
              }
          }
        } else {
          sendJsonResponse(res, 404, {
            "message": "No review to delete"
          });
        }
      }
    );
};

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
        console.log(err);
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

module.exports.deletePost = function(req, res, next) {
  if (!req.params.userid || !req.params.postingid) {
    sendJsonResponse(res, 404, {
      "message": "Not found, userid and postingid are both required"
    });
    return;
  }
  User
    .findById(req.params.userid)
    .select('postings')
    .exec(
      function(err, user) {
        if (!user) {
          sendJsonResponse(res, 404, {
            "message": "userid not found"
          });
          return;
        } else if (err) {
          sendJsonResponse(res, 400, err);
          return;
        }
        if (user.postings && user.postings.length > 0) {
          if (!user.postings.id(req.params.postingid)) {
            sendJsonResponse(res, 404, {
              "message": "postingid not found"
            });
          } else {
            user.postings.id(req.params.postingid).remove();
            user.save(function(err) {
              if (err) {
                sendJsonResponse(res, 404, err);
              } else {
                sendJsonResponse(res, 204, null);
              }
            });
          }
        } else {
          sendJsonResponse(res, 404, {
            "message": "No post to delete"
          });
        }
      }
    );
};
