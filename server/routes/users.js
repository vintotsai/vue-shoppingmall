var express = require('express');
var router = express.Router();

const Users = require('./../models/Users')

/* GET users listing. */
router.get('/', function (req, res, next) {
  res.send('Got users!');
  window.location.href = '/users/test'
});

// router.get('/login', function(req, res, next) {
//   res.send('Got users/login!');
// });


// ？？？有时候post变get，导致请求不到数据。
router.post('/login', function (req, res, next) {
  var param = {
    userName: req.body.userName,
    userPwd: req.body.userPwd
  }
  Users.findOne(param, function (err, doc) {
    if (!doc) {
      res.json({
        status: 0,
        msg: '没有注册oops！'

      })
    } else {
      res.json({
        status: 1,
        msg: '登录成功lol！',
        result: doc
      })
    }
  })
});

module.exports = router;
