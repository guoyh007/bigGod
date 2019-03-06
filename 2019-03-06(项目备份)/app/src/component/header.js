import React, { Component } from 'react';
import {connect} from 'react-redux';
import './header.css';//引入css，他自己的css

// import {Link} from 'react-router-dom';
import Headercenter from './headercomponent/headercenter';
import { bindActionCreators } from 'redux';
import * as actioncreaters from '../redux/actioncreators';

class Header extends Component {
    constructor(props) {
        super(props);
        this.state = {
            // display:"none",
         
        };
    }
    async componentDidMount(){
        window.scrollTo(0,0);
        // console.log(localStorage);
        //每次进入首页的时候就获取本地的账户密码；
        // console.log(localStorage.getItem("limittime"));
        let time = +new Date;
        let limitNumber= Number(localStorage.getItem("limittime"));
        if(time<limitNumber){
            // console.log("在时间范围之内可以登录");
            let username=localStorage.getItem("username");
            let password=localStorage.getItem("password");
            console.log(username,password);
            //获取后端数据；(七天自动登录账户)
            let data = await fetch('http://localhost/user?act=login&username='+username+'&password='+password)
            .then(d=>d.json())
            // console.log(data.data);//这个是穿过来的数据
            if(data.code===0){
                //加入登录的名字正确
                let {login,getdata}=this.props;
                // login();//登录
                getdata(data.data[0]);//登录，并从后端的数据拿过来；
            }
        }else{
            localStorage.clear();//其他情况清除
        }
    }

    //点击登录，弹出弹框；
    click=()=>{
        let {show}=this.props;
        // console.log(display);
        show();//直接运行就可以；
    }
    // 去登录
    login=()=>{
        let {loginState}=this.props;
        console.log(this.props);
        if(loginState){
            return <Headercenter 
                {...{
                    changelogin:this.changelogin,
                }}
            />
        }else{
            return(
                <div 
                    id="no-login"
                    onClick={this.click}
                >
                    <span>登录</span>
                    &nbsp;
                    <span>注册</span>
                </div>
            );
        };
       
    };

    //改变 登录状态 退出登录
    changelogin=()=>{
        let {login}=this.state;
        login=false;
        this.setState({login});
        console.log(this.state.login);
    };

    render() {
        let {display}=this.state;

        return (
        <div id="header">
            <div className="header-box">
                <div className="fr">
                    {this.login()}
                    
                    <span className="line"></span>
                    <div>
                        <a href="" target="_blank">帮助中心</a>
                    </div>
                    <span className="line"></span>
                    <div>
                        <span className="icons icons-app"></span>
                        <a href="" target="_blank" className="down-app">下载 APP</a>
                    </div>
                    <span className="line"></span>
                    <div className="clauses-box">
                        <div className="clauses">
                            <a href="" target="_blank">资质证照&nbsp;/&nbsp;协议规则</a>
                            <span className="icons icons-dropdown"></span>
                        </div>
                        <div className="header-item show" >
                            <ul>
                                <li> <a href="">资质证照</a></li>
                                <li><a href="">协议规则</a> </li>
                            </ul>
                        </div>
                    </div>
                    
                </div>
                    
            </div>
        </div>
        
        );
    }
}

export default connect((state)=>state,(dispatch)=>bindActionCreators(actioncreaters,dispatch))(Header);
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                