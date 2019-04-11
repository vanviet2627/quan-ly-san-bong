let express = require('express');
let router = express.Router();

router.get('/list', (req, res) => {
    res.send("Soccer fields list");
})

module.exports = router;
