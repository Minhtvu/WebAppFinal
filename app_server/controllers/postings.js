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
    res.render('course-info', {
        title: 'CSCI-446',
        pageHeader: {
            title: 'Web Applications'
        },
        course: {
            name: 'Web Applications',
            courseid: 'CSCI-446',
            time: 'Online Course - No Scheduled Lecture',
            teachers: ['Cyndi Rader', 'Ahmed Alshrehri'],

            assignments: [{
                name: 'Unit 8',
                st: 'Finished',
				points: 10,
                date: 'March 7, 2018',
                description: 'Course/Assignment Organizer Application'
            }, {
                name: 'Unit 9',
                st: 'In Progress',
				points: 10,
                date: 'March 14, 2018',
                description: 'Database Amendment (MongoDB)'
            }]
        }
    });
};

/* GET 'Add Assignment' page */
module.exports.addPost = function(req, res) {
    res.render('course-assignment-form', {
        title: 'Add Assignment',
        pageHeader: {
            title: 'Add Assignment'
        }
    });
};
