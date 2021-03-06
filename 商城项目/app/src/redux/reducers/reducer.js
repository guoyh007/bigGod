import clear from "../../component/clear";

let obj={
    data:{},//把登录后，传过来的数据存起来
    loginState:false,//是否是登录状态
    username:"未登录...",//用户名
    shoppingNum:0,//这个是购物车里边商品的的总数量,初始值需要Didmount
    arr:[],//购物车数据的数组,开始我用[{id，num}]
    id:"",//这个id应该是请求过来的
    display:"hidden",//这个是弹框是否弹出
    collectArr:[],//这个是收藏
    allprice:0,//购物车，总计价格
    allchecked:false,//全选的状态
    cleararr:[],//结算商品的页面
    orderarr:[],//订单页面
    addressdisplay:"none",//添加地址，弹框的显示与否
    addressarr:[],//地址的集合
};

const ADDTOCART="ADDTOCART";
const ADD_NUM="ADD_NUM";
const LESS_NUM="LESS_NUM";
const INIT="INIT"; 
const SHOW="SHOW"; 
const HIEDDEN="HIEDDEN";
const LOGIN="login";
const LOGINOUT="loginout";
// const TOZERO="tozero";
const COLLECT="collect";//收藏
const GETDATE="getdata";//获取登录，传过来的数据存起来
const TOBACK="toback";//当退出登录的时候，一起把购物车的数据给后台（退出也可以 想到关闭网页）
const TOBACKOBJ="tobackobj";//当退出登录的时候，一起把购物车的数据给后台（退出也可以 想到关闭网页）
const UPDATE="update";//更新购物车的数据
// const CHANGECHECKED="changechecked";//点击切换check状态；
const DEL="del";//删除某一项
const NEGATION="negation";//取反
const CLEAR="clear";//下单清算
const ADDRESSFN ="addressfn";//点击添加地址，出现盒子
const SAVESDDRESS ="saveaddress";//点击添加地址，出现盒子 cancellation of order
const CANCEL ="cancel";//取消订单 cancellation of order

