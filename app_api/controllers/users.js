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
      "message": "No courseid in request"
    });
  }
};
