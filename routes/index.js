var express = require('express');
var router = express.Router();
const test = require('../models/pitches.Model')


// check người dùng đăng nhập


/* GET home page. */
router.get('/', function(req, res, next) {
  // console.log(test);
  // let info = {
  //   tenSanBong:"test",
  //   path : "test",
  //   status : 1,
  // }
  // var t = new test(info)
  // t.save_pitches();
  
  res.render('index', {isLogin: false});
});

router.get('/user', (req, res) => {
  res.render('User', {isLogin: true});
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

router.get('/payment/qr', (req, res) => {
  res.render('qr', {isLogin: true});
})
router.get('/Admin', (req, res) => {
  res.render('Admin', {isLogin: true});
});

router.get('/profile', (req, res) => {
  res.render('profile', {isLogin: true});
});

router.get('/account', (req, res) => {
 res.render('account', {isLogin: true});
});

module.exports = router;
