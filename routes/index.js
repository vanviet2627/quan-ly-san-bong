var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', {isLogin: false});
});

router.get('/user', (req, res) => {
  res.render('User', {isLogin: true});
});

router.get('/Admin', (req, res) => {
  res.render('Admin', {isLogin: true});
});

router.get('/lyLich', (req, res) => {
  res.render('lyLich', {isLogin: true});
});

router.get('/account', (req, res) => {
 res.render('account', {isLogin: true});
});

module.exports = router;
