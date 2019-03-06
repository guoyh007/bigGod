import React, { Component } from 'react';
import  {Link} from 'react-router-dom';
import './limit.css'
// import data from "../../data/data";
class Limit extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            limitArr:[],//请求过来的数据放到这里边
            numL:0,
        };
    };
    async componentDidMount(){
        let {limitArr}=this.state;
        let datax= await fetch('http://localhost/data?act=limit')
        .then(d=>d.json());
        // console.log(datax);//这个是请求过来的数据；
        limitArr=datax.data;
        // console.log(limitArr);
        this.setState({limitArr});
    };
    limitL=()=>{
        let {numL}=this.state;
        numL ++;
        if(numL>=6){
            numL=6
        };
        this.setState({numL});
        // limitContainer.style.left = -278*numL+"px"; 
    };
    limitR=()=>{
        // console.log("R");
        let {numL}=this.state;
        numL --;
        if(numL<=0){
            numL=0
        };
        this.setState({numL});
        // limitContainer.style.left = -278*numL+"px"; 
    };
    list=()=>{
        let {limitArr}=this.state;
        // let arr = data.limit;
        let List =limitArr.map((e,i)=>{
            let num = (e.price/e.price1).toFixed(1);
            let name =e.name.substring(0,11)+"...";
            let src =e.img[0].src;
            let srcx=src.replace(/\.\/img\//g,"");
            // let src1 = src.replace(/\//g,"//");../../img/limit-img/limit-img(01)/limit-img.png  
            
            // 这个是限时购的数据；
            let path='/content#class=limit&&id='+e.id;
            return(
                <div key={i}>
                <Link to={path}>
                    <div className="img-tag">
                        <span>{num}折</span>
                    </div>
                    <img src={require("../../img/"+srcx)} />
                    <div className="price">
                        <p className="pro-info">{name}</p>
                        <p className="pro-price">
                            <span className="pro-unit">￥</span>
                            <span className="now-price">{e.price}</span>
                            <span className="market-price">
                                <span>￥</span>
                                <span>{e.price1}</span>
                            </span>
                        </p>
                    </div>
                </Link>

                </div>
            )
        });
        return List;
    }
    render() {
            let {numL}=this.state;
           
        return (
            <div className="limit-box">
                    {/* <!-- h-subTit/ 所有的大标题的className名 --> */}
                    <div className="h-subTit">
                        限时购
                        <img src={require("../../img/timer.png")} alt="" />
                        <span className="time">12:00场</span>
                        <div className="timer">
                            <span className="time time-hour">00</span>
                            <span className="colon">:</span>
                            <span className="time time-hour">00</span>
                            <span className="colon">:</span>
                            <span className="time time-hour">13</span>
                        </div>
                    </div>
                    {/* <!-- 限时购 --> */}
                    <div className="time-limit-box">
                        <div 
                            className="time-limit-container"
                            style={{left:-278*numL+"px"}}
                        >
                           
                            {/*这个是显示的内容 */}
                            {this.list()}
                        </div>
                        <div 
                            className="m-icons swiper-direction swiper-left" 
                            id="limitL"
                            onClick={this.limitL}
                        ></div>
                        <div 
                            className="m-icons swiper-direction swiper-right"
                            onClick={this.limitR}
                        ></div>
                    </div>
                </div>
        );
    }
}

export default Limit;