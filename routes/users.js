var express = require('express');
var router = express.Router();
const User = require('../models/user.model');
const Schedule = require('../models/schedule.model');

// login, logout & signup. Return as authenticate API
router.post('/login', (req, res) => {
  let info = {
    email: req.body.email,
    password: req.body.password
  }
  if(!info.email || !info.password) {
    return res.json({acp: 0, mess: "Chưa nhập đầy đủ thông tin!"});
  }
  new User(info.email).findOneUserByEmail()
    .then(user => {
      // User is not exist
      if(user === null) { 
        return res.json({acp: 0, mess: "Tài khoản chưa đăng ký!"})
      }
      // Check passwd
      if(info.password === user.password) {
        res.json({acp: 1, user});
      } else {
        return res.json({acp: 0, "mess": "Tài khoản hoặc mật khẩu không đúng."});
      }
    }).catch(err => {
      res.json({acp: 0, "mess": "Tài khoản hoặc mật khẩu không đúng."});
    })
})

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

// user page menu
router.get('/', (req, res) => {
  res.render('user', {
    isLogin: true,
    userType: "member",
    info: {}
  });
});

router.get('/profile', async (req, res) => {
  let t = await User.UserModel.find()
  let data = t[1]
  
  res.render('userschedule', {
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
});

router.post('/changepassword', (req, res) => {
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

router.get('/history', async (req, res) => {
  let t = await User.UserModel.find()
  // random 1 id user 
  console.log(t);
  
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