function reducer (state=obj,action){
    switch (action.type) {
        case ADD_NUM://购物车++,总数变化，但是后端不是用的++，而是用总数替换的方法来解决；
            let {dataobj:obj01}=action;
            let state1 = JSON.parse(JSON.stringify(state));
            state1.shoppingNum++;//暂定 以后会变这个函数
            //请求数据
            let obj01x=JSON.stringify(obj01);
            // 'http://localhost/shopping?act=add&id=userid$dataobj=dataobj
            async function fnadd(){
                let userid= state1.data.id;//找到id
                console.log(userid);
                let a= await fetch('http://localhost/shopping?act=add&id='+userid+'&dataobj='+obj01x)
                .then(d=>d.json());
                console.log(a);
            };
            fnadd();
            return state1;
        case LESS_NUM://购物车--,总数变化,用的也是add的接口
            let {dataobj:obj02}=action;//
            let state2 = JSON.parse(JSON.stringify(state));
            let obj02x=JSON.stringify(obj02);
            if(state2.shoppingNum>=1){
                state2.shoppingNum--;//暂定以后会变这个函数
                async function fnadd(){
                    let userid= state2.data.id;//找到id
                    // console.log(userid);
                    let a= await fetch('http://localhost/shopping?act=add&id='+userid+'&dataobj='+obj02x)
                    .then(d=>d.json());
                    console.log(a);
                };
                fnadd();
            };
            return state2;
        case ADDTOCART://加入购物车  
            console.log("加入购物车");
            let {dataObj}=action;
            // console.log(dataObj);
            let state3 = JSON.parse(JSON.stringify(state));
            //这个其实应该是穿过来的数据
            //传过来之后先看看有没有 id一样的；
            // debugger
            if(state3.arr.length===0){
                state3.arr.push(dataObj);//添加的是一个对象
            }else{
                //如果数组中的每一项的id都不和现在穿过来的id相等；
                let result=state3.arr.every(e=>e.id!==dataObj.id);
                // console.log(result);
                //如果都不等，那么
                if(result){
                    state3.arr.push(dataObj);
                    console.log(state3.arr);
                }else{
                    let a=state3.arr.find((e)=>
                        e.id===dataObj.id
                    );
                    console.log(a);
                    a.count+=dataObj.count;
                }
            };

            let {arr:arr3}=state3;
            let arrx3=JSON.stringify(arr3);//把它变成字符串；
            let userid3= state3.data.id;
            //往后端传数据；用id去找   arr1
            async function fnx(){
                let a= await fetch('http://localhost/add?act=addtocart&id='+userid3+'&shopping='+arrx3)
                .then(d=>d.json());
                console.log(a);
            };
            fnx();
            // console.log(dataObj);
            //如论如何，购物车上边的数字会加
            state3.shoppingNum+=dataObj.count;
            console.log(state3.arr);
           
            return state3;
        case INIT:
            let {arr}=action;
            let state4 = JSON.parse(JSON.stringify(state));
            // state4.arr.push();
            let temp=0;
            arr.forEach(e => {
                temp+=e.count;   
            });
            state4.shoppingNum=temp;
            return state4;
        case SHOW://点击登良，弹框出现
            let state5 = JSON.parse(JSON.stringify(state));
            state5.display="show";
            return state5;
        case HIEDDEN://点击x或者取消按钮，弹框消失，
            let state6 = JSON.parse(JSON.stringify(state));
            state6.display="hidden";
            return state6;
        case LOGIN://登录，并把登录状态true；
            let state7 = JSON.parse(JSON.stringify(state));
            state7.loginState=true;
            return state7;
        case LOGINOUT://退出登录后，购物车总计归零，数组为0，清空localStorage
            let state8 = JSON.parse(JSON.stringify(state));
            state8.loginState=false;
            state8.shoppingNum=0;
            state8.arr=[];
            //清空localStorage
            localStorage.clear();
            return state8;
        case COLLECT://商品收藏；1给reducer，2后端操作数据；
            let {dataObj09}=action;
            let state9 = JSON.parse(JSON.stringify(state));
            if(state9.collectArr.length===0){//数组空数组直接push
                state9.collectArr.push(dataObj09);
            }else{
                let xxx= state9.collectArr.find((e)=>e.id==dataObj09.id);
                console.log(xxx);
                if(!xxx){
                    state9.collectArr.push(dataObj09);
                }else{
                    state9.collectArr=state9.collectArr.filter((e)=>{
                       return e.id!==dataObj09.id;
                    })
                }
            }
            console.log(state9.collectArr);
           //向后端请求数据：增或者删；
            async function fn09(){
                console.log("fetch");
                let userid= state9.data.id;
                let obj=JSON.stringify(dataObj09);//把它变成字符串；
                let a= await fetch('http://localhost/collect?act=add&id='+userid+'&collect='+obj)
                .then(d=>d.json());
                if(a.code===1){//弹框
                    alert("收藏成功 m_n ");
                }else{
                    alert("取消收藏 m_n ");
                }
            };
            fn09();
            return state9;
        case GETDATE://登录，存数据；前边已经写了fetch，
            let {obj}=action;
            let state10 = JSON.parse(JSON.stringify(state));
            state10.data=obj;//这个是总数据；
            state10.username=obj.othername.substring(0,3)+"...";
            state10.loginState=true;
            // console.log(obj.shopping);
            state10.arr=obj.shopping;//将购物车得数据单独存起来；
            console.log(obj.shopping);
            obj.shopping.forEach((e)=>{
                state10.shoppingNum+=e.count;
            });
            // state10.shoppingNum=obj.shopping.length;
            state10.loginState=true;
            //收藏：把请求来的收藏夹数据存到里边；
            state10.collectArr=obj.collect;
            //订单：把请求来的订单数据存到里边；
            state10.orderarr=obj.order;
            //地址：地址信息：
            state10.addressarr=obj.address;
            console.log(state10);
            console.log(state10.loginState);
            return state10;
        case TOBACK://给后端，存数据；
            let state11 = JSON.parse(JSON.stringify(state));
            let {arr:arr1}=state11;
            let arrx=JSON.stringify(arr1);//把它变成字符串；
            let userid= state11.data.id;
            console.log(userid); 
            //往后端传数据；用id去找   arr1
            async function fnx(){
                await fetch('http://localhost/add?act=addtocart&id='+userid+'&shopping='+arrx)
                .then(d=>d.json())
            };
            fnx();
            return state11;

        case UPDATE://更新购物车的数据；非专业
            let {updatearr}=action;
            let state12 = JSON.parse(JSON.stringify(state));
            state12.cleararr=state12.arr.filter((e)=>{
                return e.checked===true;
            });
            console.log(state12.cleararr);
            async function fnx12(){
                let id= state12.data.id;//用户的id；
                let updatearr1=JSON.stringify(updatearr);//把它变成字符串；
                // console.log(updatearr);
                let a= await fetch('http://localhost/shopping?act=checked&id='+id+'&dataobj='+updatearr1)
                .then(d=>d.json());
                // console.log(a);//根据这个进行再操作；
                if(a.code==1){
                    state12.arr=updatearr;
                }
            };
            fnx12();
          
            return state12;
        case TOBACKOBJ://给后端对象；
            console.log("进入后端");
            let state13 = JSON.parse(JSON.stringify(state));
            let {tobackobj}=action;
            // let {arr:arr2}=state13;
            let arrx2=JSON.stringify(tobackobj);//把它变成字符串；
            let id02= state13.data.id;
            // console.log(id02); 
            //往后端传数据；用id去找   arr1
            async function fnx2(){
               let a= await fetch('http://localhost/add?act=addtocart&id='+id02+'&shopping='+arrx2)
                .then(d=>d.json());
                console.log(a);
            };
            fnx2();
            return state13;
        case DEL://删除购物车中的某一项
            console.log("进入后端删除");
            let {obj:obj14}=action;
            let state14 = JSON.parse(JSON.stringify(state));
            //这个可以封装起来成一个函数；
            //http://localhost/shoping?act=del&id=userid&dataobj=dataobj 
            async function fnx14(){
                let id= state14.data.id;//用户的id；
                let objstring=JSON.stringify(obj14);//把它变成字符串；
                console.log(objstring);
                let a= await fetch('http://localhost/shopping?act=del&id='+id+'&dataobj='+objstring)
                .then(d=>d.json());
                console.log(a);//根据这个进行再操作；
            };
            fnx14();
            //过滤数据；
            state14.arr=state14.arr.filter((e)=>
                e.id!==obj14.id
            );
            return state14;
        case NEGATION://所有的 全选 反选
            // let {obj:obj14}=action;
            let state15 = JSON.parse(JSON.stringify(state));
            // let pricex=0;
            // console.log(state15.arr);
            let x=state15.arr.every((e)=>e.checked===true);
            console.log(x);
            if(x){//都是true的时候
                state15.allchecked=false;//让他是false
                state15.arr.forEach((e)=>{
                    e.checked=false;//所有的都是false
                });
            }else{
                state15.allchecked=true;//让他是true
                state15.arr.forEach((e)=>{
                    e.checked=true;//所有的都是false
                    // if(e.checked){
                    //     pricex+=e.count*e.price;
                    // };
                });
            }
           
            console.log(state15.arr);
            // state15.allprice=pricex;//这个allprice
            console.log(state15.allchecked);
            //http://localhost/shoping?act=negation&id=userid&dataobj=arr 
            //请求数据；
            async function fnx15(){
                let id= state15.data.id;//用户的id；
                let dataobj=JSON.stringify(state15.arr);//把它变成字符串；
                let a= await fetch('http://localhost/shopping?act=negation&id='+id+'&dataobj='+dataobj)
                .then(d=>d.json());
                console.log(a);//根据这个进行再操作；
            };
            fnx15();
            return state15;
        case CLEAR:
            // let {listDate:cleararr1}=action;
            let state16 = JSON.parse(JSON.stringify(state));
            state16.cleararr=state16.arr.filter((e)=>e.checked===true);//要结算的商品，已经下单的商品
            console.log(state16.cleararr);
            state16.arr=state16.arr.filter((e)=>e.checked!==true);//未结算的商品
            // state16.order.
            state16.orderarr.push(...state16.cleararr);//要结算的商品，已经下单的商品，这个有点重复；
            let temp16=0;
            state16.arr.forEach(e => {
                temp+=e.count;   
            });
            state16.shoppingNum=temp16;
            // console.log(cleararr1);
            //请求数据；
            async function fnx16(){
                let id= state16.data.id;//用户的id；
                let cleararr=JSON.stringify(state16.cleararr);//把它变成字符串；
                let a= await fetch('http://localhost/shopping?act=clear&id='+id+'&dataobj='+cleararr)
                .then(d=>d.json());
                console.log(a);//根据这个进行再操作；
                // 如果下单成功，弹框
                if(a.code===0){
                    alert("下单成功");
                    
                }
            };
            fnx16();
            async function fnx161(){
                let id= state16.data.id;//用户的id；
                let arr=JSON.stringify(state16.arr);//把它变成字符串；
                let a= await fetch('http://localhost/add?act=addtocart&id='+id+'&shopping='+arr)
                .then(d=>d.json());
                console.log(a);//根据这个进行再操作；
                // 如果下单成功，弹框
                if(a.code===0){
                    // alert("返回成功");
                    
                }
            };
            fnx161();
            console.log(state16.cleararr);
            return state16;
        case ADDRESSFN:
            // console.log("进入arss");
            let state17 = JSON.parse(JSON.stringify(state));
            if(state17.addressdisplay==="none"){
                state17.addressdisplay="flex";
            }else{
                state17.addressdisplay="none";
            }
            return state17;
        case SAVESDDRESS:
            let {obj:addressobj}=action;
            // console.log("进入arss");
            let state18 = JSON.parse(JSON.stringify(state));
            // let 
            state18.addressarr.push(addressobj);
            async function fnx18(){
                let id= state18.data.id;//用户的id；
                let addressarr=JSON.stringify(state18.addressarr);//把它变成字符串；
                let a= await fetch('http://localhost/address?act=add&id='+id+'&addressarr='+addressarr)
                .then(d=>d.json());
                console.log(a);//根据这个进行再操作；
                // 如果下单成功，弹框 CANCEL
                if(a.code===1){
                    alert("保存成功");
                    
                }
            };
            fnx18();
            return state18;
        case CANCEL:
            let {i}=action;
            console.log(i);
            let state19 = JSON.parse(JSON.stringify(state));
            console.log(state19.orderarr);
            state19.orderarr.splice(i,1);//把splice想象成一种方法
            console.log(state19.orderarr);
           // /order?act=cancel&id=id&cancelarr=cancelobjx  
            async function fnx18(){
                let id= state19.data.id;//用户的id；
                let cancelarr=JSON.stringify(state19.orderarr);//把它变成字符串；
                let a= await fetch('http://localhost/order?act=cancel&id='+id+'&cancelarr='+cancelarr)
                .then(d=>d.json());
                console.log(a);//根据这个进行再操作；
                // {id: "02limit", name: "云米互联网滚筒洗衣机 8kg", title: "云米互联网滚筒洗衣机 8kg", price: 1599, price1: 1699, …}
                // 如果取消订单，弹框 
                if(a.code===0){
                    setTimeout(function(){
                        alert("订单取消成功");
                    },500)
                    
                }
            };
            fnx18();
            return state19;
        default:
            return state;
    }
};
export default reducer;