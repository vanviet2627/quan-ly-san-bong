module.exports = {
  // Direct to user page if authenticated, used in login, signup and home router
  forwardAuthenticated: (req, res, next) => {
    if(!req.isAuthenticated()) {
      return next();
    }
    res.redirect('/user');
  },
  // Direct to login page if user try to access to the pages that required login
  ensureAuthenticated: (req, res, next) => {
    if(req.isAuthenticated()) {
      return next();
    }
    res.redirect('/');
  }
}