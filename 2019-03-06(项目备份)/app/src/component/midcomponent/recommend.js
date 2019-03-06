import React, { Component } from 'react';
import {Link} from 'react-router-dom';
//这里先把数据引入，先用着；
import './recommend-box.css';
// import data from '../../data/data';
class Recommend extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            tArr:[]
        };
    };

    async componentDidMount(){
        let {tArr}=this.state;
        // fetch();
        let datax= await fetch('http://localhost/data?act=tuijian')
        .then(d=>d.json());
        console.log(datax);//这个是请求过来的数据；
        tArr=datax.data;
        console.log(tArr);
        this.setState({tArr});
        // onnOff && this.autoplay();//给个开关
    };
    
    render() {
        let {tArr}=this.state;
        // let tArr = data.tuijian;
        //这个是推荐的数据
        let list = tArr.map((e,i)=>{
            // console.log(e.img[0].timg);
            let src = e.img[0].src;
            let srcx=src.replace(/\.\/img\//,"");
            // console.log(srcx);// ./img/tuijian-img/tuijian-img(01)/tuijian-img.png  
            
            // let path='/content#class=tuijian&&id='+e.id;
            let path="/content#class=limit&&id=02limitfather";
            // 这个还没有写完  path*/
            // 这个还没有写完*/
            // 这个还没有写完*/
            // 这个还没有写完*/
            // 这个还没有写完*/
            // 这个还没有写完*/
            return(
                <div key={i}>
                {/* 路由需要是变量，加入哈希 */}
                
                <Link to={path}>
                    <div className="recommend-container">
                        <p className="pro-info">{e.title1}</p>
                        <p className="pro-desc fontcolor-fade">{e.title2}</p>
                    </div>
                    <img src={require("../../img/" + srcx )} />
                  
                </Link>
                </div>
            )
        });


        return (
        <div className="recommend-box">
            {/* <!-- h-subTit/ 所有的大标题的className名 --> */}
            <div className="h-subTit">
                有品推荐
                <span>为您甄选 悦心购买</span>
            </div>
            <div className="recommend-content" id="recommend">
                {list}
            </div>
           
            
        </div>
        );
    }
}

export default Recommend;