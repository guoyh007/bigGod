const mongoose = require('mongoose');

const Data = new mongoose.Schema({
    banner:Array,
    tuijian:Array,
    limit:Array,
    food:Array,
    computer:Array,
    special:Array,
});
module.exports = mongoose.model('Data', Data);