const express = require('express');
const router = express.Router();
const passport = require('passport');
const { forwardAuthenticated, ensureAuthenticated } = require('../utils/auth');

/* Get Home Page. */
router.get('/', forwardAuthenticated, (req, res, next) => {
  res.render('index', {
    isLogin: false,
    info: {},
    data : null
  });
});

module.exports = router;