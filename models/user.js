var mongoose = require('mongoose');
var validEmail = require('../helpers/validate/email');

var schema = mongoose.Schema({
  email : { type: String, lowercase: true, trim: true, validate: validEmail},
  username: { type: String, lowercase: true, trim: true},//Todo: validate username
  salt: { type: String, required: true },
  hash: { type: String, required: true },
  createdAt: { type: Date, default: Date.now()},
  lastLoginAt: { type: Date } 
});


module.exports = mongoose.model('User',schema);
