import React from 'react';
import {Route} from "react-router-dom";
import Content from '../component/content';
import Mid from '../component/mid';
import Shoppingcar from '../component/shoppingcar';
import Login from '../component/login';//登录注册页面
import Center from '../component/centercomponentt/center';//个人中心
import Clear from '../component/clear';
let arr=[
    {
        path:'/clear',
        component:Clear
    },
    {
        path:'/center',
        component:Center
    },
    {
        path:'/',
        component:Mid,
        exact:true
    },
    {
        path:'/shopping',
        component:Shoppingcar
    },
    {
        path:'/content',
        component:Content
    },
    {
        path:'/login',
        component:Login
    },

];
let routers=arr.map((e,i)=>{
    let path=e.path;
    let component=e.component;
    let exact;
    if(e.exact){
        exact=Boolean(e.exact);
    }else{
        exact=false;
    }
    return <Route
            key={i}
            path={path}
            exact={exact}
            component={component}
            />
});

export default routers;