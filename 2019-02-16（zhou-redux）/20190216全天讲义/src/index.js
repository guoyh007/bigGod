import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';

// redux
import {createStore} from './my-redux';

// 管理员：修改容器中的状态信息
// STATE：容器中原始的状态信息
// ACTION：DISPATCH派发的时候告诉管理员的行为（TYPE：行为标识）
let INIT_STATE={
	num:10
};
const reducer=(state=INIT_STATE,action)=>{
	switch(action.type){
		case 'UPDATE_NUM':
			state.num=state.num+1;
			break;
	}
	return state;//返回的值会把原始STORE中的状态信息替换掉
};
const store=createStore(reducer);

class A extends React.Component{
	componentDidMount(){
		// 向事件池中追加方法，当STORE中的状态改变，方法执行，强制更新当前组件
		let AA=store.subscribe(()=>{
			this.forceUpdate();
		});
		// 从当前事件池中移除掉这个方法
		// AA();
	}
	render(){
		// 从STORE容器中获取最新的状态信息展示
		let {num}=store.getState();
		return <div>
			{num}
		</div>;
	}
}

class B extends React.Component{
	render(){
		return <div>
			<button onClick={()=>{
				let action={
					type:'UPDATE_NUM'
				};
				store.dispatch(action);
			}}>+</button>
		</div>;
	}
}


ReactDOM.render(<div>
	<A></A>
	<div>
		<B></B>
	</div>
</div>, document.getElementById('root'));