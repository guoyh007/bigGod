### REACT基础知识
- 脚手架（create-react-app）
	+ webpack
	+ babel(babel-react-preset...)
	+ eslint
	+ less
	+ ...
	+ 目标：随意修改这个脚手架（配置出开发环境、测试环境、生产环境等环境变量模式）
```
 $ yarn eject
	|- config
	|- scripts
 修改成为自己需要的即可
```

- jsx
```
  1.把虚拟DOM变为真实的DOM
	1)首先会基于babel-react-preset语法包，把jsx变为  React.createElement这种模式
		React.createElement(
			"div",
			null,
			...
		);
	2)通过createElement这个方法的执行，生成一个对象（虚拟DOM对象-JSX对象）
	    {
			key:null,
			ref:null,
			props:{},
			type:'div'
			...
		}
	3)基于REACT-DOM中的RENDER方法，把创建的JSX对象放到指定的容器中（把虚拟DOM转换为真实的DOM）
		ReactDOM.render([JSX对象],[容器],[回调]);

  2.DOM DIFF（DOM的差异更新）
```

### redux
> react-redux 、dva
> mobx
> vuex
> 实现公共状态管理，实现信息共享的

中间件（redux插件，有助于不同的业务场景应用）
- redux-logger
- redux-thunk
- redux-promise
- redux-saga
- ...

