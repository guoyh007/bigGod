import React, { Component } from 'react';
import {connect} from 'react-redux';
import  {Link} from 'react-router-dom';
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
            allprice:0,//这个是data传进来的数据
            dataArr:[],//假装是获取到的数据
            allchecked:false,//全选
            j:0,
            // listarr:[],//这个是各种li标签；
        };
    }
    componentDidMount(){
        let {arr,loginState}=this.props;//这个arr是购物车传过来的 checked是切函数
        let {count,allprice,dataArr,listarr}=this.state;
        dataArr=arr;
        this.setState({dataArr});//先存起来；
        // this.list();//将购物车数据进行渲染；
        console.log(loginState);
        // //不是登录状态，购物车什么都不显示；
        // if(!loginState){//false
        //     dataArr=[];
        // }
        //刚进入的时候 ，页面的总计价格数据；
        let allprice1=0;
        dataArr.forEach((e)=>{
            if(e.checked){
                allprice1+=e.count*e.price;
            }
        })
        // this.list(dataArr,listarr);//将购物车数据进行渲染；

        console.log(dataArr);
        allprice=allprice1;
        this.setState({count,allprice,listarr});
    };
    delete=(i)=>{
        let {display,j,dataArr}=this.state;
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
        let {dataArr,j,count,allprice}=this.state;
        // 删除数据，
        dataArr=dataArr.filter((e)=>
            e!==dataArr[j]
        );

        //改变购物车总计
        let {init,toback,tobackobj}=this.props;
        init(dataArr);
        //后端数据发生变化；
        // toback();
        tobackobj(dataArr);

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
        // console.log(this.props,i,id);
        let{addInit}=this.props;//全局下的方法
        let {allprice}=this.state;//当前的价格
        //这个需要当前数组的count，购物车总计+1
        addInit();
       
        //找到当前商品对应数量，+1
        let {dataArr}=this.state;
        dataArr.find((e)=>{
            if(e.id===id){
                e.count++;
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
        // //每进入一次就增加
        // let {dispatch}=this.props;
        // dispatch({type:"ADD_NUM"});
    };
    less=(i,id)=>{
        //全局挂在props上的方法
        let{lessInit}=this.props;
        let {allprice}=this.state;//当前的价格
        
        //找到当前商品对应数量，-1
        let {dataArr}=this.state;
        dataArr.find((e)=>{
            if(e.id===id&&e.count>1){
                e.count--;
                //这个需要当前数组的count，购物车总计-1;
                lessInit();
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
        console.log(dataArr);
        dataArr[i].checked=!dataArr[i].checked;
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
    allchecked=(e)=>{
        // prevent default;
        let {allchecked,dataArr,allprice}=this.state;
        allchecked=!allchecked;
        let pricex=0;
        dataArr.forEach((e)=>{
            e.checked=allchecked;
            if(e.checked){
                pricex+=e.count*e.price;
            };
            allprice=pricex;
        })
        this.setState({allchecked,dataArr,allprice});
        console.log(e);
        
        e.preventDefault();
    }
    list=(dataArr)=>{
        // let {dataArr,listarr}=this.state;
        console.log(dataArr);
        return  dataArr.map((e,i)=>{
            let {id,count,price,src,name,checked}=e;
            console.log(checked);//有的图片不对
            let allprice =count*price;
            let srcx = src.replace(/\.\/img\//,"");//把g去掉
            return(
                <div className="detail" key={i}>
                    <span 
                        className={checked?"select active":"select"}
                        onClick={()=>{
                            this.checked(i)
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
                                }}
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

    render() {
        let {arr,loginState}=this.props;//这个arr是购物车传过来的 checked是切函数
        // let {count,allprice,dataArr,listarr}=this.state;
        let {display,allnum,allprice,allchecked,listarr,dataArr}=this.state;
        // dataArr=arr;
        let {shoppingNum}=this.props;
        // console.log(listarr);
        let arrx=this.list(arr);
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

                    <div className="title" style={{display:shoppingNum!==0?"flex":"none"}}>
                        <span 
                            className={allchecked?"select active":"select"}
                            onClick={this.allchecked}
                        ></span>
                        <span>全选</span>
                        <span>商品信息</span>
                        <span>单价</span>
                        <span>数量</span>
                        <span>金额</span>
                        <span>操作</span>
                    </div>

                    <div className="big-block" style={{display:shoppingNum!==0?"block":"none"}}>
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
                    <div id="init" style={{display:shoppingNum!==0?"flex":"none"}}>
                        <div>
                            <span 
                                className={allchecked?"select active":"select"}
                                onClick={this.allchecked}
                            ></span>
                            <span>全选</span>
                            <span className="selected">
                                已选<span>{allnum}</span>件
                            </span>
                        </div>

                        <div className="c-price">
                            <span>合计：</span>
                            <span id="all-price" className="all">￥{allprice}</span>
                            <Link
                                to='/clear'
                            >  
                                <span>去结算</span>
                            </Link>
                            
                        </div> 

                    </div>

        {/* 这个是没有商品的时候显示的图片 */}
                    <div 
                        className="no-cart" 
                        style={{display:shoppingNum!==0?"none":"block"}}
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
