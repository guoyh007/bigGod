import React, { Component } from 'react';
import  {Link} from 'react-router-dom';
// import data from "../../data/data";
class Food extends Component {
    constructor(props) {
        super(props);
        this.state = {  
            foodArr:[]//把请求过来的数据放里边
        };
    }
    async componentDidMount(){
        let {foodArr}=this.state;
        let datax= await fetch('http://localhost/data?act=food')
        .then(d=>d.json());
        console.log(datax);//这个是请求过来的数据；
        foodArr=datax.data;
        console.log(foodArr);
        this.setState({foodArr});
    };
    list=()=>{
        let {foodArr}=this.state;
        // let arr = data.food;//死数据
        let arr = foodArr;//活数据
        let temp = arr.map((e,i)=>{
            let src = e.img[0].src;
            let name = e.name.substring(0,15);
            let title = e.title;
            let price = e.price;
            console.log(e.id);
            // console.log(e.down!=="0");
            let srcx=src.replace(/\.\/img\//g,"");
            //路径里边存信息；
            let path='/content#class=food&&id='+e.id;
            return (
            <li className="box1" key={i}>
                <Link to={path}>
                    <div className="img-box">
                        <img src={require("../."+"./img/"+srcx)} />
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
       

        return (
        <div className="m-box">
            <div className="h-box">
                <div className="h-container">
                    <h2>
                        饮食
                    </h2>
                    <a href="">
                        <span>更多</span>
                        <div className="img">

                        </div>
                    </a>
                </div>
                <ul className="h-cotent">
                    {this.list()}
                </ul>
            </div>
        </div> 
        );
    }
}

export default Food;