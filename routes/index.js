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
})

module.exports = router;
