import React, { Component } from 'react';
import Address from './address';
class Detail04 extends Component {
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
                            <div>地址管理</div>
                            <p className="line">
                            </p>
                        </li>
                    </ul>
                </div>
            
                <div className="long-line"></div>
                <Address/>
                {/* <div className="container">
                
                    <div className="addressBox">
                        <div className="mark">默认</div>
                        <div className="content2">
                            <div className="username">郭永恒</div>
                            <div className="tel">186****1093</div>
                            <div className="city">甘肃（兰州市）永登县</div>
                            <div className="address">兰石家属院2栋1单元802</div>
                            <div className="city">730050</div>
                            
                        </div>
                    </div>

                    <div className="addressBox">

                        <div className="btn"></div>
                        <div className="addNew">添加新地址</div>
                    </div>

                </div> */}
            </div> 
        );
    }
}

export default Detail04;