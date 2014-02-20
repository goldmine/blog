
var mongoose = require('mongoose');
var User = mongoose.model('User');
var Token = mongoose.model('Token');
var crypto = require('crypto');
var hash = require('../helpers').hash;
var cleanString = require('../helpers').cleanString;


exports.new = function(req,res) {
  res.render('login.jade');
};

exports.destroy = function(req,res,next) {
  Token.findOneAndRemove({email: req.session.user.email}, function(err) {
    if (err) { next(err) };
    res.clearCookie('loginToken');
  });
  req.session.user = null;
  req.flash('message', "成功登出");
  res.redirect('/');
};

exports.create = function(req,res,next) {

  var email = cleanString(req.body.email);
  var password = cleanString(req.body.password);
  
  if (!email || !password) {
    req.flash('error', "邮箱或密码不能为空！");
    return res.redirect('/login');
  };

  email = email.toLowerCase();

  User.findOne({email: email},  function(err, u) {
    if (err) { return next(err) };

    if (!u) {
      req.flash('error', "用户不存在！");
      return res.redirect('/login');
    };

    if (hash(password,u.salt) !== u.hash) {
      req.flash('error', "密码不正确！");
      return res.redirect('/login');
    };

    u.lastLoginAt = Date.now()

    u.save(function(err, result) {
      if (err) { return next(err) };
      if ('on' == req.body.rememberMe) {
        Token.findOne({email: email}, function(err,findToken) {
          if (findToken) {
            findToken.token = Token.randomToken();
            findToken.save(function(err) {
              if (err) { return next(err) };
              res.cookie('loginToken', findToken, { maxAge: 900000});
            });
          
          } else {
              var newToken = new Token;
              newToken.token = Token.randomToken();
              newToken.series = Token.randomToken();
              newToken.email = email; 
              newToken.save(function(err,token) {
                if (err) { return next(err) };
                res.cookie('loginToken', token, { maxAge: 900000});
              })
          }
        });

      };
      req.session.user = result;
      req.session.isLoggedIn = true; 
      req.flash('message', "登录成功");
      return res.redirect('/');
    });
  });
};
