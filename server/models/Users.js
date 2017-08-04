const mongoose = require('mongoose')
const Schema = mongoose.Schema

let userSchema = new Schema({
  'userId':String,
  'userName':String,
  'userPwd':String,
  'orderList':Array,
  'cartList':Array,
  'addressList':[
    {
      'addressId':String,
      'userName':String,
      'streetName':String,
      'postCode':String,
      'isDefault':String,
      'tel':String
    }
  ]
})

module.exports = mongoose.model('User',userSchema,'users')