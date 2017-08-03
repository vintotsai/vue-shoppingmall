const mongoose = require('mongoose')
const Schema = mongoose.Schema

let goodsSchema = new Schema({
  "productId": String,
  "productName": String,
  "salePrice": Number,
  "productImage": String,
  'productNum': Number,
  'checked': Number
})

module.exports = mongoose.model('Good', goodsSchema, 'goods') //第三个参数表示 Good 跟 数据库 goods集合 相关联
