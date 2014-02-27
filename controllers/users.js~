var mongoose = require('mongoose');
var User = mongoose.model('User');
var crypto = require('crypto');
var hash = require('../helpers').hash;
var cleanString = require('../helpers').cleanString;
var captcha = require('node-captcha');


exports.new = function(req,res) {
  var option = {
    fileMode : 1, 
    saveDir: "E:/blog/public/temp", //Todo: must put it here,need fix it in settings
    size: 5 
  };
  captcha(option,function(text,data) {
    console.log(text);
    req.session.capText = text.toLowerCase();
    return res.render('signup.jade',{ capData: data });
  });
};

exports.create = function(req,res,next) {

  var username = cleanString(req.body.username);
  var email = cleanString(req.body.email);
  var password = cleanString(req.body.password);
  var passwordConfirm = cleanString(req.body.confirm);
  var cap = cleanString(req.body.captcha);

  if (!username || !email || !password || !passwordConfirm || !cap) {
    req.flash('error', "用户名，邮箱，密码，验证码，不能为空");
    console.log(req.body.confirm + '/' + passwordConfirm);
    return res.redirect('/signup'); 
  };

  if (password != passwordConfirm) {
    req.flash('error', "密码输入不一样");
    return res.redirect('/signup'); 
  };

  if (cap.toLowerCase() != req.session.capText) {
    req.flash('error', "验证码错误！");
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
