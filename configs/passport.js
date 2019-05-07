var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var User = require('../models/user.model').UserModel;

passport.use(new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password'
  },
  (email, password, done) => {
    User.findOne({ email: email }, (err, user) => {
      console.log("Alo");
      
      if (err) { return done(err); }
      if (!user) {
        return done(null, false, { message: 'Email không tồn tại!' });
      }
      if (!user.validPassword(password)) {
        return done(null, false, { message: 'Mật khẩu không đúng!' });
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