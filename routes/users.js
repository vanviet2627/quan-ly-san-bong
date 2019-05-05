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
  new User(info.email).findOneUserByEmail()
    .then(rs => {
      // User is not exist
      if(rs === null) { res.json({"exist": false, err}) }

      // Check passwd
      // Assume that password has been encrypted =))
      if(info.password === rs.password) {
        res.json({"acp": 1, email: rs.email});
      } else {
        res.json({"acp": 0, "mess": "Tài khoản hoặc mật khẩu không đúng."});
      }
    }).catch(err => {
      res.json({"acp": 0, "mess": "Tài khoản hoặc mật khẩu không đúng."});
    })
})

router.post('/signup', (req, res) => {
  let info = {
    email: req.body.email,
    password: req.body.password
  }
  new User(info.email).addUser()
    .then(rs => {
      // User is not exist
      if(rs === null) { res.json({exist: false, err}); return; }
        res.send("Tạo tài khoản thành công!");
    }).catch(err => {
      res.json({"acp": 0, "mess": "Tạo tài khoản không thành công!"});
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

router.get('/profile', (req, res) => {
  res.render('profile', {
    isLogin: true,
    userType: "member"
  });
});

router.get('/account', (req, res) => {
  res.render('account', {
    isLogin: true,
    userType: "member"
  });
});
  
router.get('/account', (req, res) => {
  res.render('account', {
    isLogin: true,
    info: {},
    data : {}
                        });
});

router.get('/signout', (req, res) => {
  // Handle signout
  res.redirect('/');
})

module.exports = router;

