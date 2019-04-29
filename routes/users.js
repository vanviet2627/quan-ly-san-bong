var express = require('express');
var router = express.Router();
const User = require('../models/user.model');
const Schedule = require('../models/schedule.model');
const passport = require('passport');
const { forwardAuthenticated, ensureAuthenticated } = require('../configs/auth');

router.post('/login', (req, res, next) => {
  let info = {
    email: req.body.email,
    password: req.body.password
  }
  if(!info.email || !info.password) {
    return res.json({acp: 0, mess: "Chưa nhập đầy đủ thông tin!"});
  }
  passport.authenticate('local', (err, user, info) => {
    if (err) {
      console.log(err);
      return json({mess: err});
    }
    if (!user) {
      return res.json({acp: 0, mess: info.message}); 
    }
    req.logIn(user, (err) => {
      if (err) { 
      console.log(err);
      return next(err);
      }
      return res.json({acp: 1, mess: "Đăng nhập thành công!"});
    });
  })(req, res, next);
});

router.post('/signup', (req, res) => {
  let info = {
    email: req.body.email,
    password: req.body.password,
    repassword: req.body.repassword
  }
  if(!info.email || !info.password || !info.repassword) {
    return res.json({acp: 0, mess: "Chưa nhập đầy đủ thông tin!"});
  }
  if(info.password !== info.repassword) {
    return res.json({acp: 0, mess: "Mật khẩu không trùng khớp!"});
  }
  new User(info).addUser()
    .then(newUser => {
      // User is not exist
      if(newUser === null) { 
        return res.json({exist: false, err});
      }
        res.json({"acp": 1, "mess": "Tạo tài khoản thành công!"});
    }).catch(err => {
      if(err.code === 11000)
        return res.json({"acp": 0, "mess": "Email đã tồn tại!"});
      res.json({"acp": 0, "mess": "Tạo tài khoản không thành công!", err: err});
    })
})

// User page menu
router.get('/', ensureAuthenticated, (req, res) => {
  console.log({USERPAGE: req.user});
  res.render('user', {
    isLogin: true,
    userType: req.user.userType,
    info: {}
  });
});

router.get('/profile', ensureAuthenticated, async (req, res) => {
  let t = await User.UserModel.find()
  let data = t[1]
  
  res.render('userschedule', {
    isLogin: true,
    userType: req.user.userType,
    data : data
  });
});

router.get('/changepassword', ensureAuthenticated, (req, res) => {
  res.render('changepassword', {
    isLogin: true,
    userType: req.user.userType,
    info: {},
    data : {}
  });
});

router.post('/changepassword', ensureAuthenticated, (req, res) => {
  let info = {
    password: req.body.password,
    newPassword: req.body.newPassword,
    reNewPassword: req.body.reNewPassword,
  }
  if(info.newPassword !== info.reNewPassword) {
    return res.json({acp: 0, mess: "Mật khẩu mới không trùng khớp!"});
  }
  res.json({acp: 1});

});

router.get('/history', ensureAuthenticated, async (req, res) => {
  new Schedule( req.user._id ).getScheduleById().then(userSchedules => {
    console.log({SCHEDULE: userSchedules});
    
    res.render('userschedule', {
      isLogin: true,
      userType: req.user.userType,
      info: {},
      data : userSchedules,
    });
  })
});

router.get('/logout', (req, res) => {
  req.logout();
  res.redirect('/');
});

module.exports = router;