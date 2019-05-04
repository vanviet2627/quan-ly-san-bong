var express = require('express');
var router = express.Router();

/* Get Home Page. */
router.get('/', (req, res, next) => {
  res.render('index', {
    isLogin: false,
    info: {},
    data : null
  });
});

module.exports = router;