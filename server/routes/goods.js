const express = require('express');
const router = express.Router();

const mongoose = require('mongoose')
const Goods = require('./../models/Goods')

// 连接mongodb数据库
mongoose.connect('mongodb://localhost:27017/shoppingmall')
mongoose.connection.on("connected", function () {
  console.log(`mongodb 连接成功！`)
})
mongoose.connection.on("error", function () {
  console.log(`mongodb 连接失败！`)
})
mongoose.connection.on("disconnected", function () {
  console.log(`mongodb 断开连接！`)
})

router.get('/', function (req, res, next) {
  console.log(req.query)
  // 变量解构赋值
  // let [page,pageSize,sort,skip]=[parseInt(req.param('page')),parseInt(req.param('pageSize'))]
  
  // let page = parseInt(req.query('page'))
  // let pageSize = parseInt(req.query('pageSize'))
  // let skip = (page - 1) * pageSize
  // let sort = parseInt(req.query('sort'))
  let page = parseInt(req.query.page)
  let pageSize = parseInt(req.query.pageSize)
  let skip = (page-1)*pageSize
  let sort = parseInt(req.query.sort)
  let params = {}

  let goodsModel = Goods.find(params).skip(skip).limit(pageSize).sort({
    'salePrice': sort
  })

  goodsModel.exec(function (err, doc) {
    if (err) {
      res.json({
        status: 0,
        msg: err.message,
      })
    } else {
      // console.log(doc)
      res.json({
        status: 1,
        msg: "连接成功！",
        result: {
          count: doc.length,
          list: doc
        }
      })
    }
  })
  // res.end()
  // res.send(`/goods`);
});
router.get('/subgoods', function (req, res, next) {
  res.send(`/subgoods`);
});

module.exports = router;
