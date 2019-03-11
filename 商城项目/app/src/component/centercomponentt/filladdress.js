import React, { Component } from 'react';
import './filladdress .css';
import {connect} from "react-redux";
import { bindActionCreators } from 'redux';
import * as actioncreaters from "../../redux/actioncreators";
class Filladdress extends Component {
    constructor(props) {
        super(props);
        this.state = {  
           name:"",
           telephone:"",
           address:""
        };
    }
    change=(ev)=>{
        let {name}=this.state;
        name =ev.target.value.trim();
        this.setState({name});
    }
    telephonefn=(ev)=>{
        let {telephone}=this.state;
        telephone =ev.target.value.trim();
        this.setState({telephone});
    }
    handleTextareaChange=(ev)=>{
        let {address}=this.state;
        address =ev.target.value.trim();
        this.setState({address});
    }
    clear=()=>{
        let {name,telephone,address}=this.state;
        name=telephone=address="";//清空
        this.setState({name,telephone,address});
    }
    render() {
        let {addressdisplay:display}=this.props;//一个是值，一个是方法
        let {addressfn,saveaddress}=this.props;
        let {name,telephone,address}=this.state;

        return (
        <div id="filladdress"  style={{display:display}}>
         
           <div className="fillbox">
               <div className="fill">
                    <p>
                        添加收货地址
                    </p>
                    <hr/>
                    <input 
                        className="name" 
                        placeholder="姓名"
                        value={name}
                        onChange={this.change}
                    />
                    <input 
                        className="telephone" 
                        placeholder="手机"
                     
                        value={telephone}
                        onChange={this.telephonefn}
                    />
                    <textarea 
                        type="text"
                        placeholder="详细地址" 
                        className="error"
                        value={address} 
                        onChange={this.handleTextareaChange}
                    ></textarea>
                    {/* <input className="address"/> */}
               </div>
               <div className="submit-box">
                    <div className="button-box">
                        <div 
                            className="button"
                            onClick={()=>{
                                if(address!==""&&name!==""&&telephone!==""){
                                    saveaddress({name,telephone,address});
                                    this.clear();
                                    addressfn();
                                }else{
                                    alert("信息不完整");
                                }
                               
                            }}
                        >保存</div> 
                        <div 
                            className="button"
                            onClick={addressfn}
                        >取消</div> 
                    </div>  
                   
               </div>  
           </div>

        </div>           
        );
    }
}
export default connect(state=>state,(dispatch)=>bindActionCreators(actioncreaters,dispatch))(Filladdress);
// export default Filladdress;