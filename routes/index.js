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
    data :null
  });
});
// api login ảo lòi :))

router.post('/checklogin',async (req, res) => {
    let myData = req.body
   
    let dataSanBong = await SanBong.find({})
    
    
    if (myData.username == 'admin' || myData.username == 'admin01') {
      if (myData.password == 'admin') {
        let info = {
          acp: 1,
        }
        res.render('index', {
          isLogin: true,
          info: {},
          data: dataSanBong
        })
      } else {
        let info = {
          mess: "tài khoản, mật khẩu không đúng . Vui lòng Kiểm Tra lại",
          acp: 0
        }
        res.render('index', {
          info: info,
          isLogin: false
        })
      }

    } else {
      let info = {
        mess: "tài khoản, mật khẩu không đúng . Vui lòng Kiểm Tra lại",
        acp: 0
      }
      res.render('index', {
        info: info,
        isLogin: false
      })
    }
  })
  .get('/checklogin',async (req, res) => {

      res.redirect('/')    
  })
// api đặt sân 

router.post('/datsan', async(req, res, next) => {
  let myData = req.body

  let info = {
    sanbong : myData.loaisan,
    ngayThue:myData.ngay,
    dattu:myData.gio,
    thoiluongThue:myData.thoiluong
  }
  
  var t = new lichDatSan(info)
  
  
  let dataBeforSave = await t.add_schedule()
  res.json(dataBeforSave)
  
})
// 
router.get('/user', (req, res) => {
  res.render('User', {
    isLogin: true
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

router.get('/payment', (req, res) => {
  let data = {
    fieldName: "Sân A",
    date: "20/4/2019",
    time: "16:00"
  }
  res.render('payment', {
    isLogin: true,
    data: data
  });
  // res.json({isLogin: true, data: data});
});

router.get('/payment/qr', (req, res) => {
  res.render('qr', {
    isLogin: true
  });
})
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