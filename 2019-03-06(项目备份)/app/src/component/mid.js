import React, { Component } from 'react';
import {connect} from 'react-redux';
// import Midheader from './midcomponent/midheader';
import Bannernav from './midcomponent/bannernav';
import Recommend from './midcomponent/recommend';
import Limit from './midcomponent/limit';
import Computer from './midcomponent/computer';
import Food from './midcomponent/food';
import Ownrecommend from './midcomponent/ownrecommend';
// import Shoppingcar from './shoppingcar';

class Mid extends Component {
    constructor(props) {
        super(props);
        this.state = {  };
    }
    render() {
        return (
            <div id="mid">
                <Bannernav/>
                <Recommend/>
                <Limit/>
                <Computer/>
                <Food/>
                <Ownrecommend/>
                {/* <Clear/> */}
            </div> 
        );
    }
}

export default connect((state)=>state)(Mid);