var mongoose = require('mongoose');
var Club = mongoose.model('Club');
var cleanString = require('../helpers').cleanString;

exports.index = function(req,res,next) {
  Club.find(function(err,clubs) {
    if (err) { next(err) };
    res.render('indexClub.jade', { title: '俱乐部',clubs: clubs });
  });
};

exports.new = function(req,res) {
  res.render('newClub.jade', { title: '创建一个俱乐部'});
};

exports.create = function(req,res,next) {

  if (!req.body.name) {
    req.flash('error', '名称不能为空'); 
    return res.redirect('/club/new');
  };
  
  Club.findOne({name: req.body.name}, function(err,club) {
    if (err) { next(err) };

    if (club) {
      req.flash('error', '俱乐部已经存在!'); 
      return res.redirect('/club/new');
    }

    Club.create({name: req.body.name}, function(err, result) {
      if (err) { next(err) };
      req.flash('message', '俱乐部创建成功!');  
      return res.redirect('/club');
    });
    
  });
};
