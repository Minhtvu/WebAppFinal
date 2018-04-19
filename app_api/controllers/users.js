var mongoose = require ('mongoose').set('debug', true);
var User = mongoose.model('User');


// Response function
var sendJsonResponse = function (res, status, content) {
   res.status(status);
   res.json(content);
};

module.exports.userById = function (req, res) {
  if (req.params && req.params.userid) {
    User
      .findById(req.params.userid)
      .exec(function(err, user) {
        if (!user) {
          sendJsonResponse(res, 404, {
            "message": "courseid not found"
          });
          return;
        } else if (err) {
          sendJsonResponse(res, 404, err);
          return;
        }
        sendJsonResponse(res, 200, user);
      });
  } else {
    sendJsonResponse(res, 404, {
      "message": "No userid in request"
    });
  }
};
