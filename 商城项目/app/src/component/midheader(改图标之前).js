import React, { Component } from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
// import Shoppingcar from './shoppingcar';
import './mid-header.css';
import {bindActionCreators} from 'redux';
import * as actioncreaters from '../redux/actioncreators';

class Midheader extends Component {
    constructor(props) {
        super(props);
        this.state = {  
            className:"header-nav2",
        };
    }
    //滚动的到一定位置，fixed；
    componentDidMount(){
        let {className}=this.state;
        window.onscroll=()=>{
            // console.log(window.pageYOffset);
            if(window.pageYOffset>60){
                className="header-nav2";
            }else{
                className="header-nav";
            }
        };
        this.setState({className});
    }
    render() {
        // console.log(this.state);
        let {shoppingNum}=this.props;

        return (
        <div className="header-nav">
            <div id="mid-header" >
                <div className="mid-header-top">
                    <Link to='/'>
                        <div className="m-logo"></div>
                    </Link>
                    <ul>
                        <li><span>星品驾到</span></li>
                        <li><span>限时抢购</span></li>
                    </ul>
                    <div >
                        <Link to="/shopping">
                            <div className="m-icons buy"></div>
                            <span className="carnum">
                                {shoppingNum}
                            </span>
                        </Link>
                    </div>
                    <div className="m-search">
                        <div><div href=""  className="search-picture" ></div></div>
                        <input className="input" type="text" placeholder="遇见温暖冬季" />
                    </div>
                </div>
            </div>
        </div>
        );
    }
}

export default connect((state)=>state,(dispatch)=>bindActionCreators(actioncreaters,dispatch))(Midheader);
