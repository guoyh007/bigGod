import React, { Component } from 'react';
import Filladdress from './filladdress';
import {connect} from 'react-redux';
import {Route,Link} from 'react-router-dom';
import './center.css';//这个是对应的组件
import Detail01 from './detail01';
import Detail02 from './detail02';
import Detail03 from './detail03';
import Detail04 from './detail04';
class Center extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            arr:["我的订单","我的资产","我的收藏","地址管理"],
            num:0,
        };
    }
    componentDidMount(){
        //dom加载完之后
        let {num}=this.state;

    }
    click=(i)=>{
        console.log(i);
        let {num}=this.state;
        num=i;
        this.setState({num});
    }
    render() {
        let {arr,num}=this.state;
        // let {}=this.props;
        // console.log(this.props);
        let pathname = window.location.pathname;
        let num1=pathname.split("/center/")[1];
        num=Number(num1)-1;
        // console.log(num);
        let list = arr.map((e,i)=>{
            let src ="/center/" +"0"+(i+1);
            return(
            <li className={i===num?"active":""} key={i} onClick={()=>{
                this.click(i)
            }}>
                <span></span>
                <Link to={src}>
                   {e}
                </Link>
            </li>
            )
        });
        // console.log(list);
        let username=this.props.data.othername;
        return (
        <div>
            <div id="mid-one">
                {/* <!-- 这里开始修改 -->
                <!--************************ 这里是个人中心详情 --> onClick={this.click} */}
                <div className="content">
                    <div className="nav">
                        <div className="nav-container">
                            <span>
                                <Link to='/'>首页</Link>
                            </span>
                            >
                            <span>
                                <Link to='/center/01'>个人中心</Link>
                            </span>
                            >
                            <span>
                                <Link to='/center/01'>我的订单</Link>
                            </span>
                        </div>
                    </div >

                    <div className="container">
                        <div className="center">
                            <div className="header">
                                <div className="head-picture"></div>
                                <p>{username}</p>
                            </div>
                            <ul>
                                {list}
                             
                            </ul>
                        </div>
                    <Route 
                        path='/center/01'
                        component={Detail01}
                        // exact
                    />
                    <Route 
                        path='/center/02'
                        component={Detail02}
                        // exact
                    />
                    <Route 
                        path='/center/03'
                        component={Detail03}
                        // exact
                    />
                    <Route 
                        path='/center/04'
                        component={Detail04}
                        // exact
                    />
                    <Filladdress/>
                        
                    </div>
                </div>
                {/* <!-- ********************** 个人中心结束 --> */}
            </div> 
        </div>
        );
    }
}

export default connect((state)=>state)(Center);