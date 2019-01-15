import React from 'react';//主要库
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

// ReactDOM.render(<App />, document.getElementById('root'));

//热更新
if(module.hot){
    module.hot.accept();
};
/* 这个Li是孙子组件 */
// let Li = (props) => (<li>{props.val}</li>);
//一定要注意类的首字母要大写
class Appx extends React.Component{
    constructor(props){
        super(props);
        console.log(props);
    }
    render(){
        let {aaa,bbb,ary}=this.props;
        // let arrx = ary.map((ele,i)=><Li {...{
        //     val:ele,
        //     key:i
        // }}/>);
        // console.log({arrx});
        return (
            <div>
                <h1>{aaa}</h1>
                <div>{bbb}</div>
                <div>{ary}</div>
                <div>{this.props.aaa}</div>
                <ul>
                    {/* {arrx} */}
                    <li>大哥大</li>
                </ul>
            </div>
        )
    }
}
/* 第二次 */
/* 属性中如果有2个重复的，后面会把前面覆盖 */
ReactDOM.render(
    <div>
        <Appx 
        {...{
            aaa:"令狐冲",
            bbb:"田伯光",
            ary:[1,2,4,5,6],
             
            }
                
        }
        />
        <App/>
    </div>,
    document.getElementById('root')
);

/* 第一次 */
// ReactDOM.render(
//     <div>
//         <div>
//             你不好世界！!!!!
//         </div>
//         {[1,2,4,5]}
//         {/* 注释用两个星星 */}
//         {
//             function fn(){
//                 alert(1);
//             }
//         }
//         {/* <input type = "text"
//             value="1"
//             onChange={
//                 alert(1)
//             }
//         /> */}
//         <input type = "text"
//             defaultValue="1"
//         />

//     </div>,
//     document.getElementById('root'),
//     ()=>{
//         console.log('成功欧冠')
//     }
// );

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();


