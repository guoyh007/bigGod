const mongoose = require('mongoose');
const Users = new mongoose.Schema(
    {
        id:Number,
        username:String,
        password:String,
        shopping:Array,
        collect:Array
    }
);
module.exports = mongoose.model('Users', Users);