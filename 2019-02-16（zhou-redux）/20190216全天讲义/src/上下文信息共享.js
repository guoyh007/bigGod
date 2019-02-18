import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';

// 在祖先元素的上下文中设置一些信息，那么其后代元素都可以直接从上下文中获取这些信息使用
class A1 extends React.Component{
	// 主动设置需要使用祖先上下文中的谁（指定需要使用值的类型，和祖先设置的类型要保持一致）
	static contextTypes={
		num:PropTypes.number
	};

	render(){
		return <div>
			{this.context.num}
		</div>;
	}
}

class C extends React.Component{
	static contextTypes={
		fn:PropTypes.func
	}

	render(){
		return <div>
			<button onClick={ev=>{
				this.context.fn();
			}}>+</button>
		</div>;
	}
}

class A extends React.Component{
	constructor(){
		super();

		this.state={
			num:10
		};
	}
	// => 设置上下文中的通用信息
	static childContextTypes={
		num:PropTypes.number,
		fn:PropTypes.func
	};
	getChildContext(){
		// return的是啥，相当于给上下文中设置的信息是啥
		return {
			num:this.state.num,
			fn:()=>{
				let n=this.state.num;
				this.setState({num:++n});
			}
		}
	}


	render(){
		return <div>
			<A1></A1>
			<C></C>
		</div>;
	}
}



ReactDOM.render(<A/>, document.getElementById('root'));