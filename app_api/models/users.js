var mongoose = require( 'mongoose' );
var commentSchema = new mongoose.Schema({
  username: {type: String, required: true},
  comment: {type: String, required: true}
});

var postingSchema = new mongoose.Schema({
  title: {type: String, required: true},
  description: {type: String, required: true},
  deadline: {type: String},
  userOffering: {type: String},
  comments: [commentSchema],
});

var userSchema = new mongoose.Schema({
  username: {type: String, required: true},
  password: {type: String, required: true},
  postings: [postingSchema]
});
mongoose.model('User', userSchema, 'users');
mongoose.model('Posting', postingSchema, 'postings');
mongoose.model('Comment', commentSchema, 'comments');
