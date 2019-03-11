import React, { Component } from 'react';
import {connect} from 'react-redux';
import  {Link,withRouter} from 'react-router-dom';
import './shoppingcar.css';
import { bindActionCreators } from 'redux';
import * as actioncreaters from '../redux/actioncreators';
//引入数据 ，用count，先给state，最后提交的话再给数据库
class Shoppingcar extends Component {
    constructor(props) {
        super(props);//商品总数量：
        this.state = {
            display:"none",
            allnum:0,
          
            j:0,
            // listarr:[],//这个是各种li标签；
        };
    }
    componentDidMount(){
        window.scrollTo(0,0);
    }
    delete=(i)=>{
        let {display,j}=this.state;
        display="block";
        j=i;
        this.setState({display,j});
        // console.log(display,j);
    };
    nodisplay=()=>{
        this.setState({display:"none"});
    };
    //删除数据
    trueDel=()=>{
        let {arr,init,del,toback,tobackobj}=this.props;//这个arr是购物车传过来的 checked是切函数
        let {j,count,allprice}=this.state;
        del(arr[j]);//后端数据发生改变；用reducer中的数据

        // 删除数据，
        let dataArr=arr;
        dataArr=dataArr.filter((e)=>
            e!==dataArr[j]
        );

        //改变购物车总计
        init(dataArr);
        //后端数据发生变化；
        // toback();
        // tobackobj(dataArr);
        
        //隐藏弹框
        this.nodisplay();

        // 价格
        let allprice1=0;
        dataArr.forEach((e)=>{
            count+=e.count;
            if(e.checked){
                allprice1+=e.count*e.price;
            }
        });
        allprice=allprice1;
        // 改变当前数组
        this.setState({count,allprice,dataArr});
        
    };
    add=(i,id)=>{
        console.log("进入add");
        let{add_num,arr}=this.props;//全局下的方法
        let {allprice}=this.state;//当前的价格
        //这个需要当前数组的count，购物车总计+1
        // let {dataArr}=this.state;
        let dataArr=arr;
        console.log(dataArr);//是个空数组 有问题@@@@@@@@@@@@@
        dataArr.find((e)=>{
            if(e.id===id){
                e.count++;
                console.log(e);
                add_num(e);//

            };

        });
        
        //总价格,变化
        let allprice1=0;
        dataArr.forEach((e)=>{
            // count+=e.count;
            if(e.checked){
                allprice1+=e.count*e.price;
            }
        });
        allprice=allprice1;

        this.setState({allprice});
        // this.setState({allprice,dataArr});
        // //每进入一次就增加
        // let {dispatch}=this.props;
    };
    less=(i,id)=>{
        //全局挂在props上的方法
        let{less_num,arr}=this.props;
        let {allprice}=this.state;//当前的价格
        //找到当前商品对应数量，-1
        let dataArr=arr;
        dataArr.find((e)=>{
            if(e.id===id&&e.count>1){
                e.count--;
                //这个需要当前数组的count，购物车总计-1;
                less_num(e);
            };
        });

        //总价格,变化
        let allprice1=0;
        dataArr.forEach((e)=>{
            // count+=e.count;
            if(e.checked){
                allprice1+=e.count*e.price;
            }
        });
        allprice=allprice1;

        this.setState({allprice,dataArr});
    };
    checked=(i)=>{
        let {dataArr,allprice,allchecked}=this.state;
        // console.log(dataArr);
        let {arr,update}=this.props;//这个arr是购物车传过来的 checked是切函数
        dataArr=arr;
        dataArr[i].checked=!dataArr[i].checked;
        update(dataArr);
        console.log(dataArr);
        //总价计算
        let allprice1=0;
        dataArr.forEach((e)=>{
            if(e.checked){
                allprice1+=e.count*e.price;
            };
        });
        //全选判断
        allchecked=dataArr.every((e)=>e.checked===true);
        // console.log(allchecked);
        allprice=allprice1;
        this.setState({dataArr,allprice,allchecked});
    };
    // judgeAll=(ev)=>{//所有的 全选 反选
    //     // prevent default;
    //     let {allchecked,allprice}=this.state;
    //     let {arr}=this.props;
    //     allchecked=!allchecked;
    //     let pricex=0;
    //     arr.forEach((e)=>{
    //         e.checked=allchecked;
    //         if(e.checked){
    //             pricex+=e.count*e.price;
    //         };
    //         allprice=pricex;
    //     })
    //     this.setState({allchecked,allprice});
    //     ev.preventDefault();
    // }
    list=(dataArr)=>{
        return  dataArr.map((e,i)=>{
            let {id,count,price,src,name,checked}=e;
            // console.log(shoppingclass);//有的图片不对
            let allprice =count*price;
            let srcx = src.replace(/\.\/img\//,"");//把g去掉
            return(
                <div className="detail" key={i}>
                    <span 
                        className={checked?"select active":"select"}
                        onClick={()=>{
                            this.checked(i);
                            // this.props.update();
                        }}
                    ></span>
                    <img src={require("../img/"+srcx)} />
                    {/* 这个是商品图片 */}
                    {/* <img src="./img/shopping01.webp" alt=""/> */}
                    <span className="name">
                        {name}
                    </span>
                    <span className="price">
                        ￥{price}
                    </span>
        {/* <!-- 这个是 + - 按钮 --> */}
                    <div className="nums type">
                        <div className=" some">
                            <span 
                                className="less"
                                onClick={()=>{
                                    this.less(i,id);
                                }}
                            ></span>
                        </div>
                        <div className="count-num">
                            {count}
                        </div>
                        <div className=" some">
                            <span 
                                className="add"
                                onClick={()=>{
                                    this.add(i,id);//传入id
                                }}//这个dataobj是此商品的数据；
                            ></span>
                        </div>
                    </div>
            {/*  小计 */} 
                    <div className="count-price all">
                        ￥{allprice}
                    </div>
                    <div 
                        className="delete" 
                        id="del"
                        onClick ={()=>{
                            this.delete(i);
                        }}
                    >
                        <a href="javascript:;"></a>
                    </div>                    
                </div>
                
                );
        });
        // this.setState({listarr});
        
    };
    //提示：购物车还没有添加商品，请选择商品
    reminder=()=>{
        alert("请选择商品!!!");
    }
    render(){
        let {display,allnum}=this.state;

        let {arr,shoppingNum,negation,allprice,allchecked}=this.props;
        // let allcheckedstate= false;
        if(arr.every((e)=>e.checked===true)){
            allchecked=true;//全选的状态
        };
        //每次进入都计算价格；
        if(arr.length!==0){
            arr.forEach((e)=>{
                if(e.checked){
                    allprice+=e.count*e.price;
                };
            });
        }

        // console.log(allchecked);
        let arrx=this.list(arr);
        console.log(arrx);
        return (
        <div>
            <div id="shopping">
            <hr/>
            <div className="content">
                    <div className="nav">
                        <span>
                            <Link
                                to="/"
                            >首页</Link>
                        </span>
                        &nbsp;>&nbsp;
                        <span>
                            <a href="./index.html">购物车</a>
                        </span>
                    </div>

                    <div className="title" style={{display:arr.length!==0?"flex":"none"}}>
                        <span 
                            className={allchecked?"select active":"select"}
                            onClick={negation}
                        ></span>
                        <span>全选</span>
                        <span>商品信息</span>
                        <span>单价</span>
                        <span>数量</span>
                        <span>金额</span>
                        <span>操作</span>
                    </div>

                    <div className="big-block" style={{display:arr.length!==0?"block":"none"}}>
        {/* 这个是title   style={{display:allprice>500?"flex":"none"} */}
                        <div className="header" style={{}}>
                            {/* <span className="select"></span>
                            <span>小米</span> */}
                            <img src="" alt="" className="pic"/>
                            {/* <!-- <span className="pic"></span> --> */}
                            <span className="free-shipping">{allprice>500?"已免运费":"满500将免运费"}</span>
                        </div>
        {/* 这个是商品详情 */}
                        <div className="detail-box">  
                            {/* {this.list(dataArr,listarr)} */}
                            {arrx}
                        </div>
                        


                    </div>

        {/* <!-- 这里开始是总计价格 --> */}
                    <div id="init" style={{display:arr.length!==0?"flex":"none"}}>
                        <div>
                            <span 
                                className={allchecked?"select active":"select"}
                                onClick={negation}
                            ></span>
                            <span>全选</span>
                            <span className="selected">
                                已选<span>{allnum}</span>件
                            </span>
                        </div>

                        <div className="c-price">
                            <span>合计：</span>
                            <span id="all-price" className="all">￥      {allprice}
                            </span>
                            {/* <Link
                                to='/clear'
                            >  
                                <span>去结算</span>
                            </Link> */}
                            
                            {allprice===0?
                            <a 
                                onClick={this.reminder}
                            >
                                <span>去结算</span>
                            </a>:
                            <Link
                                to='/clear'
                            >  
                                <span>去结算</span>
                            </Link>}
                        </div> 

                    </div>

        {/* 这个是没有商品的时候显示的图片 */}
                    <div 
                        className="no-cart" 
                        style={{display:arr.length!==0?"none":"block"}}
                    >
                        <div className="e-img"></div>
                        <p className="e-info">购物车还是空的</p>
                        <Link to="/">
                            <div className="btn">继续逛</div>
                        </Link>
                    </div>

            </div>
                    
                
            </div>

            {/* <!-- 确认删除对话框 --> */}
            <div id="ensure" style={{display:display}}>
                <div className="ensure-box">
                    <div className="delete">
                        <a
                            href="javascript:;" 
                            onClick={this.nodisplay}
                        ></a>
                    </div>
                    <p>确定要删除吗？</p>
                    <div className="button">
                        <div 
                            className="active"
                            onClick={()=>{
                                this.trueDel();
                            }}

                        >确定</div>
                        <div 
                            className="cancal"
                            onClick={this.nodisplay}
                        >取消</div>
                    </div>
                </div>
            </div>
        </div>
        );
    }
}

export default connect((state)=>state,(dispatch)=>bindActionCreators(actioncreaters,dispatch))(Shoppingcar);
