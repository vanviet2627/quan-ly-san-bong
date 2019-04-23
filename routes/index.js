var express = require('express');
var router = express.Router();
const Pitch = require('../models/pitches.Model').Sanbong
const Schedule = require('../models/schedule.Model')

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
    ngayThue: info.ngay,
    dattu: info.gio,
    thoiluongThue: info.thoiluong,
    email: "user@gmail.com",
  }
  var newSchedule = new Schedule(bill)
  let dataBeforSave = await newSchedule.add_schedule()
  res.render('payment', {isLogin: true, data: dataBeforSave});
})

router.post('/payment/ewallet', (req, res) => {
  let typeOfEWallet = req.body.exampleRadios;
  // Get link API E-Wallet
  res.render('qr', {isLogin: true, typeEwallet: typeOfEWallet});
});

// ==========================================
//                   User
// ==========================================

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

router.post('/signin', (req, res) => {
  res.redirect('/');
});

router.post('/signup', (req, res) => {
  res.redirect('/');
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

router.post('/checklogin',async (req, res) => {
  let myData = req.body
  console.log(myData);
  let dataSanBong = await Pitch.find({})
  if (myData.username == 'admin' || myData.username == 'user@gmail.com') {
    if (myData.password == 'admin' || myData.password == '123') {
      let info = {
        acp: 1,
      }
      res.json(info)
    } else {
      let info = {
        mess: "Tài khoản hoặc mật khẩu không đúng.",
        acp: 0
      }
      res.json(info)
    }
  } else {
    let info = {
      mess: "Tài khoản hoặc mật khẩu không đúng.",
      acp: 0
    }
    res.json(info)
  }
})
.get('/checklogin', async (req, res) => {
    res.redirect('/')    
})

module.exports = router;