import React, { Component } from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import {bindActionCreators} from 'redux';
import * as actioncreaters from '../../redux/actioncreators';
import './headercenter.css';//这个是组件自己的，注释的话,样式会消失
class Headercenter extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            arr:[
                "我的订单",
                "我的资产",
                "我的收藏",
                "地址管理",
                "退出登录"
            ],
            // login:true//是否登录   状态  应该用redux 全局下边的判断；
        };
    }
    //退出登录 还要想到关闭网页；
    click=()=>{
        let {loginout,toback}=this.props;
        toback();//将购物车整体传给后端
        loginout();//调用父级的方法，修改
        //清空购物车数组
    };
    render() {
        let {arr}=this.state;
        let {username:name}=this.props;
        // console.log(name);
        let list = arr.map((e,i)=>{
            let src = '/center/'+'0'+(i+1);
            if(i!==4){
                return (
                    <li key={i}>
                        <Link to={src}>{e}</Link>
                    </li>
                )
            }else{
                return(
                    <li 
                        key={i}
                        onClick={this.click}
                    >
                        <Link to='/'>{e}</Link>
                    </li>
                )
            }
        });

        return (
            <div id="login">
                {/* <!-- 个人中心 --> */}
                <div className="center">
                    <span className="pic pic1"></span>
                    <span className="name">{name}</span>
                    <span className="pic pic2"></span>
                </div>
                <div id="mycenter">
                    <ul>
                        {list}
                       
                    </ul>
                </div>
            </div>
        );
    }
}

export default connect((state)=>state,(dispatch)=>bindActionCreators(actioncreaters,dispatch))(Headercenter);