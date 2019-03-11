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
const TOBACKOBJ="tobackobj";//无脑操作，将前台的数据给后端,这个是删除操作；
const UPDATE="update";//更新购物车的数据
const DEL="del";//删除某一项judgeAll
const NEGATION="negation";//取反
const CLEAR="clear";//下单清算
const ADDRESSFN ="addressfn";//点击添加地址，出现盒子
const SAVESDDRESS ="saveaddress";//点击添加地址，出现盒子
const CANCEL ="cancel";//取消订单 cancellation of order

export function cancel(i){
    return {
        type:CANCEL,
        i
    }
}
export function saveaddress(obj){
    return {
        type:SAVESDDRESS,
        obj
    }
}
export function addressfn(){
    return {
        type:ADDRESSFN
    }
}
export function clear(listDate){
    return {
        type:CLEAR,
        listDate
    }
}
export function negation(arr){
    return {
        type:NEGATION,
        arr
    }
}
export function del(obj){//删除购物车某一项；
    return {
        type:DEL,
        obj
    }
}
export function update(updatearr){
    //添加数据，用了id
    return {
        type:UPDATE,
        updatearr
    }
}
export function tobackobj(tobackobj){
    //添加数据，用了id
    return {
        type:TOBACKOBJ,
        tobackobj
    }
}
export function toback(){
    //添加数据，用了id
    return {
        type:TOBACK,
        // arr
    }
}
export function getdata(obj){
    //添加数据，用了id
    return {
        type:GETDATE,
        obj
    }
}
export function addToCart(dataObj){
    //添加数据，用了id
    return {
        type:ADDTOCART,
        dataObj
    }
}
export function add_num(dataobj){
    //购物车++，总数变化
    return {
        type:ADD_NUM,
        dataobj
    }
}
export function less_num(dataobj){
    //购物车++，总数变化
    return {
        type:LESS_NUM,
        dataobj
    }
}
//其实这个可以用在很多地方，来替代之前用的代码；实现重复利用；
export function init(arr){//arr是过滤之后的数据
    //购物车总数变化
    return {
        type:INIT,
        arr//这是当删除或增加的时候，每个商品的数量
    }
}
//点击后登录会显示一个页面
export function show(){
    //购物车++，总数变化
    return {
        type:SHOW,
    }
}
//页面消失
export function hidden(){
    //购物车++，总数变化
    return {
        type:HIEDDEN,
    }
}
//登录成功
export function login(){
    //购物车++，总数变化
    return {
        type:LOGIN,
    }
}
//退出登录
export function loginout(){
    //购物车++，总数变化
    return {
        type:LOGINOUT,
    }
};
//收藏
export function collect(dataObj09){
    //添加数据，用了id
    return {
        type:COLLECT,
        dataObj09
    }
}