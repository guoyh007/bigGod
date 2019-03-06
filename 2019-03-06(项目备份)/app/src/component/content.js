import React, { Component } from 'react';
import {connect} from "react-redux";
import {Link} from 'react-router-dom';
// import {Router,Link} from 'react-router-dom';
import {bindActionCreators} from "redux";//这里需要注意；
// import {NavLink} from 'react-router-dom';
import * as actioncreaters from '../redux/actioncreators';
import './content.css';
//引入数据
import data from "../data/data";
class Content extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            dataObj:{},//把传过来的数据储存起来
            bigpicture:[],//左边的大图
            num:1,//这个是买的数量，
            checkednum:0,
            classnum:-1,
            price:149,//切的价格
            allcheck:false,//所有的选项是否选上，false不能加入购物车，true能
            activenum:0,//nav 产品介绍免得
            picArr:[],//图片的数组
            guigeArr:[],//用于所有选项的判断，里边有数据false
            id:'',//这个是存起来的id，用来放入购物车，可以用arr
            dataArr:{},//这个先不用
            pathClass:''
        };
    };
    componentWillMount(){
        let {guigeArr,allcheck,id,dataObj,pathClass,dataArr}=this.state;

        let path=window.location.hash.split("#")[1].split("&&")[0].split("=")[1];
        let pid=window.location.hash.split("#")[1].split("&&")[1].split("=")[1];
        pathClass=path;//将类名和id都写上；
        id=pid;
        this.setState({pathClass,id});
        dataObj=data[pathClass].find((e)=>e.id===id);
        console.log(dataObj);
        guigeArr=dataObj.guige.map(()=>{
            return false;
        });
        console.log(guigeArr);
        console.log(dataObj.guige);
        //此行是为了解决开始图片不出现的问题；
        if(guigeArr.length===0){
            allcheck=true;
            dataArr=dataObj.detail[0];
            dataArr.checked=true;
            dataArr.src=dataObj.img[0].src;
        }
        this.setState({dataObj,guigeArr,dataArr,allcheck});
    }
    componentDidMount(){
        //刷新页面的时候往后台传数据
        let {toback}=this.props;
        toback();//往后台传数据；

        console.log("组件加载did");
        this.click01(0);

        let {price,dataObj}=this.state;
        this.click03(0);

        let {name,detail:dArr}=dataObj;
        // // let {name,detail:dArr}=data[pathClass][0];//结构赋值 pathClass 也是变量  0是个变量；
        // console.log(dArr);
       
        let detail = document.getElementById('detail');
        let lis= Array.from(detail.getElementsByTagName('li'));
        console.log(lis)
        let namelist = document.getElementById('namelist');
        let pricebox=document.getElementById('pricebox');
        // console.log(pricebox);
        //只有一种规格的时候
        detail.onclick=(ev)=>{
            lis.forEach((e,i)=>{
                if(ev.target===e){
                    // console.log(i);
                    price=Number(dArr[i].price);
                    this.setState({price});
                    pricebox.innerHTML=this.state.price;
                    // console.log(this.state);
                }
            })
            //只有一种规格的时候
            if(ev.target.nodeName==="LI"&&dArr[0].guige.length===1){
                //清除样式
                let Arr=Array.from(ev.target.parentNode.children);
                // console.log(Arr);
                Arr.forEach((e)=>{
                    e.className="";
                });
                ev.target.className = 'active';//点击哪个哪个变为激活状态
                // console.log(namelist);
                // console.log(namelist.children);
                let Arr2 = Array.from(namelist.children);
                Arr2.forEach((e,i)=>{
                    e.innerHTML = name+ev.target.innerHTML; //最开始的名字加上 
                    // this.setState({price});
                });

            }
           
       };
       this.setState({price});
       window.scrollTo(0,0);
    }
    // componentDidUpdate(){
    //     console.log("updata");
    //     let {toback}=this.props;
    //     toback();//往后台传数据；
    // }
    // componentWillReceiveProps(){
    //     console.log("xiezai11111");
    //     let {toback}=this.props;
    //     toback();//往后台传数据；
    // }
    //详情页卸载，数据给后端；
    // componentWillUnmount(){
    //     // console.log("xiezai11111");
    //     let {toback}=this.props;
    //     toback();//往后台传数据；
    // }
    add=()=>{
        let {num}=this.state;
        num++;
        this.setState({num});
    };
    less=()=>{
        let {num}=this.state;
        num--;
        if(num>=1){
            this.setState({num});
        }else{
            this.setState({num:1});
        }
    };
    //大图的渲染；
    click01=(i)=>{
        let {checkednum,dataObj,bigpicture}=this.state;
        // console.log(dataObj);
        checkednum=i;
        let srcx=dataObj.img[0].big[i].replace(/\.\/img\//,'');
        // console.log("../img/"+srcx);
        bigpicture[0]= <img
                        src={require("../img/"+srcx)}
                        key={i}
                    />
        this.setState({checkednum,bigpicture});
    }
    //点击类型
    click02=(i)=>{
        let {classnum} = this.state;
        classnum=i;
        this.setState({classnum});
    }
    //点击 图片渲染和切换；产品说明,产品参数
    click03=(i)=>{
        let {activenum,picArr,dataObj}=this.state;
        activenum=i;
        let nowNum=+new Date;
        //图片的循环
        let obj = dataObj.introduce[i];//这里是个图片的数组 i 是0的话 显示产品介绍  1的话显示常见问题;
        // let obj = data[pathClass][0].introduce[i];//这里是个图片的数组 i 是0的话 显示产品介绍  1的话显示常见问题;
        // console.log(obj);
        let temp = obj.picture.map((e,j)=>{
            let src=e.replace(/\.\/img\//,'');
            console.log(src);
            try {
                // console.log('图片加载成功');
                return(
                    <img
                        className="icimg"
                        src={require("../img/"+src)}
                        key={j}
                    />
                )
            } catch (error) {
                nowNum+=1;//为了让两个key值不同；
                return(
                    <img
                        className="icimg"
                        src={require("../img/图片加载失败.jpg")}
                        key={nowNum}
                    />
                )
            }
        });
        picArr=temp;
        this.setState({picArr,activenum});
        // console.log("过个");
    }
    //产品介绍，nav
    nav=()=>{
        let {activenum,pathClass}=this.state;
        let arr = data[pathClass][0].introduce;//0是变量
        // console.log(arr);
        let temp = arr.map((e,i)=>{
            return(
            // <NavLink to='/'>
                <li 
                    key={i}
                    className={i===activenum?"active":""}
                    onClick={()=>{
                        this.click03(i);
                    }}
                >{e.name}</li>
            // </NavLink>
               
            )
        })
        return temp;
    };
    //名字函数
    render1=()=>{
        let {pathClass,dataObj}=this.state;
        let {name}=dataObj;//结构赋值 0是个变量；
        return (
            <div className="name-list" id="namelist">
                <p>
                    {name}
                </p>
                <p>
                    {name}
                </p>
            </div>
        )
    };
    //服务卡  售价 服务这一行
    render2=()=>{
        let {pathClass,dataObj}=this.state;
        let {name,price,serve,img}=dataObj;//结构赋值 0是个变量；
        return (
            <div className="price-box" >
                 <span >售价</span>
                <div>
                    <span className="price unit">¥</span>
                    <span className="price" id="pricebox">
                        {price}
                    </span>
                </div>
            </div>
        )
    };
    // 服务卡
    render3=()=>{
        let {pathClass,dataObj}=this.state;
        let {serve}=dataObj//结构赋值 0是个变量；
        let arr = serve;
        let temp = arr.map((e,i)=>{
            return(
                <p key={i}>
                    {e.checked?<img src={require("../img/对号.png")} />:<img src={require("../img/警示.png")} />}
                    {e.serve}
                </p>
            )
        })
        return (
            temp
        );
    };

    //判断是否把所有的规格都选上,allcheck变为true；
    judgeAll=()=>{
        let {guigeArr,allcheck}=this.state;
        // console.log(guigeArr);
        // if(guigeArr.length===0){

        // }
        console.log(allcheck);
        // console.log(guigeArr.length===0);
        if(guigeArr.length!==0){
            //所有的是不是都是true
            let attr=guigeArr.every((e)=>
                e===true
            );
            console.log(attr);
            if(attr){
                allcheck=true;//此时可以点击加入购物车了
            }else{
                allcheck=false;
            }
        }else{
            allcheck=true;//如果数组是[],则让全选状态变为true；
        };
        this.setState({guigeArr,allcheck});
        // console.log(allcheck);
    };
    findID=(i)=>{
        let {pathClass,dataObj}=this.state;
        // let {detail:arr,img}=data[pathClass][1];//0可以变量dataObj
        let {detail:arr,img}=dataObj;//0可以变量
        let {id,dataArr}=this.state;
        id=arr[i].id;//
        dataArr=arr[i];//往数组里边添加数据
        dataArr.checked=true;//添加check属性
        dataArr.src=img[0].src;//这个0是固定的
        // console.log(dataArr);//还需要往数组里加一个 count 是购买的数量
        this.setState({id,dataArr});
    }
    //规格一行的渲染
    render4=()=>{
        // if(){}
        let {pathClass,dataObj}=this.state;
        // console.log(dataObj);
        let {detail:arr,guige:arr2}=dataObj;//要改的地方
        let {classnum,guigeArr,id}=this.state;
        // console.log(guigeArr);// [数量]
        let renderx=(j)=>{
            let temp1 =arr.map((e,i)=>{
                console.log(j);
                let name = e.guige[j].name;
                // console.log(name);
                return(
                    <li 
                        key={i}
                        className={i===classnum?"active":''}
                        onClick={()=>{
                            guigeArr[j]=true;
                            this.setState({guigeArr});
                            this.judgeAll();//加一行判断
                            //找对应的id;
                            this.findID(i)//根据索引找id
                        }}
                    >{name}</li>
                ); 
            });
            return temp1;
        };
        // console.log(arr2);
        let temp ="";
        if(arr2.length!==0){
            temp = arr2.map((e,j)=>{// [数量]
                // guigeArr.push(false);//两种规格
                // console.log(j);
                return(
                    <div className="name-box" key={j}>
                        <span>{arr2[j]}</span>
                        <ul 
                            className="type"
                        >
                            {renderx(j)}
                        </ul>
                    </div>   
                )
            });
        }else{
            temp="";
        }
        // console.log(guigeArr);
        // let guigeArr=guigeArr;
        return (
            <div className="sale-detail" id="detail">
                {temp}
            </div>
        );
    };
    smallpic = () =>{
        let {checkednum,dataObj}=this.state;
        // let arr = data[pathClass][0].img[1].small; //0 是变量 small也是变量 0可以用forEach
        // console.log(dataObj);
        let arr = dataObj.img[1].small; //0 是变量 small也是变量 0可以用forEach
        // console.log(arr);
        let temp =arr.map((e,i)=>{
            let src = e;
            // ../img/food-img/food-img(01)/small-img/small-img01.webp
            // let srcx=src.replace(/\.\/img\/food-img\//g,"");
            let srcx=src.replace(/\.\/img\//,"");
            // console.log('../img/'+srcx);
            // console.log(srcx);
            return(
                <li 
                    key={i}
                    className={i==checkednum?"active":""}
                    onClick={()=>{
                        this.click01(i);
                    }}
                >
                    {/* 这里的food 也可以拼接 */}
                    <img src={require('../img/'+srcx)} />
                </li>
            )
        });
        return temp;
    };
    //渲染大图 checkednum
    bigpic=(i)=>{
        let {pathClass,dataObj,bigpicture}=this.state;
        // console.log(dataObj);
        // console.log(data[pathClass][0]);
        let {name,price,serve,img}=data[pathClass][0];//结构赋值 0是个变量；
        // let {name,price,serve,img}=dataObj;//结构赋值 0是个变量；
        let {big}=img[0];//1是代表小图
        let bigPictureArr=big;
        //这个是food下边的渲染
        let src = bigPictureArr[i];
        // console.log(src);// ./img/food-img/food-img(01)/small-img/small-img01.webp   "../img/food-img/food-img(01)/big-img/big-img0"+i+1+".webp"
        let srcx=src.replace(/\.\/img\//,"");
        // console.log("../img/"+srcx);
        bigpicture[0]=<img src={require("../img/"+srcx)} />;
        this.setState({bigpicture});
        return<img src={require("../img/"+srcx)} />
    }
    render() {
        let {num,bigpicture,picArr,allcheck,dataArr,pathClass}=this.state;

        let {addToCart,collect,}=this.props;
        // this.click03(0);
        // let {name}=data[pathClass][0];//结构赋值 0是个变量；
        //这个是来渲染小图的 ,allcheck来控制是否能点击；
        return (
        <div id="content"> 
             <div className="c-box">
                {/* <!-- 图片类 --> */}
                <div className="img-container">
                    <div id="picbox1">
                        {bigpicture}
                        {/* <img src={require("../img/food-img/food-img(01)/big-img/big-img01.webp")} /> */}
                    </div>
                    {/* <!-- 轮播小图的 集合 --> */}
                    <div className="banner-box" >
                        <ul id="picbox2">
                            {/* 这个是要写函数的 */}
                            {/* <li className="active">
                                <img src={require('../img/food-img/food-img(01)/small-img/small-img01.webp')} />
                            </li> */}
                            { this.smallpic(this.click1) }
                        </ul>
                    </div>

                </div>
                {/* <!-- 文字类 --> */}
                <div className="name-container">
                    {this.render1()}
                    {/* <div className="name-list" id="namelist">
                        <!-- <p>初辰新鲜冷冻年货海鲜礼盒/礼券
                        </p>
                        <p>
                            当季捕捞，鲜活船冻，纯净海域，源头直供
                        </p> -->
                    </div> */}
                    <div className="card">
                        {this.render2()}
                        {/* <div className="price-box" id="pricebox">
                            <!-- <span>售价</span>
                            <div>
                                <span className="price unit">¥</span>
                                <span className="price">
                                    199
                                </span>
                            </div> -->
                        </div> */}
                        <div className="serve-box">
                            <span>
                                服务
                                <img src="./img/感叹号.png" alt=""/>
                            </span>
                            <div className="serve" id="servecontent">
                                {this.render3()}
                                {/* <!-- <p>
                                    <img src="./img/对号.png" alt="">
                                    本产品为有品第三方商品
                                </p>
                                <p>
                                    <img src="./img/对号.png" alt="">
                                    由 上海虞瑞贸易有限公司 发货并提供售后(查看商家资质)
                                </p>
                                <p>
                                    <img src="./img/对号.png" alt="">
                                    <img src="./img/警示.png" alt="">
                                    不支持7天无理由退货
                                </p> --> */}
                            </div>
                        </div>
                    </div>

                    <div className="sale-detail" id="detail">
                        {this.render4()}
                            {/* <div className="name-box">
                            <span>类型</span>
                            <ul className="type">
                                <li>1瓶</li>
                                <li>2瓶</li>
                                <li>6瓶</li>
                                <li>礼盒</li>
                            </ul>
                        </div>   
                        */}
                    </div>


                    {/* <!-- 数量 count --> */}
                    <div className="count">
                        <span>数量</span>
                        <div className="nums type">
                            <div 
                                className="some"
                                onClick = {()=>{
                                    //如果所有的规格都被选上了
                                    console.log(allcheck);
                                    if(allcheck){
                                        this.less();
                                    }
                                }}
                            >
                                <span className="less"></span>
                            </div>
                            <div className="count-num">
                                {num}
                            </div>
                            <div 
                                className="some" 
                                onClick = {()=>{
                                    this.judgeAll();//运行全选判断函数
                                    // console.log(allcheck);
                                    if(allcheck){
                                        this.add();//
                                    }
                                }}
                            >
                                <span className="add"></span>
                            </div>
                        </div>
                    </div>

                    {/* <!-- 按钮 --> */}
                    <div className="button-box">
                        <Link to='/shopping'>
                            <div 
                                className="button"
                                onClick={()=>{
                                    //往对象里边加count,表示买的数量
                                    dataArr.count=num;
                                    dataArr.class=pathClass;
                                    this.setState({dataArr});
                                    // console.log(this.state.dataArr);
                                    addToCart(dataArr);//这个里边放一个对象就行,放的是添加的购物车信息 并且往后端传数据；
                                   
                                }}
                            >立即购买</div>
                        </Link>
                        <div 
                            className="button active"
                            onClick={()=>{
                                //往对象里边加count,表示买的数量
                                dataArr.count=num;
                                dataArr.class=pathClass;
                                this.setState({dataArr});
                                // console.log(this.state.dataArr);
                                addToCart(dataArr);//这个里边放一个对象就行,放的是添加的购物车信息
                            }}
                        >加入购物车</div>
                        <div 
                            className="box1"
                            onClick={()=>{
                                collect(dataArr);
                            }}
                        >
                            <img src={require("../img/收藏.png")} />
                            <p>收藏</p>
                        </div>
                        <div className="box1">
                            <img src={require("../img/serve01.png")}/>
                            <p>客服</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* <!-- 这个是详情 --> */}
            <div className="detail">
                <div className="title" >
                    <ul id="titlebox">
                        {this.nav()}
                        {/* <!-- <li>产品介绍</li>
                        <li>评论</li>
                        <li>常见问题</li>
                        <li>检测报告</li> --> */}
                    </ul>
                    {/* <div 
                        className="active" 
                        id="active"
                        style={{marginleft: 128*checkednum+"px"}}
                    ></div> */}
                </div >  
                {/* <!-- 下边是 详情大图 -->*/}
                <div className="img-container" id="imgcontainer">
                    {/* 图片加载失败就用这个图片 */}
                    {/* <img
                        src={require("../img/图片加载失败.jpg")}
                        key={999}
                    /> */}
                    {/* 产品图片  常见问题 */}
                    {picArr}
                    {/* {this.click03(0)} */}
                </div>      
            </div>
        </div> 
        );
    }
}

export default connect((state)=>state,(dispatch)=>bindActionCreators(actioncreaters,dispatch))(Content);