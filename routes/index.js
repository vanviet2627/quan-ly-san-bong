var express = require('express');
var router = express.Router();
const SanBong = require('../models/pitches.Model').Sanbong
const lichDatSan = require('../models/schedule.Model')

// check người dùng đăng nhập

/* GET home page. */
router.get('/', (req, res, next) => {

  res.render('index', {
    isLogin: false,
    info: {},
    data : null
  });
});
// api login ảo lòi :))

router.post('/checklogin',async (req, res) => {
    let myData = req.body
    console.log(myData);
    
   
    let dataSanBong = await SanBong.find({})
    
    
    if (myData.username == 'admin' || myData.username == 'user@gmail.com') {
      if (myData.password == 'admin' || myData.password == '123') {
        let info = {
          acp: 1,
        }
        res.json(info)
      } else {
        let info = {
          mess: "tài khoản, mật khẩu không đúng . Vui lòng Kiểm Tra lại",
          acp: 0
        }
        res.json(info)
      }

    } else {
      let info = {
        mess: "tài khoản, mật khẩu không đúng . Vui lòng Kiểm Tra lại",
        acp: 0
      }
      res.json(info)
    }
  })
  .get('/checklogin',async (req, res) => {

      res.redirect('/')    
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
router.post('/payment', async(req, res, next) => {
  let myData = req.body
  
  let info = {
    sanbong : myData.loaisan,
    ngayThue:myData.ngay,
    dattu:myData.gio,
    thoiluongThue:myData.thoiluong,
    email: "user@gmail.com",
  }
  var t = new lichDatSan(info)
  let dataBeforSave = await t.add_schedule()

  res.render('payment', {isLogin: true, data: dataBeforSave});
})
// 
router.get('/user', (req, res) => {
  res.render('User', {
    isLogin: true,
    info: {},
    data : null
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