const Koa = require('koa'); //引入koa
const app = new Koa();
const router = require('./router/user');
const mongoose = require('mongoose');
const bodyParser = require('koa-bodyparser')
// const User = require('./model/user');

//解决跨域问题
app.use(async(ctx, next) => {
    
    //指定服务器端允许进行跨域资源访问的来源域。可以用通配符*表示允许任何域的JavaScript访问资源，但是在响应一个携带身份信息(Credential)的HTTP请求时，必需指定具体的域，不能用通配符
    ctx.set("Access-Control-Allow-Origin", "*");

    //可选。它的值是一个布尔值，表示是否允许客户端跨域请求时携带身份信息(Cookie或者HTTP认证信息)。默认情况下，Cookie不包括在CORS请求之中。当设置成允许请求携带cookie时，需要保证"Access-Control-Allow-Origin"是服务器有的域名，而不能是"*";如果没有设置这个值，浏览器会忽略此次响应。
    ctx.set("Access-Control-Allow-Credentials", true);
    
    //指定服务器允许进行跨域资源访问的请求方法列表，一般用在响应预检请求上
    ctx.set("Access-Control-Allow-Methods", "OPTIONS, GET, PUT, POST, DELETE");
    
    //必需。指定服务器允许进行跨域资源访问的请求头列表，一般用在响应预检请求上
    ctx.set("Access-Control-Allow-Headers", "x-requested-with, accept, origin, content-type");
    // ctx.set("X-Powered-By", ' 3.2.1');
    
    //告诉客户端返回数据的MIME的类型，这只是一个标识信息,并不是真正的数据文件的一部分
    ctx.set("Content-Type", "application/json;charset=utf-8");
    
    //如果不设置mode，直接设置content-type为application/json，则fetch会默认这是跨域模式（mode:'cors'），在跨域POST之前，客户端会先发一条OPTIONS请求来”探探路”，如果服务器允许，再继续POST数据。对于这种OPTIONS请求，需要在服务器配置允许接受OPTIONS请求，这样写就是直接允许了所有的OPTIONS请求，也可以按照需求来判断OPTIONS请求中更详细的信息
    if (ctx.request.method == "OPTIONS") {
        ctx.response.status = 200
    }
    await next();
});


// 链接数据库
mongoose.connect('mongodb://localhost:27017');

// 监听是否链接成功

mongoose.connection.on('connected',(error)=>{
    //链接失败
    if(error){
        return;
    }else{
        //链接成功
        console.log('数据库链接成功');
        // new User({
        //     id: +new Date(),
        //     name:'zyn',
        //     password:'zyn123',
        //     phone:13463061668,
        //     sex:'女',
        //     address:'北京'
        // }).save();
    }
   
    app.use(bodyParser())
    //路由
    app.use(router.routes());
    app.use(router.allowedMethods());
    
    //allowedMethods处理的业务是当所有路由中间件执行完成之后,
    // 若ctx.status为空或者404的时候,丰富response对象的header头.

    app.listen(80,()=>{
        console.log('服务器启动成功')
    })

})






