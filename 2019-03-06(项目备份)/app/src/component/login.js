import React, { Component } from 'react';

import './login.css'
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actioncreaters from '../redux/actioncreators';
class Login extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            // login:false,
            username:"",
            password:"",
        };
    }
    //组件卸载的时候存用户信息
    componentWillUnmount(){
        let {username,password}=this.state;
        let {login,loginState,data}=this.props;
        let time = +new Date;
        console.log(data);
        if(!loginState)return//不是登录状态就不往下走；
        if(!localStorage.getItem("username")){
            let limittime=time+7*24*60*60*1000;
            localStorage.setItem("username",username);
            localStorage.setItem("password",password);
            localStorage.setItem("time",password);
            localStorage.setItem("limittime",limittime);
            // console.log(localStorage.getItem("limittime"));
        }
        // else if(time< Number(localStorage.getItem("limittime"))){//小于设定的时间
        //     login();
        //     // setTimeout(function(){
        //     //     this.props.history.push("/",null);//自动登录，让后跳转到首页
        //     // },1000)
        // }else{
        //     localStorage.clear();//其他情况清除
        // };
        // // console.log(localStorage);
    }
    componentDidMount(){
        // if(!loginState)return//不是登录状态就不往下走；
        // let {username,password}=this.state;
        let {login,loginState,data}=this.props;
        // let {loginState}=this.props;
        // console.log(data);
        // let time = +new Date;//现在的时间
        // let limittime=localStorage.getItem("limittime");
        // console.log(loginState);
        // return
        // if(!loginState)return//不是登录状态就不往下走；
        // console.log(loginState);
        // //没有 而且小于设定的时间
        // if(!localStorage.getItem("username")){
        //     localStorage.setItem("username",username);
        //     localStorage.setItem("password",password);
        //     let time = +new Date;
        //     let limittime=time+7*24*60*60*1000;
        //     localStorage.setItem("time",password);
        //     localStorage.setItem("limittime",limittime);
        // }else if(time<limittime){//小于设定的时间
        //     login();
        //     // setTimeout(function(){
        //     //     this.props.history.push("/",null);//自动登录，让后跳转到首页
        //     // },1000)
        // }else{
        //     localStorage.clear();//其他情况清除
        // };
        // console.log(localStorage);
      
    };
    blur=(ev)=>{
        let {username,password}=this.state;
        // console.log(ev.target.value);
        let value=ev.target.value;
        let patt1=/^\d{11}$|\d+@(\d+|[A-Za-z]+)\.[A-Za-z]+$/i;//手机号，或者邮箱
        let a=patt1.test(value);//
        console.log(a);
        if(a){
            username=value;
        }else{
            alert('请输入正确的用户名');
            username="";
        }
        console.log(username);
        this.setState({username});
    };
    blur1=(ev)=>{
        let {password}=this.state;
        let value=ev.target.value;
        let patt1=/^\w+$/;
        let a=patt1.test(value);//
        console.log(a);
        if(a){
            password=value;
        }else{
            alert('请输入合理的密码');
            password="";
        }  
        console.log(password);
        this.setState({password});
    }
    //点击登录，改变整体的登录状态；
    click=async()=>{
        // console.log(1);
        let {username,password}=this.state;
        if(username!==""||password!==""){
            // alert('登录,开始fetch');
            let data = await fetch('http://localhost/user?act=login&username='+username+'&password='+password)
            .then(d=>d.json())
            // console.log(data.data);//这个是穿过来的数据
            if(data.code===0){
                //加入登录的名字正确
                let {login,getdata}=this.props;
                login();//登录
                getdata(data.data[0]);//把从后端的数据拿过来；
                // console.log(this.props.data);//看看有没有
                //push
                this.props.history.push('/', null);
            }
        }else{
            alert('请输入正确的账号密码');
        }
        
    };
    down=(ev)=>{
        // console.log(ev);
        if(ev.keyCode===13){
            this.click();
        }
    };
    render() {
        let {username,password}=this.state;
        return (
        <div className="color" id="mylogin">
            <div id="user-login">
                <div className="m-icons"></div>
                <p>帐号登录</p>
                <input 
                    type="text" 
                    placeholder="邮箱/手机号码/小米ID"
                    onBlur={this.blur}
                    defaultValue={username}
                />
                <input 
                    type="text" 
                    placeholder="密码"
                    onChange={this.blur1}
                    value={password}
                    onKeyDown={this.down}
                />
                <div 
                    className="enter"
                    onClick={this.click}
                    // onKeyDown={this.down}
                >登录</div>
                <div className="forget">
                    <div>
                        <a href="">手机短信登录/注册</a>
                    </div>
                    <div>
                        <a href="">立即注册</a>
                        | 
                        <a href="">忘记密码？</a>
                    </div>
                </div>
            <div className="other-login">
                <span className="line"></span> 
                <span>其他方式登录</span> 
                <span className="line"></span> 
            </div>
            <div className="logo-pic">
                {/* 这些是登录的各种方式  */}
                <ul>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                </ul>
            </div>
        </div>
            <div id="footer">
                <p>
                    简体| 繁体| English| 常见问题| 隐私政策
                </p>
                <p>
                    <span>小米公司版权所有-京ICP备10046444-</span>
                    <img src={require("../img/ghs.png")} alt=""/>
                    <span>京公网安备11010802020134号-京ICP证110507号</span>
                </p>
            </div>
        </div>
        );
    }
}

export default connect(state=>state,(dispathch)=>bindActionCreators(actioncreaters,dispathch))(Login);