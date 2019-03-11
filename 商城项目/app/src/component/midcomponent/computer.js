import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import './common-box.css'
// import data from "../../data/data";//死数据

class Computer extends Component {
    constructor(props) {
        super(props);
        this.state = {  
            pcArr:[]//把请求过来的数据放里边
        };
    }
    async componentDidMount(){
        let {pcArr}=this.state;
        let datax= await fetch('http://localhost/data?act=computer')
        .then(d=>d.json());
        console.log(datax);//这个是请求过来的数据；
        pcArr=datax.data;
        console.log(pcArr);
        this.setState({pcArr});
    };
    list=()=>{
        let {pcArr}=this.state;
        //这个是渲染的函数
        // let arr = data.computer;//死数据
        let arr = pcArr;//活数据
        let lis=arr.map((e,i)=>{
            let src = e.img[0].src;
            // console.log(src);
            let srcx=src.replace(/\.\/img\//g,"");
            // console.log(srcx); ./img/computer-img/
            let name = e.name.substring(0);
            let price = e.price;
            let path="/content#class=computer&&id="+e.id;
            // let path="/content#class=limit&&id=02limitfather";
            return(    
                <li className="box1" key={i}>
                {/* 路由需要是变量，加入哈希 和？*/}
                <Link to={path}>
                    <div className="img-box">
                        <img src={require("../."+"./img/"+srcx)} alt=""/>
                        <p>
                            {name}
                            {/* 电竞级性能怪兽，多核性能计算... */}
                        </p>
                    </div>
                    <div className="name-box">
                        <div>
                            {e.down!==""?<span>直降{e.down}元</span>:""}
                        </div>
                        <p className="title">
                            {name}
                        </p>
                        <p className="price">
                            <span>¥</span>
                            <span className="price-num">{price}</span>
                            <span>起</span>
                        </p>
                    </div>
                </Link>
                </li>
            )
            
        });
        return lis;
    }
    render() {
       
        return (
        <div className="m-box">
            <div className="h-box">
                <div className="h-container">
                    <h2>
                        笔记本
                    </h2>
                    <a href="">
                        <span>更多</span>
                        <div className="img">

                        </div>
                        {/* <!-- <img src="./img/向右链接.png" alt=""> --> */}
                    </a>
                    
                </div>
                <ul className="h-cotent">
                    {this.list()}
                    {/* <li className="box1">
                        <div className="img-box">
                            <img src={require("../../img/computer01.png")} alt="" />
                            <p>
                                电竞级性能怪兽，多核性能计算...
                            </p>
                        </div>
                        <div className="name-box">
                            <div>
                                <span>直降402元</span>
                            </div>
                            <p className="title">
                                小米游戏本 第八代 15...
                            </p>
                            <p className="price">
                                <span>¥</span>
                                <span className="price-num">6497</span>
                                <span>起</span>
                            </p>
                        </div>
                    </li>
                    <li className="box1">
                        <div className="img-box">
                            <img src={require("../../img/computer01.png")} alt="" />
                            <p>
                                电竞级性能怪兽，多核性能计算...
                            </p>
                        </div>
                        <div className="name-box">
                            <div>
                                <span></span>
                            </div>
                            <p className="title">
                                小米游戏本 第八代 15...
                            </p>
                            <p className="price">
                                <span>¥</span>
                                <span className="price-num">6497</span>
                                <span>起</span>
                            </p>
                        </div>
                    </li>
                    <li className="box1">
                        <div className="img-box">
                            <img src={require("../../img/computer01.png")} alt="" />
                            <p>
                                电竞级性能怪兽，多核性能计算...
                            </p>
                        </div>
                        <div className="name-box">
                            <div>
                                <span></span>
                            </div>
                            <p className="title">
                                小米游戏本 第八代 15...
                            </p>
                            <p className="price">
                                <span>¥</span>
                                <span className="price-num">6497</span>
                                <span>起</span>
                            </p>
                        </div>
                    </li>
                    <li className="box1">
                        <div className="img-box">
                            <img src={require("../../img/computer01.png")} alt="" />
                            <p>
                                电竞级性能怪兽，多核性能计算...
                            </p>
                        </div>
                        <div className="name-box">
                            <div>
                                <span>直降402元</span>
                            </div>
                            <p className="title">
                                小米游戏本 第八代 15...
                            </p>
                            <p className="price">
                                <span>¥</span>
                                <span className="price-num">6497</span>
                                <span>起</span>
                            </p>
                        </div>
                    </li> */}
                </ul>
            </div>
        </div>
        );
    }
}

export default Computer;