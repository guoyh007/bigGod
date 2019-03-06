let obj={
    data:{},//把登录后，传过来的数据存起来
    loginState:false,//是否是登录状态
    username:"未登录...",//用户名
    shoppingNum:0,//这个是购物车里边商品的的总数量,初始值需要Didmount
    arr:[],//购物车数据的数组,开始我用[{id，num}]
    id:"",//这个id应该是请求过来的
    display:"hidden",//这个是弹框是否弹出
    collectArr:[],//这个是收藏
};

const ADDTOCART="ADDTOCART";
const ADD_NUM="ADD_NUM";
const LESS_NUM="LESS_NUM";
const INIT="INIT"; 
const SHOW="SHOW"; 
const STAR="STAR";
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
        case LOGINOUT://退出登录后，购物车总计归零，数组为0，
            let state8 = JSON.parse(JSON.stringify(state));
            state8.loginState=false;
            state8.shoppingNum=0;
            state8.arr=[];
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
                console.log(a);
            };
            fn09();
            return state9;
        case GETDATE://登录，存数据；前边已经写了fetch，
            let {obj}=action;
            let state10 = JSON.parse(JSON.stringify(state));
            state10.data=obj;//这个是总数据；
            // console.log(obj.othername);
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

        case UPDATE://更新购物车的数据；
            let {updatearr}=action;
            let state12 = JSON.parse(JSON.stringify(state));
            state12.arr=updatearr;
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
            console.log("进入后端");
            let state14 = JSON.parse(JSON.stringify(state));
            // let {obj14}=action;
            // let arrx2=JSON.stringify(tobackobj);//把它变成字符串；
            // let id02= state14.data.id;
            // // console.log(id02); 
            // //往后端传数据；用id去找   arr1
            // async function fnx2(){
            //    let a= await fetch('http://localhost/add?act=addtocart&id='+id02+'&shopping='+arrx2)
            //     .then(d=>d.json());
            //     console.log(a);
            // };
            // fnx2();
            return state14;
       

        default:
            return state;
    }
};
export default reducer;