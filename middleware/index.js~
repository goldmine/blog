var express = require('express');
var mongoStore = require('connect-mongo');
var MongoStore = require('connect-mongo')(express);
var flash = require('connect-flash');
var path = require('path');

module.exports = function(app) {

  app.use(express.logger('dev'));
  app.use(express.static(path.resolve('public')));
  app.use(require('stylus').middleware(path.resolve('public'))); 
  
  app.use(express.cookieParser());
  app.use(express.session({
    secret: "my secret", 
    store: new MongoStore({
      db: 'blog',
    })
  }))
  app.use(express.json());
  app.use(express.urlencoded());
  app.use(flash());
  app.use(function(req,res,next) {
    res.locals.session = req.session;
    res.locals.message = req.flash('message');
    res.locals.error = req.flash('error');
    next();
  });

  app.use(app.router);//error handle should execute after express router
 
 //error handle 
  app.use(function(req,res) {
    res.status(404); 
    res.render('404.jade');
  });

  app.use(function(err,req,res) {
    console.error('err at %s\n', req.url, err.stack);
    res.send(500,'发生错误');
  });

};
