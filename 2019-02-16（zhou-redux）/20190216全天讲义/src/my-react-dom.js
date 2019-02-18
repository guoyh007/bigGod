/*
 * jsxOBJ:JSX虚拟DOM对象
 * container:容器
 * callback:虚拟DOM渲染完触发的回调函数
 */
function render(jsxOBJ, container, callback) {
	// console.log(jsxOBJ);
	let {
		type,
		props
	} = jsxOBJ;

	// 创建元素存放到指定的容器中（TYPE是标签名）
	if (typeof type === 'string') {
		let newEle = document.createElement(type);
		// 把PROPS中的属性赋值给元素
		for (let attr in props) {
			// 防止遍历类原型上自己扩展的那些可枚举的属性和方法
			if (!props.hasOwnProperty(attr)) break;
			let value = props[attr];
			// className
			if (attr === 'className') {
				newEle.setAttribute('class', value);
				continue;
			}
			// style：遍历每一项分别赋值给元素
			if (attr === 'style') {
				// value:props['style']
				for (let styAttr in value) {
					if (!value.hasOwnProperty(styAttr)) break;
					let styVal = value[styAttr];
					newEle.style[styAttr] = styVal;
				}
				continue;
			}
			// children子元素的处理
			if (attr === 'children') {
				// value:props['children']
				if (value === null) continue;
				if (!(value instanceof Array)) {
					value = [value];
				}
				// 循环所有的子元素，一项项的增加到newEle中
				// console.log(value);
				value.forEach(item => {
					if (typeof item === 'string') {
						newEle.appendChild(document.createTextNode(item));
					} else {
						render(item, newEle);
					}
				});
				continue;
			}
			newEle.setAttribute(attr, value);
		}
		container.appendChild(newEle);
		callback && callback();
		return;
	}
}

let ReactDOM = {
	render
};
export default ReactDOM;