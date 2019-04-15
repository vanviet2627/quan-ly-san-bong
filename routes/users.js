var express = require('express');
var router = express.Router();

router.get('/lyLich', (req, res) => {
    res.render('lyLich', {isLogin: true});
  });
  
router.get('/taiKhoan', (req, res) => {
   res.render('taiKhoan', {isLogin: true});
  });
module.exports = router;
