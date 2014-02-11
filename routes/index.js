
module.exports = function(app) {
  app.get('/', function(req,res) {
    req.flash('message', 'this is from flash');
    res.render('index.jade');
  });
};
