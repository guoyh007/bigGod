const ex = require('express');

const app = ex(); //app就是创建服务的对象
// console.log(ex);
// console.log(app);
//get请求 url
//app.get(路径,回调函数(req,res,next))
//app.use()  √  手动调用next()
//app.use()  ×

/*
    通过localhost才能访问app.js

    req.url 客户端不但访问了你的服务器，还带了一些东西过来

    只是一个localhost -> '/'

    localhost/1.txt  -> '/1.txt'

    ex.static('www') 一个静态资源的中间件，通过use去链接起来。


    localhost/add?name=xx&age=xx  -> /add?name=xx&age=xx

    /add -> add.js文件去管理

*/

let sql = [
    {id:0,name:'小强',age:18}
]

app.use(ex.static('www'));

app.use((req,res,next)=>{
    req.sql = sql;
    next();
})
// console.log(req);

/** 
 * 只要是localhost/add就引入add.js文件
 * 
*/
app.use('/add',require('./data/add'));

app.use('/getdata',require('./data/data'));

app.listen(80);