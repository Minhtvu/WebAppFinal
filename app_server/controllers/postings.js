var request = require('request');
var apiOptions = {
   server : "http://localhost:3000"
};
if (process.env.NODE_ENV === 'production') {
   apiOptions.server = "https://glacial-river-41313.herokuapp.com";
}

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
    message:message
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
				posting: body
			});
		}
		else {
			_showError(req, res, reponse.statusCode);
		}
	});
};

/* POST comment */
module.exports.addComment = function(req, res) {
	res.render('post-create-form', {
        title: 'Add Post',
        pageHeader: {
            title: 'Add Post'
        }
    });
}

/* POST posting */
module.exports.createPost = function(req, res) {
	res.render('post-create-form', {
        title: 'Add Post',
        pageHeader: {
            title: 'Add Post'
        }
    });	
}