const express = require('express');
const router = express.Router();

const mongoose = require('mongoose')
const Goods = require('./../models/Goods')

// 连接mongodb数据库
mongoose.connect('mongodb://localhost:27017/shoppingmall')
mongoose.connection.on("connected",function(){
  console.log(`mongodb 连接成功！`)
})
mongoose.connection.on("error",function(){
  console.log(`mongodb 连接失败！`)
})
mongoose.connection.on("disconnected",function(){
  console.log(`mongodb 断开连接！`)
})
router.get('/', function(req, res, next) {
  Goods.find({},function(err,doc){
    if(err){
      res.json({
        status:0,
        msg:err.message,
      })
    }else{
      res.json({
        status:1,
        msg:"连接成功！",
        result:{
          count:doc.length,
          list:doc
        }
      })
    }
  })

  // res.send(`/goods`);
});
router.get('/subgoods', function(req, res, next) {
  res.send(`/subgoods`);
});

module.exports = router;
