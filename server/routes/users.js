var express = require('express');
var router = express.Router();

const Users = require('./../models/Users')

/* GET users listing. */
router.get('/', function (req, res, next) {
  res.send('Got users!');
});

// 登录接口
// ？？？有时候post变get，导致请求不到数据。
router.post('/login', function (req, res, next) {
  var param = {
    userName: req.body.userName,
    userPwd: req.body.userPwd
  }
  Users.findOne(param, function (err, doc) {
    if (err) {
      res.json({
        status: '1',
        msg: '没有注册oops！'
      })
    } else {
      if (doc) {
        console.log(doc.userId)
        res.cookie("userId", doc.userId, {
          path: '/',
          maxAge: 1000 * 60*2
        })
        res.json({
          status: '0',
          msg: '登录成功lol！',
          result: doc
        })
      }
    }
  })
});

//登出
router.post('/logout', function (req, res, next) {
  res.cookie("userId", "", {
    path: '/',
    maxAge: -1 //让cookie失效
  })
  res.json({
    status: '0',
    msg: '登出成功lol！',
    result: ''
  })
});

module.exports = router;
