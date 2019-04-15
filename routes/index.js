var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  // Validate isLogin
  res.render('index', {isLogin: false});
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
  res.render('searchField', {isLogin: false});
});


module.exports = router;
