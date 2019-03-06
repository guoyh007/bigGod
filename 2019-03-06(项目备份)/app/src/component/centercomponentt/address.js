import React, { Component } from 'react';
import './address.css';
class Address extends Component {
    constructor(props) {
        super(props);
        this.state = {  };
    }
    render() {
        return (
        <div id="address">
                
            <div className="addressBox active">
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

        </div>           
        );
    }
}

export default Address;