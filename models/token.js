var mongoose = require('mongoose');

var schema = mongoose.Schema({

  email: String,
  series: String,
  token: String
  
});

schema.statics.randomToken = function() {
  return Math.round(Date.now() * Math.random());
};

module.exports = mongoose.model('Token',schema);
