import React, { Component } from 'react';
import  {Link} from 'react-router-dom';
import data from "../../data/data";
class Ownrecommend extends Component {
    constructor(props) {
        super(props);
        this.state = {  
            spArr:[]//把请求过来的数据放里边
        };
    }
    async componentDidMount(){
        let {spArr}=this.state;
        let datax= await fetch('http://localhost/data?act=special')
        .then(d=>d.json());
        console.log(datax);//这个是请求过来的数据；
        spArr=datax.data;
        console.log(spArr);
        this.setState({spArr});
    };
    list=()=>{
        let {spArr}=this.state;
        // let arr = data.special;//死数据
        let arr = spArr;//活数据
        let temp = arr.map((e,i)=>{
            let src = e.src;
            let name = e.name.substring(0,15);
            let title = e.title.substring(0,15)+"...";
            let price = e.price;
            // console.log(src);//./img/zhuanshutuijian/
            let srcx=src.replace(/\.\/img\//g,"");
            // let path='/content#class=special&&id='+e.id;
            let path="/content#class=limit&&id=03limitfather";
            return(
            <li className="box1" key={i}>
                {/* 这个里边的路由信息可以变 */}
                <Link to={path}>
                    <div className="img-box">
                        <img src={require("../."+"./img/"+srcx)} alt=""/>
                        <p>
                            {title}
                        </p>
                    </div>
                    <div className="name-box">
                        <div>
                            {e.down&&e.down!=="0"?<span>直降{e.down}元</span>:""}
                            {/* <span></span> */}
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
        return temp;
    }
    render() {
        
        //渲染函数
        function list(){
           
        }
        return (
            <div className="m-box">
                <div className="h-box">
                    <div className="h-container">
                        <h2>
                            专属推荐
                        </h2>
                        <a href="">
                            <span>更多</span>
                            <div className="img">
                            </div>
                        </a>
                    </div>
                    <ul className="h-cotent">
                        {this.list()}
                        {/* <li className="box1">
                            <div className="img-box">
                                <img src={require("../../img/food01.png")} alt="" />
                                <p>
                                    当季捕捞，鲜活船冻，纯净海域...
                                </p>
                            </div>
                            <div className="name-box">
                                <div>
                                    <span></span>
                                </div>
                                <p className="title">
                                    初辰新鲜冷冻年货海鲜...
                                </p>
                                <p className="price">
                                    <span>¥</span>
                                    <span className="price-num">199</span>
                                    <span>起</span>
                                </p>
                            </div>
                        </li>
                        <li className="box1">
                            <div className="img-box">
                                <img src="./img/food01.png" alt="" />
                                <p>
                                    当季捕捞，鲜活船冻，纯净海域...
                                </p>
                            </div>
                            <div className="name-box">
                                <div>
                                    <span>直降400元</span>
                                </div>
                                <p className="title">
                                    初辰新鲜冷冻年货海鲜...
                                </p>
                                <p className="price">
                                    <span>¥</span>
                                    <span className="price-num">199</span>
                                    <span>起</span>
                                </p>
                            </div>
                        </li>
                        <li className="box1">
                            <div className="img-box">
                                <img src="./img/food01.png" alt="" />
                                <p>
                                    当季捕捞，鲜活船冻，纯净海域...
                                </p>
                            </div>
                            <div className="name-box">
                                <div>
                                    <span></span>
                                </div>
                                <p className="title">
                                    初辰新鲜冷冻年货海鲜...
                                </p>
                                <p className="price">
                                    <span>¥</span>
                                    <span className="price-num">199</span>
                                    <span>起</span>
                                </p>
                            </div>
                        </li>
                        <li className="box1">
                            <div className="img-box">
                                <img src="./img/food01.png" alt="" />
                                <p>
                                    当季捕捞，鲜活船冻，纯净海域...
                                </p>
                            </div>
                            <div className="name-box">
                                <div>
                                    <span></span>
                                </div>
                                <p className="title">
                                    初辰新鲜冷冻年货海鲜...
                                </p>
                                <p className="price">
                                    <span>¥</span>
                                    <span className="price-num">199</span>
                                    <span>起</span>
                                </p>
                            </div>
                        </li>
                        <li className="box1">
                            <div className="img-box">
                                <img src="./img/food01.png" alt="" />
                                <p>
                                    当季捕捞，鲜活船冻，纯净海域...
                                </p>
                            </div>
                            <div className="name-box">
                                <div>
                                    <span></span>
                                </div>
                                <p className="title">
                                    初辰新鲜冷冻年货海鲜...
                                </p>
                                <p className="price">
                                    <span>¥</span>
                                    <span className="price-num">199</span>
                                    <span>起</span>
                                </p>
                            </div>
                        </li>
                        <li className="box1">
                            <div className="img-box">
                                <img src="./img/food01.png" alt="" />
                                <p>
                                    当季捕捞，鲜活船冻，纯净海域...
                                </p>
                            </div>
                            <div className="name-box">
                                <div>
                                    <span>啦啦</span>
                                    <span>打折了</span>
                                </div>
                                <p className="title">
                                    初辰新鲜冷冻年货海鲜...
                                </p>
                                <p className="price">
                                    <span>¥</span>
                                    <span className="price-num">199</span>
                                    <span>起</span>
                                </p>
                            </div>
                        </li>
                        <li className="box1">
                            <div className="img-box">
                                <img src="./img/food01.png" alt="" />
                                <p>
                                    当季捕捞，鲜活船冻，纯净海域...
                                </p>
                            </div>
                            <div className="name-box">
                                <div>
                                    <span></span>
                                </div>
                                <p className="title">
                                    初辰新鲜冷冻年货海鲜...
                                </p>
                                <p className="price">
                                    <span>¥</span>
                                    <span className="price-num">199</span>
                                    <span>起</span>
                                </p>
                            </div>
                        </li>
                        <li className="box1">
                            <div className="img-box">
                                <img src="./img/food01.png" alt="" />
                                <p>
                                    当季捕捞，鲜活船冻，纯净海域...
                                </p>
                            </div>
                            <div className="name-box">
                                <div>
                                    <span></span>
                                </div>
                                <p className="title">
                                    初辰新鲜冷冻年货海鲜...
                                </p>
                                <p className="price">
                                    <span>¥</span>
                                    <span className="price-num">199</span>
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

export default Ownrecommend;