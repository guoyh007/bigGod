import React, { Component } from 'react';
let List = (props)=>(<li>{props.val}</li>)
  
class App extends Component {
  constructor(props){
      super(props);
      this.state={
        val:"令狐冲",
        arr:['第一个li']
      };
  }
  /* 这个写法用来让chang的this指向obj */
  change=(ev)=>{
    this.setState({
      val:ev.target.value
    })
  };
  
  add=(ev)=>{
    if(ev.keyCode===13){
      let {val,arr}=this.state;
      arr.push(val);
      this.setState({val:"",arr});
    }
  };

  render(){
    let {val,arr} = this.state;
    let list = arr.map((e,i)=>{
      return <List {...{val:e,key:i}}/>
    });
       
  return (
    <div className="App">
        <input
          value = {val}
          onChange = {this.change}
          onKeyUp={this.add}
        />
        {val}
        <ul>
          {list}
        </ul>
    </div>
  );
  };

}

export default App;



