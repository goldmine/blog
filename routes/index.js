var pageHandle = require('../controllers/pages');
var sessionHandle = require('../controllers/sessions');
var userHandle = require('../controllers/users');


module.exports = function(app) {

  app.get('/', pageHandle.index); 

  app.get('/login', sessionHandle.new); 

  app.get('/signup', userHandle.new); 

};
