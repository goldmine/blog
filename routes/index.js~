var pageHandle = require('../controllers/pages');
var sessionHandle = require('../controllers/sessions');
var userHandle = require('../controllers/users');


module.exports = function(app) {

  app.get('/', pageHandle.index); 

  app.get('/login', sessionHandle.new); 
  app.post('/login', sessionHandle.create); 
  app.get('/logout', sessionHandle.destroy); 

  app.get('/signup', userHandle.new); 
  app.post('/signup', userHandle.create); 

}
