import React, { Component } from 'react'

class Listchildren extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            edit:false,
            esc:false
        };
    }
    toggle=()=>{
        let {id,toggleFn}=this.props;
        console.log(this.props.id);
        toggleFn(id);
    }
    rm=()=>{
        let {id,removeData}=this.props;
        // console.log(this.props);
        removeData(id);
    }
    cbclick=(ev)=>{
        //双击的时候，把txt的value设置为父级传进来的数据。
        this.refs.txt.value=this.props.val;
        console.log(this.refs.txt);
        //让input框打开，让esc变成false，状态完成之后。聚焦
        this.setState({edit:true,esc:false},()=>{
            this.refs.txt.focus();
        });
    }
    blur=()=>{
        //只要没有按esc，那么改数据 
        if(!this.state.esc){
            let {id,changeVal} = this.props;
            changeVal(id,this.refs.txt.value);
        }
        this.setState({edit:false});//把input框关闭
        
    }
    esc=(ev)=>{
        //按了esc，改变esc的状态，之后调用blur
        if(ev.keyCode === 27){
            this.setState({esc:true},()=>{
                this.blur();
            });
        }
    }
    render() {
        let {val,checked} = this.props;
        let {edit}=this.state;
        // console.log(this.props);
        let sclass = checked?"completed":'';
        if(edit){
            sclass+=' editing'//是否打开
        }
        return (
            <li className={sclass}>
                <div className="view">
                    <input 
                        className="toggle"
                        type="checkbox"
                        checked={checked}
                        onChange={this.toggle}
                    />
                    <label
                        onDoubleClick={this.cbclick}
                    >{val}</label>
                    <button 
                        className="destroy"
                        onClick={this.rm}
                    ></button>
                </div>
                <input 
                    ref='txt'
                    className="edit" 
                    onBlur={this.blur}
                    onKeyUp={this.esc}
                 /> 
            </li>
        );
    }
}

export default Listchildren;