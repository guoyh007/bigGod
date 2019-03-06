const Koa = require('koa');
const app = new Koa();
const router = require('koa-router')();
const static = require('koa-static');
const path = require('path');
const mongoose = require('mongoose');
const Data = require('./model/schemadata');
const Users = require('./model/users');
const bodyParser = require('koa-bodyparser');
// const datax =require('../app/src/data/datax');
// console.log(datax);
mongoose.connect('mongodb://localhost:27017');

//解决跨域问题；
app.use(async (ctx, next) => {

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
/* 
公共：    http://localhost
接口文档 ：
        /data?act=search&[class|id]  这个是查询详情页的信息
        /data?act=all  这个是查询所有数据库的信息；
        /data?act=banner 轮播图目录，滑过的时候获取的数据；
        /data?act=tuijian 限时购数据的接口
        /data?act=limit 限时购数据的接口
        /data?act=computer 限时购数据的接口
登录注册：
        /user?act=login&username=username&password=password 
购物车添加：（添加到购物车）
        /add?act=addtocart&id=+userid+&shopping=+arrx
购物车增加：++
        /shoping?act=add&dataobj=dataobj      
购物车减少：--
        /shoping?act=less&dataobj=dataobj
购物车删除数据：del
        /shoping?act=del&dataobj=dataobj     
商品收藏：
        /collect?act=add&id=+userid+&collect=+obj
商品取消收藏：
        /collect?act=cancel&id=+userid+&collect=+obj
        

*/


mongoose.connection.on('connected', (err) => {
        if (err) return;
        console.log('链接成功');
        //登录页面
        //user?act=login&username=username&password=password
        router.get('/user', async (ctx) => {
                let o = {};
                let obj = ctx.request.query;
                switch (obj.act) {
                        case "login":
                                let {
                                        username,
                                        password
                                } = obj;
                                try {
                                        // let userdata=await Users.find((e)=>e.username==username&&e.password==password);JSON.parse(JSON.stringify({id,sex,name}))
                                        let userdata = await Users.find({username});
                                        console.log(userdata);
                                        if(userdata[0].password===password){
                                                o.code = 0;
                                                o.msg = "登录成功";
                                                o.data = userdata;
                                        }else{
                                                o.code = 1;
                                                o.msg = "密码错误，请重新输入";
                                        };
                                } catch (error) {
                                        //在数据库中加上信息；
                                        let id=Math.round(+new Date);
                                        console.log(id);
                                        let add =new Users({
                                                id:id,
                                                username:username,
                                                password:password,
                                        })
                                        await add.save();//放到数据库
                                        o.code = 1;
                                        o.msg = "注册成功";
                                        o.data = {username};
                                }
                                break;
                        default:
                                break;
                }
                ctx.body = o;
        });

        //添加到购物车,每次退出登录，或者关闭页面；都把购物车数据传给后端。
        //http://localhost/add?act=addtocart&id='+userid+'&shopping='+arrx
        router.get('/add', async (ctx) => {
                let o = {};
                let obj = ctx.request.query;
                switch (obj.act) {
                        case "addtocart":
                                let {
                                        id,
                                        shopping
                                } = obj;
                                let shoppingobj =JSON.parse(shopping);
                                try {
                                        await Users.update({'id' : id}, {'shopping':shoppingobj})
                                        o.code = 0;
                                        o.msg = "添加购物车成功";
                                } catch (error) {
                                        o.code = 1;
                                        o.msg = "添加购物车失败";
                                }
                                        break;
                        default:
                                break;
                }
                ctx.body = o;
        });

        //购物车增加：++  -- 
        // 'http://localhost/shopping?act=add&id=userid&dataobj=dataobj
        router.get('/shopping', async (ctx) => {
                let o = {};
                let obj = ctx.request.query;
                let {id,dataobj:objx}=obj;//用户的id，商品的id
                switch (obj.act) {
                        case "add":
                                try {
                                        let dataobj=JSON.parse(objx);
                                        let {id:sid,count}=dataobj;
                                        let arr= await Users.find({'id':id});
                                        let arrx =arr[0].shopping;
                                        //some
                                        let result=arrx.some((e)=>e.id===sid)//判断里边有没有
                                        if(!result){//没有就加
                                                await Users.update({"id":id},{"$push":{"shopping":dataobj}});
                                                o.code=1;
                                                o.msg="添加成功";
                                      }else{//有我就用set
                                                await Users.update({"id":id,"shopping.id":sid},{"$set":{"shopping.$.count":count}});
                                                o.code=1;
                                                o.msg="添加成功"; 
                                      }
                                } catch (error) {
                                        o.code=0;
                                        o.msg="操作失败";
                                }       
                                break;
                
                        default:
                                break;
                }
               
        
                ctx.body = o;
        });
        // 商品收藏：
        // /collect?act=addtocart&id='+userid+'&collect='+obj
        router.get('/collect', async (ctx) => {
                let o = {};
                let obj = ctx.request.query;
                let {id,collect}=obj;
                try {
                        let collectobj=JSON.parse(collect);
                       
                        let arr= await Users.find({'id':id});
                        console.log(arr[0].collect);
                        let arrx =arr[0].collect;
                        if(arrx.length===0){
                                await Users.update({"id":id},{"$push":{"collect":collectobj}});
                                o.code=1;
                                o.msg="收藏成功";
                        }else{//数组不为0就分情况；
                                let a=arrx.some((e)=>{
                                      return  e.id==collectobj.id
                                });
                                console.log(a);
                                if(!a){//如果没找到
                                        console.log("有数组没找到");
                                        await Users.update({"id":id},{"$push":{"collect":collectobj}});
                                        o.code=1;
                                        o.msg="收藏成功";  
                                }else{
                                        console.log("有数组没删除");
                                        await Users.update({"id":id},{"$pull":{"collect":collectobj}});
                                        o.code=0;
                                        o.msg="取消收藏成功";  
                                }
                        }
                       
                } catch (error) {
                        o.code=0;
                        o.msg="操作失败";
                }
        
                ctx.body = o;
        });

        //购物车删除数据；
        //http://localhost/less?act=addtocart&id='+userid+'&shopping='+arrx
        router.get('/less', async (ctx) => {
                let o = {};
                let obj = ctx.request.query;
                switch (obj.act) {
                        case "lesstocart":
                                let {
                                        id,
                                        shopping
                                } = obj;
                                let shoppingobj =JSON.parse(shopping);
                                try {
                                        await Users.remove({'id' : id}, {'shopping':shoppingobj})
                                        o.code = 0;
                                        o.msg = "从购物车删除成功";
                                } catch (error) {
                                        o.code = 1;
                                        o.msg = "从购物车删除失败";
                                }
                                        break;
                        default:
                                break;
                }
                ctx.body = o;
        });

        //公共页面获取后端的数据
        router.get('/data', async (ctx) => {
                let o = {};
                let obj = ctx.request.query;

                switch (obj.act) {
                        case "all":
                                try {
                                        let data = await Data.find({});
                                        // console.log(data);
                                        o.code = 0;
                                        o.msg = "获取成功";
                                        o.data = data;
                                } catch (error) {
                                        o.code = 1;
                                        o.msg = "获取失败";
                                        o.data = [];
                                }
                                break;
                        case "banner":
                                try {
                                        let datax = await Data.find({});
                                        let data1 = datax[0].banner;
                                        // console.log(data1);
                                        o.code = 0;
                                        o.msg = "获取成功";
                                        o.data = data1;
                                } catch (error) {
                                        o.code = 1;
                                        o.msg = "获取失败";
                                        o.data = [];
                                }
                                break;
                        case "limit":
                                try {
                                        let limitData = await Data.find({});
                                        // console.log(data);
                                        let limitArr = limitData[0].limit;
                                        // console.log(limitArr);
                                        o.code = 0;
                                        o.msg = "获取成功";
                                        o.data = limitArr;
                                } catch (error) {
                                        o.code = 1;
                                        o.msg = "获取失败";
                                        o.data = [];
                                }
                                break;
                        case "tuijian":
                                try {
                                        let tjData = await Data.find({});
                                        // console.log(data);
                                        let TjArr = tjData[0].tuijian;
                                        // console.log(TjArr);
                                        o.code = 0;
                                        o.msg = "获取成功";
                                        o.data = TjArr;
                                } catch (error) {
                                        o.code = 1;
                                        o.msg = "获取失败";
                                        o.data = [];
                                }
                                break;
                        case "computer":
                                try {
                                        let computerData = await Data.find({});
                                        // console.log(data);
                                        let PcArr = computerData[0].computer;
                                        o.code = 0;
                                        o.msg = "获取成功";
                                        o.data = PcArr;
                                } catch (error) {
                                        o.code = 1;
                                        o.msg = "获取失败";
                                        o.data = [];
                                }
                                break;
                        case "food":
                                try {
                                        let foodData = await Data.find({});
                                        // console.log(data);
                                        let foodArr = foodData[0].food;
                                        o.code = 0;
                                        o.msg = "获取成功";
                                        o.data = foodArr;
                                } catch (error) {
                                        o.code = 1;
                                        o.msg = "获取失败";
                                        o.data = [];
                                }
                                break;
                        case "special":
                                try {
                                        let specialData = await Data.find({});
                                        // console.log(data);
                                        let spArr = specialData[0].special;
                                        o.code = 0;
                                        o.msg = "获取成功";
                                        o.data = spArr;
                                } catch (error) {
                                        o.code = 1;
                                        o.msg = "获取失败";
                                        o.data = [];
                                }
                                break;

                        default:
                                break;
                };
                ctx.body = o;

        });

        // app.use(async function(ctx, next) {
        // //    console.log({msg:1});

        //     let msg="";
        //     try{
        //         let arr = await Users.find({username:'dabiaoge'});
        //         if(arr.length!==0){
        //             msg='成功';
        //             ctx.response.body = {
        //                 code:0,
        //                 data:arr,
        //                 msg:msg
        //             }
        //         }else{
        //             msg='请求失败';
        //             ctx.response.body = {
        //                 code:0,
        //                 msg:msg
        //             }
        //         }
        //     }catch(err){
        //         ctx.body = {
        //             code:1,
        //             msg:'找不到'
        //         }
        //     }

        // });
        app.use(bodyParser());
        app.use(router.routes());
        // app.use(static(path.join(__dirname, '../www')))
        app.listen(80);

        // let data = new Data();

        // data.save();

        // let users = new Users({
        //         "id" : 123,
        //         "username" : "dabiaoge",
        //         "password" : "12345678",
        //         "shopping":[
        //                 {
        //                         "id":"2123",
        //                         "class":"推荐",
        //                         "count":"3"
        //                 }
        //         ]
        // });
        // users.save();
})