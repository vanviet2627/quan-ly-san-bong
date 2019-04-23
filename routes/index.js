var express = require('express');
var router = express.Router();
const Pitch = require('../models/pitches.Model').PitchModel
const Schedule = require('../models/schedule.Model')
const User = require('../models/user.Model');

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
  newSchedule.add_schedule()
    .then(rs => {
      console.log({"RS": rs});
      res.render('payment', {isLogin: true, data: rs});
    }).catch(err => {
      console.log({"ERRR": err});
      res.render('error', {message: "ERROR 404", error: {status: err}});
    })
})

router.post('/payment/ewallet', (req, res) => {
  let typeOfEWallet = req.body.exampleRadios;
  // Get link API E-Wallet
  res.render('qr', {isLogin: true, typeEwallet: typeOfEWallet});
});

// ==========================================
//                   User
// ==========================================

router.post('/login',async (req, res) => {
  let info = {
    email: req.body.email,
    password: req.body.password
  }
  let dataSanBong = await Pitch.find({})
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
.get('/login', async (req, res) => {
    res.redirect('/')    
})

// api đặt sân 
router.get('/s/', async(req, res)=>{
  let dataSanBong = await Pitch.find({})
  res.render('index', {
    isLogin: true,
    info: {},
    data: dataSanBong
  })
})

// 
router.get('/user',async (req, res) => {
  let dataSanBong = await Pitch.find({})
  res.render('User', {
    isLogin: true,
    info: {},
    data : dataSanBong
  });
});

router.get('/admin', (req, res) => {
  res.render('admin');
});

router.post('/signup', (req, res) => {
  let info = {
    email: req.body.email,
    password: req.body.password
  }
  let newUser = new User(info);
  let rs = newUser.addUser();
  rs.then(() => {
    res.json({"success": true});
  }).catch(err => {
    res.json({"sucess": false, "err": err});
  })
});

router.get('/alluser', (req, res) => {
  let user = new User();
  user.getAllUser()
    .then(users => {
      res.json(users);
    }).catch(err => {
      res.json(err)
    })
});

router.get('/searchfield', (req, res) => {
  res.render('schedule', {
    isLogin: false
  });
});

router.get('/Admin', (req, res) => {
  res.render('Admin', {
    isLogin: true
  });
});

router.get('/profile', (req, res) => {
  res.render('profile', {
    isLogin: true
  });
});

router.get('/account', (req, res) => {
  res.render('account', {
    isLogin: true
  });
});



module.exports = router;