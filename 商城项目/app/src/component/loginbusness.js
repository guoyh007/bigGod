import React, { Component } from 'react';
// import {Redirect} from 'react-router-dom';
import {connect} from 'react-redux';
import './loginbusness.css';//引入css，他自己的css
import { bindActionCreators } from 'redux';
import * as actioncreators from '../redux/actioncreators';
class Loginbusness extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            // display:"hidden",
        };
    };
    componentDidMount(){

    }
    //取消，弹框消失
    click=()=>{
        // console.log(1);
        let {hidden}=this.props;
        hidden();
    };
    //确定登录，页面跳转
    log=()=>{
        //弹框隐藏
        let {display}=this.state;
        display="hidden";
        this.setState({display});
        //跳转到登录页面
        window.location.pathname='/login';
    };
    render() {
        // let {display}=this.state;block
        let {display:show}=this.props;
        // let {display}=this.state;
        console.log(show);
        return (
        //这个show和hidden 是显示很隐藏
        <div id="login-business" className={show}>
            <div className="layout-layout-element">
                <span className="close">
                    <a 
                        className="m-icons m-icons-close " 
                        onClick={this.click}
                    ></a>
                </span>
                <div className="login-content">
                    <p className="title">声明与政策</p>
                    <div className="agreement-container">
                        <p >欢迎您来到小米有品！</p>
                        <p className="content">
                            我们依据最新法律法规要求，制定并更新了
                            <a >《隐私政策》、</a>
                            <a >《小米有品用户协议》</a>
                            以及
                            <a >《小米账号使用协议》。</a>
                            </p>
                        <p>您需阅读并同意相关政策条款方可进行登录。</p>
                    </div>
                    <div className="button-lists">
                        <div 
                            className="agr"
                            onClick={this.log}
                        >同意并继续</div>
                        <div 
                            className="no-agr"
                            onClick={this.click}
                        >不同意</div>
                    </div>
                </div>
            </div>
        </div>
        );
    }
}

export default connect((state)=>state,(dispatch)=>bindActionCreators(actioncreators,dispatch))(Loginbusness);