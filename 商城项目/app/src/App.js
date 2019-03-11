import React, { Component } from 'react';
import  {withRouter} from 'react-router-dom';
// import { connect } from 'react-redux';
// import { bindActionCreators } from 'redux';
// import * as actioncreaters from './redux/actioncreators';
import './css/1.css';//这个是通用css
import Header from './component/header';
import Midheader from './component/midheader';
import Fixbar from './component/fixbar';
// import {Route} from "react-router-dom";
// import {Router,Link} from 'react-router-dom';
// import {Route} from 'react-router-dom';
// import Content from './component/content';
// import Mid from './component/mid';
// import Shoppingcar from './component/shoppingcar';
// import Center from './component/centercomponentt/center';//个人中心
// import Login from './component/login';//登录注册页面
// import Clear from './component/clear';

import Footer from './component/footer';
import Loginbusness from './component/loginbusness';
import Routers from './routers/routes';

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {  
            fixvalue:0,
        };
    }
    //这个代码不能写到这里因为会造成 路由跳转有问题
    // async componentDidMount(){
    //     window.scrollTo(0,0);
    //     // console.log(localStorage);
    //     //每次进入首页的时候就获取本地的账户密码；
    //     // console.log(localStorage.getItem("limittime"));
    //     let time = +new Date;
    //     let limitNumber= Number(localStorage.getItem("limittime"));
    //     if(time<limitNumber){
    //         // console.log("在时间范围之内可以登录");
    //         let username=localStorage.getItem("username");
    //         let password=localStorage.getItem("password");
    //         console.log(username,password);
    //         //获取后端数据；(七天自动登录账户)
    //         let data = await fetch('http://localhost/user?act=login&username='+username+'&password='+password)
    //         .then(d=>d.json())
    //         // console.log(data.data);//这个是穿过来的数据
    //         if(data.code===0){
    //             //加入登录的名字正确
    //             let {login,getdata}=this.props;
    //             login();//登录
    //             getdata(data.data[0]);//把从后端的数据拿过来；
    //         }
    //     }else{
    //         localStorage.clear();//其他情况清除
    //     }
    // }

        //卸载的时候，将数组给后端；
    


    render() {
        return (
            <div>
                <Header/>
                <Midheader/>
                {/* <Route
                    path='/center'
                    component={Center}
                    // exact
                /> */}
                {/* <Route
                    path='/'
                    component={Mid}
                    exact
                />
                <Route
                    path='/shopping'
                    component={Shoppingcar}
                    // exact
                />
                <Route
                    path='/content'
                    component={Content}
                    // exact
                />
                <Route 
                    path='/login'
                    component = {Login}
                    exact
                    strict
                />  */}
                {/* <Clear/> */}
                {Routers}
                <Fixbar/>
                <Footer/>
                <Loginbusness/>
            </div>
        );
    }
}

export default App;
// export default connect(state=>state,(dispathch)=>bindActionCreators(actioncreaters,dispathch))(App);
