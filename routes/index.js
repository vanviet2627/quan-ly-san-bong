const express = require('express');
const router = express.Router();
const passport = require('passport');
const { forwardAuthenticated, ensureAuthenticated } = require('../configs/auth');

/* Get Home Page. */
router.get('/', (req, res, next) => {
  res.render('index', {
    isLogin: false,
    info: {},
    data : null
  });
});

module.exports = router;