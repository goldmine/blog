module.exports = function(app) {
  app.use(function(req,res,next) {
    res.locals.session = req.session;
    res.locals.message = req.flash('message');
    res.locals.error = req.flash('error');
    next();
  }); 
};
