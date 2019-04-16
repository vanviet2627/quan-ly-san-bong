let express = require('express');
let router = express.Router;

// QR API link
router.get('/payment/qr', (req, res) => {
  let eWallet = "Đấng óc chó";
  let data = {
    paymentLink: `<img src='http://chart.apis.google.com/chart?cht=qr&chl=${eWallet}&chs=300' alt='qr' />`
  }
  res.status(200).json({data: data});
});

router.get('/payment', (req, res) => {
  let data = {
    fieldName: "Sân A",
    date: "20/4/2019",
    time: "16:00",
    email: "asd@gmail.com",
    // sdt: "0968222222"
  }
  res.render('payment', {isLogin: true, data: data});
});

router.post('/payment', (req, res) => {
  let info = req.body;
  console.log(body);

  res.send("OK");
})

router.get('/qr', (req, res) => {
  res.render('qr', {isLogin: true});
});

module.exports = router;