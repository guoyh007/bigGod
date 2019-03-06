import React, { Component } from 'react';
import Collect from './collect';
// import content from '../content';

import {connect} from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actioncreaters from '../../redux/actioncreators';
class Detail03 extends Component {
    constructor(props) {
        super(props);
        this.state = {  
            // show:"block",//"block"
        };
    }
    componentDidMount(){
        let {collectArr:arr}=this.props;
        console.log(arr);
        let {show}=this.state;
        console.log(show);
        if(arr.length!==0){
            show="none";
        }else{
            show="block";
        };
        this.setState({show});
        //从后台请求数据；

    };


    render() {
        // let {show}=this.state;
        // console.log(show);
        let {collectArr:arr}=this.props;
        let show;//这个show我不放在sate里边，
        // console.log(show);
        if(arr.length!==0){
            show="none";
        }else{
            show="block";
        };

        return (
            <div className="detail">
                <div className="title">
                    <ul>
                        <li className="active">
                            <div>我的收藏</div>
                            <p className="line">
                            </p>
                        </li>
                    </ul>
                </div>
            
                <div className="long-line"></div>

                <div className="big-detail">
                    
                    <div className="no-detail" style={{display:show}}>
                        <div className="e-img01"></div>
                        <span>您还没有收藏任何产品</span>
                    </div>
                    <Collect/>
                </div>
            </div> 
        );
    }
}

export default connect(state=>state,(dispatch)=>bindActionCreators(actioncreaters,dispatch))(Detail03) ;