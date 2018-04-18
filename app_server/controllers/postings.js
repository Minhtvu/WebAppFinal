/* GET 'home' page */
module.exports.postList = function(req, res) {
    res.render('post-list', {
        title: 'My Courses',
        pageHeader: {
            title: 'Home Page',
            strapline: 'All Available Posts'
        },
        sidebar: "CSCI-446: WEB APPLICATIONS - UNIT 13",

        postings: [{
            name: 'Web Applications',
            user: 'crader',
            id: '446'
        }, {
            name: 'Principles',
            user: 'jrosenthal',
            id: '001'
        }]
    });
};

/* GET 'Course info' page */
module.exports.postInfo = function(req, res) {
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

/* GET 'Add Assignment' page */
module.exports.addPost = function(req, res) {
    res.render('post-create-form', {
        title: 'Add Post',
        pageHeader: {
            title: 'Add Post'
        }
    });
};
