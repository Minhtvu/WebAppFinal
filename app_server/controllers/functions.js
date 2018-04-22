var bcrypt = require('bcryptjs');
var Q = require('q');
var config = require('../controllers/config');

// MongoDB connection information
var mongodbUrl = 'mongodb://' + config.mongodbHost;
var MongoClient = require('mongodb').MongoClient

// Used in local-signup strategy
module.exports.localReg = function(username, password) {
  var deferred = Q.defer();

  MongoClient.connect(mongodbUrl, function(err, db) {
    var collection = db.collection('users');

    // Check if username is already assigned in database
    collection.findOne({'username' : username})
      .then(function (result) {
        if (null != result) {
          console.log("USERNAME ALREADY EXISTS", result.username);
          deferred.resolve(false); // username exists
        } else {
          var hash = bcrypt.hashSync(password, 8);
          var user = {
            "username": username,
            "password": hash
          }

          console.log("CREATING USER:", username);

          collection.insert(user).then(function() {
            db.close();
            deferred.resolve(user);
          });
        }
      });
  });

  return deferred.promise;
};

// check is user exists
// if user exists check if passwords match (use bcrypt.compareSync(password, hash);
// true where 'hash' is password in DB)
// if password matches, take into website
// if user doesn't exist or password doesn't match, tell them it failed
module.exports.localAuth = function(username, password) {
  var deferred = Q.defer();

  MongoClient = connect(mongodbUrl, function(err, db) {
    var collection = db.collection('users');

    collection.findOne({'username' : username}).then(function(result) {
      if (null == result) {
        console.log("USERNAME NOT FOUND:", username);

        deferred.resolve(false);
      } else {
        var hash = result.password;

        console.log("FOUND USER: " + result.username);

        if (bcrypt.compareSync(password, hash)) {
          deferred.resolve(result);
        } else {
          console.log("AUTHENTICATION FAILED");
          deferred.resolve(false);
        }
      }

      db.close();
    });
  });

  return deferred.promise;
};
