import React, { Component } from 'react';
import Listchildren from './listchildren';
class List extends Component {
    constructor(props) {
        super(props);
        this.state = {  };
    }
    render() {
        let {arr,toggleFn,removeData,filterArr,changeVal}=this.props;
        console.log(arr);
        let listview = filterArr.map((e,i)=>{
            return <Listchildren {...{
                key:i,
                val:e.txt,
                checked:e.checked,
                id:e.id,
                toggleFn,
                removeData,
                changeVal
            }}
            />
        })
        return (
            <ul className="todo-list">
                {listview}
            </ul>
        );
    }
}

export default List;