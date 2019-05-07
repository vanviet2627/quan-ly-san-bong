var express = require('express');
var router = express.Router();
const User = require('../models/user.model');
const { forwardAuthenticated, ensureAuthenticated } = require('../utils/auth');
const passport = require('passport');
const Schedule =require('../models/schedule.model');
// login, logout & signup. Return as authenticate API
router.post('/login', (req, res) => {
  passport.authenticate('local', {
    successRedirect: '/user',
    failureRedirect: '/',
    failureMessage: true
  });

  // let info = {
  //   email: req.body.email,
  //   password: req.body.password
  // }
  // new User(info.email).findOneUserByEmail()
  //   .then(rs => {
  //     // User is not exist
  //     if(rs === null) { res.json({"exist": false, err}) }

  //     // Check passwd
  //     // Assume that password has been encrypted =))
  //     if(info.password === rs.password) {
  //       res.json({"acp": 1, email: rs.email});
  //     } else {
  //       res.json({"acp": 0, "mess": "Tài khoản hoặc mật khẩu không đúng."});
  //     }
  //   }).catch(err => {
  //     res.json({"acp": 0, "mess": "Tài khoản hoặc mật khẩu không đúng."});
  //   })
})

router.post('/signup', (req, res) => {
  let info = {
    email: req.body.email,
    password: req.body.password
  }
  let newUser = new User(info).addUser();
  newUser.then(rs => {
    res.json({"success": true});
  }).catch(err => {
    res.json({"sucess": false, "err": err});
  })
});

// user page menu
router.get('/', ensureAuthenticated, (req, res) => {
  res.render('user', {
    isLogin: true,
    userType: "member",
    info: {}
  });
});

router.get('/profile', ensureAuthenticated,async (req, res) => {
  let t = await User.UserModel.find()
  let data = t[1]
  
  res.render('profile', {
    isLogin: true,
    userType: "member",
    data : data
  });
});

router.get('/changepassword', ensureAuthenticated, (req, res) => {
  res.render('changepassword', {
    isLogin: true,
    userType: "member",
    info: {},
    data : {}
  });

router.post('/changepassword', (req, res) => {
  let info = {
    password: req.body.password,
    newPassword: req.body.newPassword,
    reNewPassword: req.body.reNewPassword,
  }
  if(info.newPassword !== info.reNewPassword) {
    return res.json({acp: 0, mess: "Mật khẩu mới không khớp nhau!"});
  }
  res.json({acp: 1});

});
router.get('/history',ensureAuthenticated,async (req, res) => {
  let t = await User.UserModel.find()
  // random 1 id user 

  let idUser = t[1].id
  let myData =await Schedule.ScheduleModel.find({renter:idUser}).sort({createTime:-1}).populate('pitch').populate('renter')
  res.render('userschedule', {
    isLogin: true,
    userType: "member",
    info: {},
    data : myData,
  });
});
router.get('/logout', (req, res) => {
  req.logout();
  res.redirect('../');
});

module.exports = router;