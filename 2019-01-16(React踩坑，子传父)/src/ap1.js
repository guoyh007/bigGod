import React,{Component} from 'react';
//这个是 子元素
class Ap1 extends Component {
    constructor(props) {
        super(props);
        this.state = {
           
        };
    }

    click=()=>{
        let {childAdd} =this.props;
        childAdd();
    }

    render() {
        let {childnum} =this.props;
        return (
            <div>
                <button
                    onClick={this.click}
                >子级的数据</button>
                {childnum}  
            </div>
        );
    }
}

export default Ap1;