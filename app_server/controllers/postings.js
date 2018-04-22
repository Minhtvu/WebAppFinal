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
	);
};

/* GET posting list page */
module.exports.postingList = function(req, res) {
    res.render('post-info', {
        title: 'Post title',
        pageHeader: {
            title: 'Page Header'
        },
        post: {
            name: 'Web Applications',
            date: 'March 7, 2018',
            id: 'CSCI-446',
            status: 'Looking for Help',
            user: 'crader',

            comments: [{
                name: 'Unit 8',
                date: 'March 7, 2018',
                description: 'Course/Assignment Organizer Application'
            }]
        }
    });
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
	);
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