var express = require('express');
var router = express.Router();

// router.get('/lyLich', (req, res) => {
//     res.render('lyLich', {isLogin: true});
//   });
  
router.get('/account', (req, res) => {
  res.render('account', {
    isLogin: true,
    info: {},
    data : {}
                        });
});

router.get('/signout', (req, res) => {
  // Handle signout
  res.redirect('/');
})

module.exports = router;
