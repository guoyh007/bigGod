import React, { Component } from 'react';
import {connect} from "react-redux";
import { bindActionCreators } from 'redux';
import * as actioncreaters from "../../redux/actioncreators";
import './address.css';
class Address extends Component {
    constructor(props) {
        super(props);
        this.state = {  };
    }
    list=(addressarr)=>{
        // let {addressarr}=this.props;
        return(
            addressarr.map((e,i)=>{
              return(
            <div 
                className={i===0?"addressBox active":"addressBox"}
                key={i}
            >
                <div className={i===0?"mark":"nomark"}>{i===0?"默认":""}</div>
                <div className="content2">
                    <div className="username">{e.name}</div>
                    <div className="tel">{e.telephone}</div>
                    {/* <div className="city">甘肃（兰州市）永登县</div> */}
                    <div className="address">{e.address}</div>
                    <div className="city">730050</div>
                </div>
            </div>

              )
            })
        )
    }
    render() {
        let {addressfn,addressarr}=this.props;
        console.log(addressarr);
        return (
        <div id="address">
                {this.list(addressarr)}
            {/* <div className="addressBox active">
                <div className="mark">默认</div>
                <div className="content2">
                    <div className="username">郭永恒</div>
                    <div className="tel">186****1093</div>
                    <div className="city">甘肃（兰州市）永登县</div>
                    <div className="address">兰石家属院2栋1单元802</div>
                    <div className="city">730050</div>
                    
                </div>
            </div> */}

            <div className="addressBox">

                <div className="btn"
                    onClick={addressfn}
                ></div>
                <div className="addNew">添加新地址</div>
            </div>

        </div>           
        );
    }
}
export default connect(state=>state,(dispatch)=>bindActionCreators(actioncreaters,dispatch))(Address);
// export default Address;