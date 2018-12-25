const path = require('path');
const HWP = require('html-webpack-plugin');
module.exports ={
    mode:'development',
    entry:{
        x:'./x.js',
        y:'./y.js'
    },
    output:{
        path:path.resolve(__dirname,'build'),
        filename:'[name].[hash:5].js',
    },
    plugins:[
        new HWP({
            template:'./bigod.html',
            filename:'bigod1.html',
            chunks:['x','y'],
            minify:{
                removeAttributeQuotes:true,//去掉引号
                collapseWhitespace:true,//html压缩成一行
            }
        })
    ]
}
