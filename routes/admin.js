var express = require('express');
var router = express.Router();
const Pitch = require('../models/pitches.model');
const Schedule = require('../models/schedule.model');
const User = require('../models/user.model');

router.get('/alluser', (req, res) => {
  let data = new User().getAllUser();
  data.then(users => {
    res.render('alluser', {
      isLogin: true,
      userType: "admin",
      data: users
    });
  }).catch(err => {
    res.render('err', {message: err.message});
  })
});

router.get('/allschedule', (req, res) => {
  let data = new Schedule().getAllSchedule();
  data.then(schedule => {
    console.log(schedule);
    
    res.render('allschedule', {
      isLogin: true,
      userType: "admin",
      data: schedule
    });
  }).catch(err => {
    res.render('err', {message: err.message});
  })
});

router.post('/pitch', (req, res) => {
  let data = {
    pitchName: req.body.pitchName,
    pitchSize: req.body.pitchSize,
    status: req.body.status,
    renter: req.body.render
  }
  let newPitch = new Pitch(data).addPitch();
  newPitch.then(rs => {
      res.status(200).json({success: true, rs: rs})
    }).catch(err => {
      res.status(500).json({err: err})
    })
})

router.get('/uncheckallpitch', (req, res) => {
  new Pitch().uncheckAllPitch().then(rs => {
    res.json("Uncheck All Pitch!");
  }).catch(err => {
    res.json("Uncheck All Pitch Failed!");
  })
})

module.exports = router;