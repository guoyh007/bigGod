import React, { Component } from 'react';
import  {Link} from 'react-router-dom';
import './collect.css';
import {connect} from "react-redux";
import { bindActionCreators } from 'redux';
import * as actioncreaters from '../../redux/actioncreators';
class Collect extends Component {
    constructor(props) {
        super(props);
        this.state = {  };
    };
    componentDidMount(){
        // let {collectArr}=this.props;
        // console.log(collectArr);
        //{id: "02limit", name: "云米互联网滚筒洗衣机 8kg", title: "云米互联网滚筒洗衣机 8kg", price: 1599, price1: 1699, …}src: "./img/limit-img/limit-img(02)/limit-img.png"
        //'../img/'+src
    };    
    list=()=>{
        let {collectArr:arr,collect}=this.props;
        console.log(arr);
       
        // console.log(arr);
        // let {name,src}=arr;
        let list;
        if(arr.length!==0){
            list=arr.map((e,i)=>{
                let {name,src}=e;
                console.log(e);
                {/* /content#class=limit&&id=04limitfather            +"e.pid"*/}
                let path = "/content#class="+"limit"+"&&id=04limitfather";
                let srcx=src.replace(/\.\/img\//,"");
                console.log('../../img/'+srcx);
                return  (
            <div key={i}>
                <section className="mijia-personal-item-box mijia-personal-item-header">
                    <span>收藏日期:2019/01/20 23:21:10</span>
                    <span className="mijia-personal-right mijia-personal-active-font">已收藏</span>
                    </section><section>
                        <div className="mijia-personal-products-box">
                            <div>
                            <div className="mijia-personal-product">
                                <div className="mijia-personal-product-image">
                                    <img className="" src={require('../../img/'+srcx)} />
                                </div>
                            
                                <div className="mijia-personal-product-name-box">
                                    <p>{name}</p>
                                </div>

                                <span                                                      className="mijia-personal-remove-box"
                                    onClick={()=>{
                                        collect(e);//用父级的方法，不但操作reducer还操作了后端；
                                    }}
                                >
                                    <span>取消收藏</span>
                                </span>

                                <span className="mijia-personal-product-refound mijia-personal-right">
                                </span>
                            </div>
                        </div>
                    </div>
                </section>
                <div className="mijia-personal-item-footer">
                    <div className="mijia-personal-button-box">
                    {/* /content#class=limit&&id=04limitfather            */}
                        <Link 
                            to={path}
                            className="m-btns m-btn-sm m-btn-gray"
                        >
                            查看商品       
                        </Link>
                        {/* <a className="m-btns m-btn-sm m-btn-gray" >查看商品</a> */}
                    </div>
                </div>
            </div>
            )
            })
        };
        return list;
    };
    render() {
        return (
        <div className="mijia-personal-main">
           {this.list()}
        </div>
        );
    }
}
export default connect(state=>state,(dispatch)=>bindActionCreators(actioncreaters,dispatch))(Collect) ;