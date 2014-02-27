var pageHandle = require('../controllers/pages');
var sessionHandle = require('../controllers/sessions');
var userHandle = require('../controllers/users');
var clubHandle = require('../controllers/clubs');


module.exports = function(app) {

  app.get('/', pageHandle.index); 

  app.get('/login', sessionHandle.new); 
  app.post('/login', sessionHandle.create); 
  app.get('/logout', sessionHandle.delete); 

  app.get('/signup', userHandle.new); 
  app.post('/signup', userHandle.create); 

  app.get('/club', clubHandle.index);
//  app.get('/club/:id', clubHandle.show);
  app.get('/club/new', clubHandle.new);
  app.post('/club', clubHandle.create);
//  app.put('/club/:id', clubHandle.edit);
//  app.del('/club/:id', clubHandle.delete);

}
