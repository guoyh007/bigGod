import React, { Component } from 'react';
class Detail01 extends Component {
    constructor(props) {
        super(props);
        this.state = {  };
    }
    render() {
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
                    <div className="no-detail">
                        <div className="e-img"></div>
                        <span>没有相应订单数据</span>
                    </div>
                </div>
            </div> 
        );
    }
}

export default Detail01;