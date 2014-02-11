module.exports = function(app) {
  app.use(function(req,res,next) {
    res.status(404); 
    res.render('404.jade');
  });

  app.use(function(err,req,res,next) {
    console.error('err at %s\n', req.url, err.stack);
    res.send(500,'发生错误');
  });
};