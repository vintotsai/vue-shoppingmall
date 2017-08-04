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
          maxAge: 1000 * 60 * 30
        });
        res.cookie("userName", doc.userName, {
          path: '/',
          maxAge: 1000 * 60 * 30
        });
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

// 刷新页面 检查是否已经登录
router.get('/checkLogin', function (req, res, next) {
  if (req.cookies.userId) {
    res.json({
      stauts: '0',
      msg: '',
      result: req.cookies.userName
    })
  } else {
    res.json({
      stauts: '1',
      msg: 'Oops~未登录',
      result: ''
    })
  }
})

// 购物车清单
router.get('/cartList', function (req, res, next) {
  let userId = req.cookies.userId;
  Users.findOne({
    userId: userId
  }, function (err, doc) {
    if (!doc) {
      res.json({
        status: '1',
        msg: 'Oops~当前未登录或没有数据',
        result: ''
      })
    } else {
      res.json({
        status: '0',
        msg: '获取数据成功！lol',
        result: doc.cartList
      })
    }
  })
})

// 删除商品列表
router.post('/delCartList', function (req, res, next) {
  let userId = req.cookies.userId;
  let productId = req.body.productId;
  let param = {
    userId: userId,
    productId: productId
  }
  Users.update({
    userId: userId
  }, {
    $pull: {
      cartList: {
        productId: productId
      }
    }
  }, function (err, doc) {
    if (err) {
      res.json({
        status: '1',
        msg: 'Oops~出错额',
        result: ''
      })
    } else {
      res.json({
        status: '0',
        msg: '',
        result: ''
      })
    }
  })
})

// 增减/是否选中 商品列表
router.post('/editCartList', function (req, res, next) {
  let userId = req.cookies.userId;
  let productId = req.body.productId;
  let productNum = req.body.productNum;
  let checked = req.body.checked;
  // 修改子文档的数据
  Users.update({
    userId: userId,
    'cartList.productId': productId
  }, {
    'cartList.$.productNum': productNum,
    'cartList.$.checked': checked
  }, function (err, doc) {
    if (err) {
      res.json({
        status: '1',
        msg: err.message,
        result: ''
      })
    } else {
      res.json({
        status: '0',
        msg: '',
        result: ''
      })
    }
  })
})

// 是否全选 商品列表
router.post('/checkAllList', function (req, res, next) {
  let userId = req.cookies.userId;
  let checkedAll = req.body.checkedAll;
  // 修改子文档的数据
  Users.findOne({userId:userId},function(err,user){
    if(err){
      res.json({
        stauts:'1',
        msg:'oops',
        result:''
      })
    }else{
      if(user){
        user.cartList.forEach((item)=>{
          item.checked = checkedAll;
        });
        //todo
        user.save(function(err,doc){
          if(err){
            res.json({
              stauts:'1',
              msg:err.message,
              result:''
            })
          }else{
            res.json({
              stauts:'0',
              msg:'',
              result:''
            })
          }
        })
      }
    }
  })
})


module.exports = router;
