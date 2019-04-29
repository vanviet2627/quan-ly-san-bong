var express = require('express');
var router = express.Router();
const Schedule = require('../models/schedule.model');

// QR API link
router.get('/ewallet/:type', (req, res) => {
  let type = req.params.type;
  let eWallet = type == "momo" ? "link momo payment" : "link zalopay payment";
  let data = {
    paymentLink: `<img src='http://chart.apis.google.com/chart?cht=qr&chl=${eWallet}&chs=300' alt='qr' />`
  }
  res.status(200).json({data: data});
});

router.post('/', async(req, res, next) => {
  let info = req.body;

  let bill = {
    pitch: info.pitchSize,
    renter: "user@gmail.com",
    rentDate: info.rentDate,
    rentTime: info.rentTime,
    lasting: info.lasting,
  }
  
  var newSchedule = new Schedule(bill)
  newSchedule.addSchedule()
    .then(schedule => {
      res.render('payment', {
        isLogin: true,
        userType: "member",
        data: schedule});
    }).catch(err => {
      res.render('error', {message: err.message, error: ''});
    })
})

router.post('/ewallet', (req, res) => {
  let typeOfEWallet = req.body.exampleRadios;
  // Get link API E-Wallet
  res.render('qr', {
    isLogin: true,
    userType: "member",
    typeEwallet: typeOfEWallet});
});

module.exports = router;