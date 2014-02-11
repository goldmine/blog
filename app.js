var mongoose = require('mongoose');
var express = require('express');
var routes = require('./routes');
var middleWare = require('./middleWare');

mongoose.connect('mongodb://localhost/blog', function(err) {

  if (err) { throw err };
  var app = express();

  middleWare(app);
  routes(app);

  app.listen(3000, function() {
    console.log('server started at port 3000');
  });

});
