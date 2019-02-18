/*
 * 1.创建一个容器存储状态信息
 * 2.创建一个事件池
 * 3.提供 getState/dispatch/subscribe 这几个方法
 */
function createStore(reducer) {
	// reducer：当前用户自己构建的管理员
	// 管理的状态和事件池
	let state,
		listenerAry = [];

	// 从容器中获取状态信息STATE（返回的是和容器中非同一个堆内存，经过深度克隆的值，防止外部直接修改状态信息）
	function getState() {
		return JSON.parse(JSON.stringify(state));
	}

	// 向事件池增加方法
	function subscribe(fn) {
		// 去重处理
		if (!listenerAry.includes(fn)) {
			listenerAry.push(fn);
		}
		// 返回移除FN的方法
		return function unsubscribe() {
			listenerAry = listenerAry.filter(item => item !== fn);
		}
	}

	// 派发行为
	function dispatch(action) {
		// action派发的行为对象
		// 执行reducer
		state = reducer(state, action);
		// 通知事件池中的方法依次执行
		listenerAry.forEach(item => item());
		return action;
	}

	// 默认派发一次，目的是为了把REDUCER执行一次，把用户自己设置的初始值赋值给STORE容器
	dispatch({
		type: `@@redux/INIT${new Date().getTime()}`
	});

	return {
		dispatch,
		getState,
		subscribe
	}
}


export {
	createStore
}