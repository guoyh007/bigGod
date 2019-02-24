import React, { Component } from 'react';
// import Img  from '../../img'
import {Link} from 'react-router-dom';
import './banner-nav.css';
import data from '../../data/data';
class Bannernav extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            display:"nav-detail",
            content:[],
            leftNum:0,//轮播的index
            listArr:[],//这里边是轮播图的图片
            transition: "all 0.5s",
            onnOff:true,
            timer:"",
        };
    };
    componentDidMount(){
        console.log('banner false');//
        let {onnOff}=this.state;
        this.bannerPic();//
        // onnOff && this.autoplay();//给个开关
    };
    
    enter=(i,len)=>{
        //块的显示和隐藏
        let {display}=this.state;
        display="nav-detail show";
        this.setState({display});
        // console.log(this.state.display);
        let arrx=[];
        //数据 块内容具体的数据
        let bannerArr = data.banner;
        //定义一个渲染函数 渲染具体的内容
        function renderContent(i){//只能是0或者8 进入这个函数
            let contentArr = bannerArr[i].content;
            let name = bannerArr[i].nameArr;
            let temp1= contentArr.map((e,i)=>{
                // console.log(e.src);img/banner-homeused-img/homeused2/img(01).png"
                // ../img/banner-homeused-img/homeused2/img(01).png
                // ../../img/banner-tuijian-img/img(01).png
                let srcx =e.src.replace(/\.\/img\//,"");
                // console.log('../../img/'+srcx);
                return(
                    <li key={i}>
                        <img src={require('../../img/'+srcx)}/>
                        <span>{e.name}</span>
                    </li>
                )
            });
            return (
                <div key={i}>
                    <p>{name}</p>
                    <ul>
                        {temp1}
                    </ul>
                </div>   
            );
        };
        if(i===0){
            arrx.push(renderContent(0));
            // console.log(arrx);
        }else if(i<len-1){//不是第一个和最后一个的 此时的这个lin
            let temp1 = "";
            let arr = [bannerArr[2*i-1],bannerArr[2*i]];
            // console.log(arr);
            let list=arr.map((e,i)=>{
                temp1=e.content.map((e,i)=>{
                    // console.log(2*i-1);
                    let srcx =e.src.replace(/\.\/img\//,"");
                    return(
                        <li key={2*i-1}>
                            <img src={require('../../img/'+srcx)} />
                            <span>{e.name}</span>
                        </li>
                    )
                });
                return (
                    <div key={i}>
                        <p>{e.nameArr}</p>
                        <ul>
                            {temp1}
                        </ul>
                    </div>   
                );
                // temp+=temp11;  
            });    
            // console.log(list); 
            arrx.push(list);  
            // console.log(temp1);
        }else{//最后一个 对应另个一数组的最后一个
            // console.log(renderContent(8));
            if(i===8){
                arrx.push(renderContent(8));
                // console.log(arrx);
            } 
          
        };
        this.setState({content:arrx})
        return arrx;// 块显示时候的 内容
    };
    showEnter=()=>{
        //块的显示和隐藏
        let {display}=this.state;
        display="nav-detail show";
        this.setState({display});
    }
    out=(i)=>{
        //块的显示和隐藏
        let {display}=this.state;
        display="nav-detail";
        this.setState({display});
    };
    renderArr=()=>{
        // console.log("过个")
        let arr = [];
        let bannerArr = data.banner; //这个是数据
        let len = bannerArr.length;
        let lenx=len-1
        let arr2 = bannerArr.slice(1,len-1);
        let render=(i,lenx)=>{//这个只能0和8进入，len=9
            let {nameArr} = bannerArr[i];
            return (
                <li 
                    key={i} 
                    onMouseEnter={()=>{
                        // console.log(i);
                        // console.log(this);
                        this.enter(i)
                    }}
                    onMouseLeave={
                        this.out
                    }
                >
                    <span>
                        <a>{nameArr}</a>
                    </span>
                </li>
            )
        }
        //第一行内容
        arr.push(render(0,lenx));
        //中间大行内容
        let len2 = len-2;
        //将中间的数组截取出来
        for(let i=0;i<len2/2;i++){
            let arrx = arr2.slice(2*i,2*(i+1));
            // console.log(arr);
            let li=<li 
                key={i+1} 
                onMouseEnter={()=>{
                    this.enter(i+1,len);
                }}
                onMouseLeave={()=>{
                    this.out();
                }}
            >
                <span>
                    <a href="">{arrx[0].nameArr}</a>    
                </span>
                <span>
                    <span>/</span>
                    <a href="">{arrx[1].nameArr}</a>
                </span>
            </li>
            arr.push(li);  
        };
        //最后一行的内容
        arr.push(render(8,lenx));
        // console.log(arr);
        return arr;
    };
    //轮播 左按钮
    leftclick=()=>{
        // console.log("left");
        let {leftNum:num,listArr,transition}=this.state;
        num++;
        if(num>=4){
            let leftNum=num;
            this.setState({leftNum});

            listArr.push(<Link to="/content" key={4}>
            </Link>);
            this.setState({listArr});
            setTimeout(()=>{
                transition = '';//过度为0
                this.setState({transition});
                num=0;
                let leftNum=num;
                this.setState({leftNum});
                setTimeout(()=>{
                    listArr.pop(listArr[listArr.length-1]);
                    this.setState({listArr});
                    transition = "all 0.5s";
                    this.setState({transition});
                    // swiper.style.transition = '.3s';
                },30)
                this.setState({listArr,leftNum});
                console.log(num);
            },450);
        };
        this.setState({leftNum:num});
    }
    rightclick=()=>{
        let {leftNum:num}=this.state;
        num--;
        if(num<0){
            num=3;
        }
        this.setState({leftNum:num});
    };
    //自动轮播
    autoplay=(onnOff)=>{
        clearInterval(this.timer);//先清一下定时器；
        if(onnOff){
            this.timer = setInterval(()=>{
                this.leftclick();
            },1500);
        }
    }
    //鼠标移入 轮播的时候
    bannerenter=()=>{
        // console.log('banner');
        let{onnOff}=this.state;
        onnOff=false;
        this.setState({onnOff});
    };
    leave=()=>{
        let{onnOff}=this.state;
        onnOff=true;
        this.setState({onnOff});
    }
    //////轮播部分结束
    list=()=>{
        let {leftNum}=this.state;
        let arr=[0,1,2,3]
        let list=arr.map((e,i)=>{
            return(
                <li
                    className={i===leftNum?"active":""}
                    key={i}
                   
                ></li>
            )
        });
        return list;
    };
    bannerPic=()=>{
        let {listArr}=this.state;
        let arr=[0,1,2,3,4];//4是最后加上的；和第一个图片一样
        listArr=arr.map((e,i)=>{
            return(
                <Link to="/content" key={i}>
                </Link>
            )
        });
        // console.log(listArr);
        this.setState({listArr});
        //这个是复制第一个
        // list.push(<Link to="/content" key={4}>
        // </Link>);
        return listArr;
    }
    render() {
        let {display,content,leftNum,listArr,transition,onnOff}=this.state;
        
        this.autoplay(onnOff);
        
        console.log(onnOff);
        //数据的渲染
        // console.log(transition);
        let arr = this.renderArr();
        return (
        <div className="banner-nav" >
            <div className="banner-container">
                <ul>
                    {arr}
                    {/* 这个是 目录 nav 
                        有品推荐
                        家居家纺
                    */}
                </ul>
            </div>
            {/*  show显示和隐藏 鼠标滑过 内容显示 */}
            <div 
                className={display} 
                id="navDetail"
                onMouseEnter={this.showEnter}//进入，仍会显示
                onMouseLeave={()=>{
                    this.out(1);
                }}
            >
                {content}
            </div>
            <div className="banner-box">
                {/* <!-- 里边是轮播图  unnormal--> */}
                <div className="swiper-wrapper normal" id="swiper" >
                    {/* <!-- 轮播图里边的长条 --> */}
                    <div 
                        className="swiper-inner"
                        id="bannerInner"
                        style={{left:-leftNum*859+"px",transition:transition}}
                        onMouseEnter={this.bannerenter}
                        onMouseLeave={this.leave}
                        // onLoad={this.autoplay}
                    >   
                        {/*里边是轮播图  */}
                        {listArr};
                     
                    </div>
                    
                </div>
                {/* <!-- 以下是轮播按钮 --> */}
                <div className="swiper-button">
                    <ul>    
                        {/*里边是轮播小按钮 */}
                        {this.list()}                  
                      
                    </ul>
                </div>
                {/* <!-- 轮播 左按钮 --> */}
                <div
                    className="m-icons swiper-direction swiper-left"
                    onClick={this.leftclick}
                ></div>
                {/* <!-- 轮播 右按钮 --> */}
                <div 
                    className="m-icons swiper-direction swiper-right"
                    onClick={this.rightclick}
                ></div>
            </div>
        </div>
        );
    }
}

export default Bannernav;