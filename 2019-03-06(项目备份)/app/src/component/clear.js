import React, { Component } from 'react';
import './clear.css';
import Address from './centercomponentt/address';
import {connect} from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actioncreaters from '../redux/actioncreators';
class Clear extends Component {
    constructor(props) {
        super(props);
        this.state = {  
            allprice:0,//初始值设置为0，总价格
            yf:10,//运费
            yh:30,//优惠
            listDate:[],//商品列表
        };
    };
    componentDidMount(){
        window.scrollTo(0,0);
        let {arr}=this.props;//购物车中的数据{id: "02limit", name: "云米互联网滚筒洗衣机 8kg", title: "云米互联网滚筒洗衣机 8kg", price: 1599, price1: 1699, …}
        //src: "./img/limit-img/limit-img(02)/limit-img.png"
        // console.log(arr);

        //checked: true
        // count: 1
        // guige: []
        // id: "02limit"
        // name: "云米互联网滚筒洗衣机 8kg"
        // price: 1599
        // price1: 1699
        // src: "./img/limit-img/limit-img(02)/limit-img.png"
        // title: "云米互联网滚筒洗衣机 8kg"
        let {listDate}=this.state;//总价格进行累计
        listDate=this.list();
        this.setState({listDate});

    }
    list=()=>{
        let {allprice}=this.state;//总价格进行累计
        let {arr}=this.props;
        let arr1=arr.filter((e)=>e.checked===true);
        console.log(allprice);
        let listx=arr1.map((e,i)=>{
            let{name,src,count,price}=e;
            let srcx=src.replace(/\.\/img\//,'');
            // {price}元×{count};
            let temp=price+"元×"+count;
            let init=price*count;
            console.log(init);
            allprice+=init;
            // console.log(allprice);
            // this.setState({allprice});
            console.log('../img/'+srcx);
            return(
            <div className="good-container clearfix" key={i}>
                <p className="pro-support">
                    <span className="service">
                    </span>
                    <span className="serve">支持7天无理由退货</span>
                </p>
                <span className="img">
                    <img className="" src={require('../img/'+srcx)} />
                    {/* <img className="" src={require('../img/cloth.png')} /> */}
                </span>
                <span className="name">
                    <span className="product-name">
                        {name}
                        {/* 红米6 全网通版 3GB内存 32GB 樱花粉 */}
                    </span>
                </span>
                <span className="price">{temp}</span>
                <span className="total">
                    <span className="">￥</span>
                    <span className="txt">{init}</span>
                </span>
            </div>
            );
        });
        this.setState({allprice});
        // this.setState({allprice});
        return listx
    }
    render() {
        let {allprice,yf,yh,listDate}=this.state;//总价格进行累计
        console.log(allprice);
        let allString=allprice+"元";
        //合计
        if(allprice>100){
            yf=0;
        }
        let sum=allprice+yf-yh;
        let sumSting="￥"+sum;
        console.log(sum);
        return (
        <div id="clearpage">
            <div className="form-item">
                <span className="left-label">收货地址</span>
            </div>
            <Address/>
            
            <div className="moreAddress"><span className="txt">显示更多收货地址</span><a className="m-icons m-icons- m-icons-down1" data-src="" href="javascript:;"></a></div>

            <div className="quick-payment">
                <div className="form-item">
                    <span className="left-label">支付方式</span>
                    <span className="desc">在线支付</span>
                </div>
                <div className="form-item">
                    <span className="left-label">配送方式</span>
                    <span className="desc">快递配送</span>
                </div>
            </div>
    
            <div className="form-item">
                <span className="left-label">送货时间</span>
                <div className="select1">
                    <span className="option-list">
                        <span className="option active">不限送货时间</span>
                        <span className="option ">工作日送货</span>
                        <span className="option ">双休日、假日送货</span>
                    </span>
                </div>
            </div>
    
            <div className="form-invioce-item">
                <div className="form-item no-border">
                    <span className="left-label">发票类型</span>
                    <div className="select1">
                        <div className="option-list"><span className="option active">电子发票</span></div>
                        <div className="form-paper-tips">
                            电子发票与纸质发票具有同样的法律效力，可作为报销、售后、维权凭证，
                            <p className="m-red">使用电子发票、不易丢失、方便环保</p>
                            <p className="use-paper">
                                <a href="javascript:;">使用纸质发票&gt;</a>
                            </p>
                        </div>
                    </div>
                </div>
                <div className="form-item">
                    <span className="left-label">发票抬头</span>
                    <div className="select1">
                        <div className="option-list"><span className="option active">个人</span><span className="option ">企业</span></div>
                    </div>
                </div>
                <div className="form-invoice-pro">
                    <a href="https://home.mi.com/app/shop/content?id=o6448d039aa15c092" rel="noopener noreferrer" target="_blank">常见发票问题&gt;&gt;</a>
                </div>
            </div>
    
            <div className="good-list-title">
                商品信息
                <span className="threshold"></span>
            </div>

            {listDate}

            {/* <div className="good-container clearfix">
                <p className="pro-support">
                    <span className="service">
                    </span>
                    <span className="serve">支持7天无理由退货</span>
                </p>
                <span className="img">
                    <img className="" src={require('../img/cloth.png')} />
                </span>
                <span className="name">
                    <span className="product-name">
                        红米6 全网通版 3GB内存 32GB 樱花粉
                    </span>
                </span>
                <span className="price">729元×1</span>
                <span className="total">
                    <span className="">￥</span>
                    <span className="txt">729</span>
                </span>
            </div> */}

            <div className="moneyCard">
                无可用优惠券
            </div>
            <div className="summery">
                <div className="freeInfo-item">
                    <span className="freeInfo-key">商品总价：</span>
                    <span className="freeInfo-value">{allString}</span>
                </div>
                <div className="freeInfo-item fee-map-item ">
                    <span className="freeInfo-key">运费 ：</span>
                    <span className="freeInfo-value">0.00元</span>
                </div>
                <div className="freeInfo-item">
                    <span className="freeInfo-key">优惠：</span>
                    <span className="freeInfo-value">0.00元</span>
                </div>
                <div className="total">
                    <span className="freeInfo-key">合计：</span>
                    <span className="freeInfo-value">{sumSting}</span>
                </div>
    
    
            </div>
    
            <div className="bottom-pay">
                <a className="m-btns m-btn-middle m-btn-brown">
                    去下单
                </a>
            </div>
    
        </div>            
        );
    }
}
export default connect(state=>state,(dispatch)=>bindActionCreators(actioncreaters,dispatch))(Clear) ;
// export default Clear;