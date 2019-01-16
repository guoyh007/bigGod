import React,{Component} from 'react';
import Ap1 from './ap1'

//这个是 父级 的数据
class Appx extends Component {
    constructor(props) {
        super(props);
        this.state = {
            num:10,
        };
    }
    add=()=>{
        // console.log(2)
        let {num} = this.state//解构
        num++;
        this.setState({num});
    }
    render() {
        let {num} = this.state//解构
        return (
            <div>
                <button
                    onClick = {this.add}
                >父级的数据{num}
                </button>{num}  
                <hr/>
                <Ap1 
                    {...{
                        childAdd:this.add,
                        childnum:num
                    }}
                />
            </div>
        );
    }
};

export default Appx;


