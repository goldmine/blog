var mongoose = require('mongoose');

var schema = mongoose.Schema({
  name : { type: String, lowercase: true, trim: true },
  createdAt: { type: Date, default: Date.now()},
});


module.exports = mongoose.model('Club',schema);
