var mongoose = require( 'mongoose' );
var MONGOLAB_URI = 'mongodb://minhtvu:Kutelove1@ds249299.mlab.com:49299/webappfinal';
var dbURI ='mongodb://localhost/MinesBartering';
if (process.env.NODE_ENV === 'production') {
   dbURI=MONGOLAB_URI;
}
mongoose.connect(dbURI);

mongoose.connection.on('connected', function () {
   console.log('Mongoose connected to ' + dbURI);
});
mongoose.connection.on('error', function (err) {
   console.log('Mongoose connected error: ' + err);
});
mongoose.connection.on('disconnected', function () {
   console.log('Mongoose disconnected');
});

gracefulShutdown = function (msg,callback) {
   mongoose.connection.close(function () {
      console.log('Mongoose disconnected through ' + msg);
      callback();
   });
};

//For nodemon restart
process.once('SIGUSR2', function () {
   gracefulShutdown('nodemon restart', function () {
      process.kill(process.pid, 'SIGUSR2');
   });
});

//For app termination
process.once('SIGINT', function () {
   gracefulShutdown('app termination', function () {
      process.exit(0);
   });
});

//For Heroku app termination
process.once('SIGTERM', function () {
   gracefulShutdown('Heroku app shutdown', function () {
      process.exit(0);
   });
});

require('./users');

