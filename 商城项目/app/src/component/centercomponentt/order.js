import React, { Component } from 'react';
import {connect} from "react-redux";
import { bindActionCreators } from 'redux';
import * as actioncreaters from '../../redux/actioncreators';
class Order extends Component {
    constructor(props) {
        super(props);
        this.state = {  
            listarr:[],//这个是空数组，来接收父redux的数据
        };
    };
    componentDidMount(){
        let{listarr}=this.state;
        // let {orderarr:arr,cancel}=this.props;
        listarr=this.list();
        console.log(this.props);
        this.setState({listarr});
    };    
    list=()=>{
        let {orderarr:arr,cancel}=this.props;
        // let {name,src}=arr;
        console.log(this.props);
        let list;
        if(arr){
            list=arr.map((e,i)=>{
                let {name,src}=e;
                // console.log(src,e);
                let srcx=src.replace(/\.\/img\//,"");
                // console.log('../../img/'+srcx);
                return  (
            <div key={i}>
                <section className="mijia-personal-item-box mijia-personal-item-header">
                    <span>订单号:2019/01/20 23:21:10</span>
                    <span className="mijia-personal-right mijia-personal-active-font">已购买</span>
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
                                        //这里应该放取消订单
                                        cancel(i);//删除的是第几个；
                                        // collect(e);//用父级的方法，不但操作reducer还操作了后端；
                                    }}
                                >
                                    <span>取消订单</span>
                                </span>

                                <span className="mijia-personal-product-refound mijia-personal-right">
                                </span>
                            </div>
                        </div>
                    </div>
                </section>
                <div className="mijia-personal-item-footer">
                    <div className="mijia-personal-button-box">
                        <a className="m-btns m-btn-sm m-btn-gray" href="/detail?gid=105149">查看商品</a>
                    </div>
                </div>
            </div>
            )
            })
        };
        // this.setState({})
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
export default connect(state=>state,(dispatch)=>bindActionCreators(actioncreaters,dispatch))(Order);