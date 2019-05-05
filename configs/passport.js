var LocalStrategy = require('passport-local').Strategy;
var User = require('../models/user.model').UserModel;

module.exports = passport => {

  passport.use(new LocalStrategy({
      usernameField: 'email',
    },
    (email, password, done) => {
      User.findOne({ email: email }, (err, user) => {
        console.log("Alo");
        
        if (err) { return done(err); }
        if (!user) {
          return done(null, false, { message: 'Incorrect email.' });
        }
        if (!user.validPassword(password)) {
          return done(null, false, { message: 'Incorrect password.' });
        }
        return done(null, user);
      });
    }
  ));

  passport.serializeUser((user, done) => {
    done(null, user.id);
  });
  
  passport.deserializeUser((id, done) => {
    User.findById(id, (err, user) => {
      done(err, user);
    });
  });
}