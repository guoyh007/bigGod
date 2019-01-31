import React, { Component } from 'react';
import './css/index.css';
import MyHeader from './component/header';
import List from './component/list';
import MyFooter from './component/footer';
class App extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            arr:[
                {
                    id:0,
                    checked:false,
                    txt:'好好好'
                },
                {
                    id:1,
                    checked:true,
                    txt:'棒棒棒'
                }
            ], 
            active:'/all' 
                      
        };
    }
    changeVal=(id,val)=>{
        let{arr}=this.state;
        arr.forEach((e)=>{
            if(e.id===id){
                e.txt=val;    
            }
        });
        this.setState({arr});
    }
    changeActive=(active)=>{
        this.setState({active})
    }
    addData = (data)=>{
        let{arr}=this.state;
        arr.unshift(data);
        this.setState({arr});
    }
    removeData =(id)=>{
        let {arr}=this.state;
        arr = arr.filter((e)=>e.id!==id);
        this.setState({arr})
    }
    toggleFn=(id)=>{
        let{arr}=this.state;
        arr.forEach((e)=>{
            if(e.id===id){
                e.checked=!e.checked
            }
        })
        this.setState({arr});
    }
    //点击进行设置
    allFn=(ev)=>{
        let {arr}=this.state;
        let {checked}=ev.target;
        console.log(checked);
        arr.forEach((e)=>e.checked=checked);
        this.setState({arr})

        // 下边这个是自己写的
        // let {arr}=this.state;
        // let checkedAll=arr.every((e)=>e.checked===true);
        // //如果是未全选，要整成全选
        // if(checkedAll===false){
        //     this.state.checkedAll=true;
        //     arr.forEach((e)=>e.checked=true);
        //     this.setState({arr});
        // }else{//如果是全选状态,要整成全不选
        //     this.state.checkedAll=false;
        //     arr.forEach((e)=>e.checked=false);
        //     this.setState({arr});
        // }
    
    }
    render() {
        let {arr,active}=this.state;
        console.log(active);
        //计算footer未选中情况
        let len = arr.filter((e)=>e.checked===false).length
        //计算全选
        let checkedAll=arr.every((e)=>e.checked===true);
        if(arr.length===0){
            checkedAll=false;  
        }
        //这个是自己写的
        // let footer;
        // if(arr.length===0){
        //     footer='';
        // }else{
        //     footer=<MyFooter len={len}/>
        // }

        let filterArr=arr.filter(e=>{
            switch (active) {
                case '/all':
                    return e    
                case '/unchecked':
                    return e.checked===false;    
                case '/checked':
                    return e.checked===true;   
                default:
                    return e    
            }
        })
        console.log(filterArr);

        //footer的显示和隐藏
        let footer=null;
        if(arr.length){
            footer=<MyFooter
                    len={len}
                    changeActive={this.changeActive}  
                    />
        }
         
        return (
            <section className="todoapp">
            <div>
                <MyHeader 
                    {...{
                        addfn:this.addData
                    }}
                />
                <section className="main">
                    <input 
                        className="toggle-all" type="checkbox" 
                        checked={checkedAll}
                        onChange={this.allFn}
                    />
                    <List
                        {...{
                            arr,
                            toggleFn:this.toggleFn,
                            removeData:this.removeData,
                            filterArr,
                            changeVal:this.changeVal
                        }}
                    />
                </section>
                {footer}
                
            </div>
        </section>  
        );
    }
}

export default App;