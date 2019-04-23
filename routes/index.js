var express = require('express');
var router = express.Router();
// const SanBong = require('../models/pitches.Model').Sanbong
const Pitch = require('../models/pitch.model');
const Schedule = require('../models/schedule.model');
const User = require('../models/user.model');


// check người dùng đăng nhập

/* GET home page. */
router.get('/', (req, res, next) => {

  res.render('index', {
    isLogin: false,
    info: {},
    data : null
  });
});
// ====================================================
//                        LOGIN
// ====================================================
router.post('/login',async (req, res) => {
  let myData = req.body;
  console.log(myData);
  
  if (myData.phoneNumber == '123' || myData.phoneNumber == '1234567890') {
    if (myData.password == '123') {
      let info = {
        acp: 1
      };
      res.json(info);
    } else {
      let info = {
        mess: "Tài khoản hoặc mật khẩu không đúng.",
        acp: 0
      }
      res.json(info);
    }

  } else {
    let info = {
      mess: "Tài khoản hoặc mật khẩu không đúng.",
      acp: 0
    }
    res.json(info);
  }
})

// =====================================================
//                         USER
// =====================================================

router.get('/user', (req, res) => {
  res.render('User', {
    isLogin: true,
    // info: {},
  });
});

router.post('/user', (req,res) => {
  let info = {
    phoneNumber: req.phoneNumber,
    password: req.password
  }
  let newUser = new User(info);
  let rs = newUser.addUserByPhoneNumber();
  res.json({"KQ": rs});
})

// api đặt sân 
router.get('/s/',async(req,res)=>{
  let dataSanBong = await SanBong.find({})
  res.render('index', {
    isLogin: true,
    info: {},
    data: dataSanBong
  })
})

router.get('/admin', (req, res) => {
  res.render('admin');
});

router.get('/searchfield', (req, res) => {
  res.render('schedule', {
    isLogin: false
  });
});

// ==========================================
//                   PAYMENT
// ==========================================

// QR API link
router.get('/payment/ewallet/', (req, res) => {
  let eWallet = "Đấng óc chó Ahihi";
  let data = {
    paymentLink: `<img src='http://chart.apis.google.com/chart?cht=qr&chl=${eWallet}&chs=300' alt='qr' />`
  }
  res.status(200).json({data: data});
});

router.get('/payment', (req, res) => {
  let data = {
    fieldName: "Sân A",
    date: "20/4/2019",
    time: "16:00",
    email: "asd@gmail.com",
    sdt: "0968222222"
  }
  res.render('payment', {isLogin: true, data: data});
});

router.post('/payment', async(req, res, next) => {
  let data = req.body
  console.log(data);
  
  // Get user info


  let schedule = {
    pitch: data.size,
    renter: data.phoneNumber,
    rentDate: data.date,
    rentTime: data.time,
    lasting: data.lasting,
  }
  // var newSchedule = new Schedule(schedule);
  // let dataBeforSave = await newSchedule.add_schedule()
  res.json(schedule);
  // res.render('payment', {isLogin: true, data: dataBeforSave});
})

router.post('/payment_viet', (req, res) => {
  let info = {
    phoneNumber: req.body.phoneNumber,
    typeOfEWallet: req.body.exampleRadios
  }
  console.log(info);
  // Get link API E-Wallet

  res.redirect('/qr');
});

router.get('/qr', (req, res) => {
  res.render('qr', {isLogin: true});
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