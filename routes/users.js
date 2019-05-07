var express = require('express');
var router = express.Router();
const User = require('../models/user.model');

// ==========================================
//                   User
// ==========================================

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
        // res.render('user', {
        //   isLogin: true,
        //   userInfo: {
        //     userType: user.userType,
        //     email: user.email
        //   },
        //   info: {}
        // });
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

// Get User Page
router.get('/', (req, res) => {
  res.render('user', {
    isLogin: true,
    userType: "member",
    info: {}
  });
});

// router.post('/signup', (req, res) => {
//   let info = {
//     email: req.body.email,
//     password: req.body.password
//   }
//   let newUser = new User(info).addUser();
//   newUser.then(rs => {
//     res.json({"success": true});
//   }).catch(err => {
//     res.json({"sucess": false, "err": err});
//   })
// });

router.get('/profile', (req, res) => {
  res.render('profile', {
    isLogin: true,
    userType: "member"
  });
});

router.get('/changepassword', (req, res) => {
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
    return res.json({acp: 0, mess: "Mật khẩu mới không khớp nhau!"});
  }
  res.json({acp: 1});
});

router.get('/signout', (req, res) => {
  // Handle signout
  res.redirect('/');
})

module.exports = router;

