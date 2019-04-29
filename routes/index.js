const express = require('express');
const router = express.Router();
const passport = require('passport');
const { forwardAuthenticated } = require('../configs/auth');

/* Get Home Page. */
router.get('/', forwardAuthenticated, (req, res, next) => {
  res.render('index', {
    isLogin: false,
    info: {},
    data : null
  });
});

module.exports = router;