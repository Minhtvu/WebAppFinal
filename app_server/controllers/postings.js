var request = require('request');
var apiOptions = {
   server : "http://localhost:3000"
};
if (process.env.NODE_ENV === 'production') {
   apiOptions.server = "https://secret-falls-51461.herokuapp.com;
}

funct = require('../controllers/functions.js');

//Show error function
var _showError = function (req, res, status) {
  var title, content;
  if (status === 404){
    title = "404, page not found";
    content = "Oh dear. Looks like we can't find this page. Sorry.";
  } else {
    title = status + ", something's gone wrong";
    content = "Something, somewhere, has gone just a little bit wrong.";
  }
  res.status(status);
  res.render('layout', {
    title : title,
    content : content
  });
};

module.exports.about = function(req, res, next) {
	res.render('about');
};

/* GET user page */
module.exports.userById = function(req, res) {
      var requestOptions, path;
	path = '/api/users/' + req.params.userid;
	requestOptions = {
		url : apiOptions.server + path,
		method : "GET",
		json : {}
	};
	request(requestOptions, function (err, response, body) {
		if(response.statusCode == 200) {
			res.render('user-info', {
				user: body,
                                account: req.user
			});
		}
		else {
			_showError(req, res, reponse.statusCode);
		}
	});
};

/* GET account page */
module.exports.myAccount = function(req, res) {
    console.log("Minh");
    if (!req.user)
    {
       res.redirect('/signin');
    }
    var requestOptions, path;
	path = '/api/users/' + req.user._id;
	requestOptions = {
		url : apiOptions.server + path,
		method : "GET",
		json : {}
	};
	request(requestOptions, function (err, response, body) {
		if(response.statusCode == 200) {
			res.render('my-info', {
				user: body
			});
		}
		else {
			_showError(req, res, reponse.statusCode);
		}
	});
};


var renderHomepage = function(req, res, responseBody){
   var message;
   if (!(responseBody instanceof Array)) {
      message = "API lookup error";
      responseBody = [];
   } else {
      if (!responseBody.length) {
         message = "No users found";
      }
   }
   res.render('post-list', {
    title: 'All the postings',
    pageHeader: {
      title: 'Mines Bartering',
      strapline: 'Help Mines student trade services and items'
    },
    description: {
      info: 'Mines Bartering system allows students to trade services and items.'
    },
    users: responseBody,
    message: message,
    account: req.user
  });
};

/* GET posting list page */
module.exports.postingList = function(req, res) {
   var requestOptions, path;
   path = '/api/';
   requestOptions = {
      url : apiOptions.server + path,
      method : "GET",
      json : {},
      qs : {}
   };
   request(requestOptions, function(err, response, body) {
      renderHomepage(req, res, body);
      }
   );
};

/* GET postings by user page */
module.exports.postingById = function(req, res) {
    var requestOptions, path;
	path = '/api/users/' + req.params.userid + '/postings/' + req.params.postingid;
	requestOptions = {
		url : apiOptions.server + path,
		method : "GET",
		json : {}
	};
	request(requestOptions, function (err, response, body) {
		if(response.statusCode == 200) {
			res.render('post-info', {
				posting: body,
                                user: req.params.userid,
                                account: req.user
			});
		}
		else {
			_showError(req, res, reponse.statusCode);
		}
	});
};

/* POST comment */
module.exports.addComment = function(req, res) {
        if (!req.user){
           res.redirect('/signin');
        }
	var requestOptions, path, userid, postingid, postdata;
	userid = req.params.userid;
	postingid = req.params.postingid;
	path = '/api/users/' + userid + '/postings/' + postingid;
	postdata = {
		username: req.user.username,
		comment: req.body.comment
	};
	// Insert validation here if necessary
	requestOptions = {
		url : apiOptions.server + path,
		method : "POST",
		json : postdata
	};
	request(requestOptions, function(err, response, body) {
		if (response.statusCode === 201) {
			res.redirect('/user/' + userid + '/postings/' + postingid);
		}
		else {
			_showError(req, res, response.statusCode);
		}
	});
}
var renderPostingForm = function (req, res) {
   res.render('post-create-form', {
    title: 'Add posting',
    pageHeader: {
      title: 'Add posting for ' + req.user
    },
    field: {
      title: 'Title',
      description: 'Description',
      deadline: 'Deadline',
      userOffering: 'userOffering',
    },
    button: {
      title: 'Create'
    },
    error: req.query.err
  });
};


/* GET Add Posting */
module.exports.createPost = function(req, res) {
    renderPostingForm(req, res);
}

/* POST Add Posting */
module.exports.doCreatepost = function(req, res){
   var requestOptions, path, userid, postdata;
   userid = req.params.userid;
   path = "/api/users/" + userid + '/new';
   postdata = {
          title: req.body.title,
	  description: req.body.description,
	  deadline: req.body.deadline,
	  userOffering: req.body.userOffering
   };
   console.log(postdata);
   // Insert authenitication here
   requestOptions = {
     url : apiOptions.server + path,
     method : "POST",
     json : postdata
   };
   request(requestOptions, function(err, response, body) {
     if (response.statusCode === 201) {
        res.redirect('/myaccount');
      } else {
        _showError(req, res, response.statusCode);
      }
   });
};

module.exports.deletePost = function(req, res) {
   console.log
   var requestOptions, path, userid, postingid;
   userid = req.params.userid;
   postingid = req.params.postingid;
   path = "/api/users/" + userid + "/postings/" + postingid;
   requestOptions = {
      url : apiOptions.server + path,
      method: "DELETE",
      json: {}
   };
   request(
      requestOptions,
      function(err, response, body) {
         res.redirect('/myaccount');
      }
   );
};
   
