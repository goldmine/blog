var crypto = require('crypto');

exports.cleanString = function(str) {
  if ('string' != typeof str) {
    str = ''; 
  }
  return str.trim();
}

exports.hash = function(password, salt) {
  var hash = crypto.createHash('sha512');
  hash.update(password,'utf8');
  hash.update(salt,'utf8');
  return hash.digest('base64');
}

