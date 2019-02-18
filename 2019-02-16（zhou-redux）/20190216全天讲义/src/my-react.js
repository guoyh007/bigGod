/*
 * type:当前标签的类型
 * props:传递给当前标签的属性集合(null/{})
 * childrenArg:所有子元素的集合（如果没有子元素是空数组）
 */
function createElement(type, props, ...childrenArg) {
	// 如果传递的是一个NULL，我们让其为空对象
	props = props || {};
	// 解构出来KEY和REF
	let {
		key = null,
			ref = null
	} = props;
	delete props.key;
	delete props.ref;

	let len = childrenArg.length;
	return {
		type, //<=>type: type,
		key,
		ref,
		props: {
			...props,
			// 验证是否传递的了子元素，只传递一项，生成的JSX对象的children是一个值不是数组，传递多项才是数组
			children: len === 0 ? null : (len === 1 ? childrenArg[0] : childrenArg)
		}
	}
}

let React = {
	createElement
};
export default React;
/*
createElement('div',{ id: 'AA', className: 'BB', style: {color: 'red',background: 'green'}, key: 'A12', ref: 'box' },'',React.createElement());

{
	type:'div',
	ref:'box',
	key:'A12',
	props:{
		id:'AA',
		className:'BB',
		style:{},
		children:''/{}/[]
	}
}
*/