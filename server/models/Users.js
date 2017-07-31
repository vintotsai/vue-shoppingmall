const mongoose = require('mongoose')
const Schema = mongoose.Schema

let userSchema = new Schema({
  'userId':String,
  'userName':String,
  'userPwd':String,
  'orderList':Array,
  'cartList':[
    {
      'productId':String,
      'productName':String,
      'salePrice':String,
      'productImage':String,
      'productNum':{type:Number,default:1},
      'checked':{type:Number,default:1},
    }
  ],
  'addressList':[
    {
      'addressId':String,
      'userName':String,
      'streetName':String,
      'postCode':String,
      'isDefault':String,
    }
  ]
})

module.exports = mongoose.model('User',userSchema,'users')