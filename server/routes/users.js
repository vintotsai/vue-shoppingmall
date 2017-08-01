var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('Got users!');
});

// router.post('/', function(req, res, next) {
router.post('/login', function (req, res, next) {
  // res.send(`Got users login!`);
  console.log(req.body)
  var param = {
    userName:req.body.userName,
    userPwd:req.body.userPwd
  }
});

module.exports = router;
