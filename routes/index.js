var express = require('express');
var router = express.Router();
const test = require('../models/pitches.Model')

/* GET home page. */
router.get('/', function(req, res, next) {
  // Validate isLogin
  res.render('index', {isLogin: false});
  // console.log(test);
  // let info = {
  //   tenSanBong:"test",
  //   path : "test",
  //   status : 1,
  // }
  // var t = new test(info)
  // t.save_pitches();

  res.render('index', {isLogin: true});
});

router.get('/user', (req, res) => {
  res.render('user');
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
  res.render('schedule', {isLogin: false});
});

router.get('/payment', (req, res) => {
  let data = {
    fieldName: "Sân A",
    date: "20/4/2019",
    time: "16:00"
  }
  res.render('payment', {isLogin: true, data: data});
  // res.json({isLogin: true, data: data});
});

router.get('/qr', (req, res) => {
  res.render('qr', {isLogin: true});
});

router.get('/payment/qr', (req, res) => {
  let eWallet = "Đấng óc chó";
  let data = {
    paymentLink: `<img src='http://chart.apis.google.com/chart?cht=qr&chl=${eWallet}&chs=300' alt='qr' />`
  }
  res.status(200).json({data: data});
})

module.exports = router;
