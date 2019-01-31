import React, { Component } from 'react';
class MyHeader extends Component {
    constructor(props) {
        super(props);
        this.state = {  };
    }
    keyup=(ev)=>{
        if(ev.keyCode===13){
            // console.log(123);
            let {addfn}=this.props;
            let {value}=ev.target
            if(value!==''){
                // console.log(+new Date);
                addfn({
                    id:+new Date(),
                    txt:value,
                    checked:false
                });
                ev.target.value='';
            }else{
                alert('请输入内容');
            }
        }
    }
    render() {
        return (
        <header className="header" >
            <h1>todos</h1>
            <input 
                className="new-todo" 
                placeholder="请输入内容" 
                onKeyUp={this.keyup}
            />
        </header>
        );
    }
}

export default MyHeader;
