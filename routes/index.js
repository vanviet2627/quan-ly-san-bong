var express = require('express');
var router = express.Router();
const Pitch = require('../models/pitches.model');
const PitchModel = require('../models/pitches.model').PitchModel;
const Schedule = require('../models/schedule.model');
const User = require('../models/user.model');
const Admin = require('../models/admin.model');

/* Get Home Page. */
router.get('/', (req, res, next) => {
  res.render('index', {
    isLogin: false,
    info: {},
    data : null
  });
});

// ==========================================
//                   PAYMENT
// ==========================================

// QR API link
router.get('/payment/ewallet/:type', (req, res) => {
  let type = req.params.type;
  let eWallet = type == "momo" ? "link momo payment" : "link zalopay payment";
  let data = {
    paymentLink: `<img src='http://chart.apis.google.com/chart?cht=qr&chl=${eWallet}&chs=300' alt='qr' />`
  }
  res.status(200).json({data: data});
});

router.post('/payment', async(req, res, next) => {
  let info = req.body;
  let bill = {
    sanbong: info.loaisan,
    renter: "user@gmail.com",
    ngayThue: info.ngay,
    dattu: info.gio,
    thoiluongThue: info.thoiluong,
  }
  var newSchedule = new Schedule(bill)
  newSchedule.addSchedule()
    .then(rs => {
      console.log({"RS": rs});
      res.render('payment', {
        isLogin: true,
        userType: "admin",
        data: rs});
    }).catch(err => {
      console.log({"ERRR": err});
      res.render('error', {message: "ERROR 404", error: {status: err}});
    })
})

router.post('/payment/ewallet', (req, res) => {
  let typeOfEWallet = req.body.exampleRadios;
  // Get link API E-Wallet
  res.render('qr', {
    isLogin: true,
    userType: "admin",
    typeEwallet: typeOfEWallet});
});

// ==========================================
//                   User
// ==========================================

router.post('/login',async (req, res) => {
  let info = {
    email: req.body.email,
    password: req.body.password
  }
  new User(info).findOneUser()
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

// Get User Page
router.get('/user',async (req, res) => {
  let dataSanBong = await PitchModel.find({})
  res.render('User', {
    isLogin: true,
    userType: "member",
    info: {},
    data : dataSanBong
  });
});

router.post('/signup', (req, res) => {
  let info = {
    email: req.body.email,
    password: req.body.password
  }
  let newUser = new User(info).addUser();
  newUser.then(rs => {
    console.log(rs);
    res.json({"success": true});
  }).catch(err => {
    res.json({"sucess": false, "err": err});
  })
});

router.get('/profile', (req, res) => {
  res.render('profile', {
    isLogin: true,
  });
});

router.get('/account', (req, res) => {
  res.render('account', {
    isLogin: true,
  });
});

// ==========================================
//                   Admin
// ==========================================

router.get('/alluser', (req, res) => {
  let user = new User();
  user.getAllUser()
    .then(users => {
      res.json(users);
    }).catch(err => {
      res.json(err)
    })
});

router.get('/admin', (req, res) => {
  let data = new Admin().getAllUser();
  data.then(users => {
    res.render('admin', {
      isLogin: true,
      userType: "admin",
      users: users
    });
  }).catch(err => {
    res.send(err)
    // res.render('admin', {
    //   isLogin: true,
    //   userType: "admin",
    //   users: null,
    //   err: err
    // });
  })
});

router.post('/pitch', (req, res) => {
  let data = {
    pitchName: req.body.pitchName,
    pitchSize: req.body.pitchSize,
    status: req.body.status,
    renter: req.body.render
  }
  let newPitch = new Pitch(data).addPitch();
  newPitch.then(rs => {
      res.status(200).json({success: true, rs: rs})
    }).catch(err => {
      res.status(500).json({err: err})
    })
})


module.exports = router;