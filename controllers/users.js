var mongoose = require('mongoose');
var User = mongoose.model('User');
var crypto = require('crypto');
var hash = require('../helpers').hash;
var cleanString = require('../helpers').cleanString;


exports.new = function(req,res) {
  res.render('signup.jade');
};

exports.create = function(req,res,next) {

  var username = cleanString(req.body.username);
  var email = cleanString(req.body.email);
  var password = cleanString(req.body.password);
  var passwordConfirm = cleanString(req.body.confirm);

  if (!username || !email || !password || !passwordConfirm) {
    req.flash('error', "用户名，邮箱，或密码不能为空");
    console.log(req.body.confirm + '/' + passwordConfirm);
    return res.redirect('/signup'); 
  };

  if (password != passwordConfirm) {
    req.flash('error', "密码输入不一样");
    return res.redirect('/signup'); 
  };
  
  User.findOne({email: email},function(err, user) {
    if (err) { return next(err) };
    if (user) {
      req.flash('error', "用户已经存在");
      return res.redirect('/signup'); 
    }
    crypto.randomBytes(16, function(err, bytes) {
      if (err) { return next(err) };

      var user = {
        email: email,
        username: username,
      }; 
      user.salt = bytes.toString('utf8');
      user.hash = hash(password, user.salt);
      user.createdAt = Date.now();

      User.create(user, function(err, newUser) {
        if (err) {
          if (err instanceof mongoose.Error.ValidationError) {
            req.flash('error', "邮箱地址不正确");
            return res.redirect('/signup'); 
          }
          return next(err);
        } 
        
        req.session.isLoggedIn = true; 
        req.session.user = newUser;
        console.log('create user: ' + user);

        req.flash('message', "注册成功");
        return res.redirect('/'); 
      
      });
    });
  });

  
};
