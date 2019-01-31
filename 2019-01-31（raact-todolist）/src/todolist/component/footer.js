import React, { Component } from 'react'

class MyFooter extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            active:'/all'
        };
    }
    //点击切换改变 自己在按钮的选框，并且调用父级函数让父级数据改变
    tab=(ev)=>{
        let{nodeName,href}=ev.target;
        if(nodeName==='A'){
            let h = href.split('#')[1];
            // console.log(h);
            this.setState({active:h});
            this.props.changeActive(h);
        }
    }
    render() {
        let {active}=this.state;
        return (
            <footer className="footer">
                <span className="todo-count">
                    <strong>{this.props.len}</strong>
                    <span>条未选中</span>
                </span>
                <ul 
                    className="filters"
                    onClick={this.tab}
                >
                    <li>
                        <a 
                            href="#/all" 
                            className={active==='/all'?'selected':''}
                        >全部</a>
                    </li>
                    <li>
                        <a 
                            href="#/unchecked" 
                            className={active==='/unchecked'?'selected':''}
                        >未选中</a>
                    </li>
                    <li>
                        <a 
                            href="#/checked" 
                            className={active==='/checked'?'selected':''}
                        >已选中</a>
                    </li>
                </ul>    
            </footer> 
        );
    }
}

export default MyFooter;