var express = require('express');
var router = express.Router();
const Pitch = require('../models/pitches.model');
const Schedule = require('../models/schedule.model');
const User = require('../models/user.model');
const { forwardAuthenticated, ensureAuthenticated } = require('../configs/auth');

router.get('/alluser', ensureAuthenticated, (req, res) => {
  new User().getAllUser().then(users => {
    res.render('alluser', {
      isLogin: true,
      userType: req.user.userType,
      data: users
    });
  }).catch(err => {
    res.render('err', {message: err.message});
  })
});

router.get('/', ensureAuthenticated, (req, res) => {
  new Schedule().getAllSchedule().then(schedule => {
    res.render('allschedule', {
      isLogin: true,
      userType: req.user.userType,
      data: schedule
    });
  }).catch(err => {
    res.render('err', {message: err.message});
  })
});

router.post('/pitch', ensureAuthenticated, (req, res) => {
  let data = {
    pitchName: req.body.pitchName,
    pitchSize: req.body.pitchSize,
    status: req.body.status,
    renter: req.body.render
  }
  new Pitch(data).addPitch().then(newPitch => {
      res.status(200).json({success: true, rs: newPitch})
    }).catch(err => {
      res.status(500).json({err: err})
    })
})

router.get('/uncheckallpitch', ensureAuthenticated, (req, res) => {
  new Pitch().uncheckAllPitch().then(rs => {
    res.json("Uncheck All Pitch!");
  }).catch(err => {
    res.json("Uncheck All Pitch Failed!");
  })
})

module.exports = router;