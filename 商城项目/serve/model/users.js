const mongoose = require('mongoose');
const Users = new mongoose.Schema(
    {
        id:Number,
        username:String,
        othername:String,
        password:String,
        shopping:Array,
        collect:Array,
        order:Array,//这个是订单
        address:Array//这个是地址
    }
);
module.exports = mongoose.model('Users', Users);