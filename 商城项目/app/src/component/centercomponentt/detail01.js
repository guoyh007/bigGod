import React, { Component } from 'react';
import {connect} from "react-redux";
import { bindActionCreators } from 'redux';
import * as actioncreaters from '../../redux/actioncreators';
import Order from "./order";
class Detail01 extends Component {
    constructor(props) {
        super(props);
        this.state = {  };
    }
    render() {
        let {orderarr}=this.props;
        let display="block";
        if(orderarr.length!==0){
            display="none";
        }
        return (
            <div className="detail">
                <div className="title">
                    <ul>
                        <li className="active">
                            <div>待收货(0)</div>
                            <p className="line">
                            </p>
                        </li>
                        <li>
                            <div>待付款(0)</div>
                            <p className="line"></p>
                            
                        </li>
                        <li>
                            <div>已收货</div>
                            <p className="line"></p>
                        </li>
                        <li>
                            <div>退款订单</div>
                            <p className="line"></p>
                        </li> 
                        <li>
                            <div>全部订单</div>
                            <p className="line"></p>
                        </li> 
                    </ul>
                    <div className="recycle">
                        <span className="delete"></span>
                        <span>回收站</span>
                    </div>
                </div>
            
                <div className="long-line"></div>

                <div className="big-detail">
                    <Order/>

                    <div className="no-detail" style={{display:display}}>
                        <div className="e-img"></div>
                        <span>没有相应订单数据</span>
                    </div>
                </div>
            </div> 
        );
    }
}
export default connect(state=>state,(dispatch)=>bindActionCreators(actioncreaters,dispatch))(Detail01);
// export default Detail01;