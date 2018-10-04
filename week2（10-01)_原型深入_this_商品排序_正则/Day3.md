[toc]
# call  apply  bind

## call
用来改变某一个函数中THIS关键字指向的
 *  call
 *  apply
 *  bind
```
window.name = '珠峰';
let fn = function () {
    console.log(this.name);
};
let obj = {
    name: "OBJ",
    fn: fn
};
let oo = {name: "OO"};
// fn();//=>this:window "珠峰"
// obj.fn();//=>this:obj "OBJ"

// fn.call(oo);//=>this:oo

// fn.call(obj,10,20,30);//=>this:obj




* call
 *  1. [fn].call([this],[param]...)
 *   fn.call：当前实例(函数FN)通过原型链的查找机制，找到Function.prototype上的call方法  =>function call(){[native code]}
  
 *   fn.call()：把找到的call方法执行
 *
 *   当call方法执行的时候，内部处理了一些事情
 *    =>首先把要操作函数中的THIS关键字变为CALL方法第一个传递的实参值
 *    =>把CALL方法第二个及第二个以后的实参获取到
 *    =>把要操作的函数执行，并且把第二个以后的传递进来的实参传给函数
 
 /*Function.prototype.call = function () {
    let param1 = arguments[0],
        paramOther = [];//=>把ARG中除了第一个以外的实参获取到

    //=>this:fn 当前要操作的函数(函数类的一个实例)
    //把FN中的THIS关键字修改为PARAM1 =>把THIS(CALL中)中的this关键字修改为param1

    //=>把fn执行，把paramOther分别传递给fn
    // this(paramOther)  =>fn(paramOther)
};
fn.call({name:'xx'})
sum.call({..})
*/
```

```
let sum=function(a,b){
    console.log(this);//=>opt
};
let opt={n:20};

// sum.call(opt,20,30);//=>call执行 call中的this是sum  把this(call中的)中的“this关键字”改为opt 把this(call中的)执行，把20,30分别传递给它 //=>sum中this:opt  a=20 b=30
```

```
Function.prototype.call=function callAA(){
    //=>1.把THIS(FN)中的"THIS关键字"修改为第一个参数值(OBJ)
    //=>2.把THIS(FN)执行,把第二个及以后接受的参数值传递给函数(10,20)
    //this(10,20)
};
fn.call(obj,10,20)

题目：
function fn1(){console.log(1);}
function fn2(){console.log(2);}

fn1.call(fn2);
fn1.call.call(fn2)；
Function.prototype.call(fn1)；
Function.prototype.call.call(fn1)；
fn1.call.call.call.call.call(fn2)；

解析过程：
fn1.call(fn2);//=>找到CALL-AA把它执行,CALL-AA中的THIS是FN1,第一个参数传递的是FN2 
=>在CALL-AA中执行的是FN1 =>1

fn1.call.call(fn2);//=>找到CALL-AA让它执行,CALL-AA中的THIS是FN1.CALL,第一个参数是FN2  (把FN1.CALL中的THIS变为FN2，再让FN1.CALL执行  =>先找到CALL-AA，把它执行，只不过此时它中的THIS是FN2 =>让FN2中的THIS变为UNDEFINED，因为执行FN1.CALL的时候没有传递参数值，然后让FN2执行)  =>2

Function.prototype.call(fn1);//=>先找到CALL-AA把它执行，它中的THIS是Function.prototype =>让F.P中的THIS变为FN1,然后让F.P执行,F.P是一个匿名函数也是一个空函数，执行没有任何的输出

Function.prototype.call.call(fn1);//=>先找到CALL-AA把它执行，它中的THIS是F.P.CALL =>把F.P.CALL中的THIS修改为FN1,让F.P.CALL执行  =>F.P.CALL(CALL-AA)第二次把它执行(此时它里面的THIS已经是FN1) =>这一次其实在CALL-AA中是让FN1执行 =>1
//<==> fn1.call.call(fn2)
//<==> fn1.call===Function.prototype.call ：true

fn1.call.call.call.call.call(fn2);
//=>fn1.call.call.call.call===Function.prototype.call
```

```
简单例子：
let fn = function (a, b) {
    console.log(this，a,b);
};
let obj = {name: "OBJ"};

// fn.call(obj, 10, 20);//=>this:obj a=10 b=20
// fn.call(10, 20);//=>this:10 a=20 b=undefined
// fn.call();//=>this:window a=undefined b=undefined
// fn.call(null);//=>this:window
// fn.call(undefined);//=>this:window


"use strict";

* CALL中的细节
 *   1.非严格模式下，如果参数不传，或者第一个传递的是null/undefined，THIS都指向WINDOW
 *   2.在严格模式下，第一个参数是谁，THIS就指向谁（包括null/undefined），不传THIS是undefined,,,,,,
 */
```
## apply
* apply：和call基本上一模一样，唯一区别在于传参方式
 *   fn.call(obj,10,20)
 *   fn.apply(obj,[10,20]) APPLY把需要传递给FN的参数放到一个数组（或者类数组）中传递进去，虽然写的是一个数组，但是也相当于给FN一个个的传递
 */
## blind
* bind：语法和call一模一样，唯一的区别在于立即执行还是等待执行
 *   fn.call(obj,10,20) 改变FN中的THIS,并且把FN立即执行
 *   fn.bind(obj,10,20) 改变FN中的THIS,此时的FN并没有执行（不兼容IE6~8）

```
let fn = function (a, b) {
    console.log(this);
};
let obj = {name: "OBJ"};

// document.onclick = fn;//=>把FN绑定给点击事件，点击的时候执行FN
// document.onclick = fn();//=>在绑定的时候,先把FN执行,把执行的返回值(UNDEFINED)绑定给事件,当点击的时候执行的是undefined
```


```
//=>需求：点击的时候执行FN，让FN中的THIS是OBJ
// document.onclick = fn;//=>this:document
// document.onclick = fn.call(obj);//=>虽然this确实改为obj了，但是绑定的时候就把fn执行了(call是立即执行函数)，点击的时候执行的是fn的返回值undefined
// document.onclick = fn.bind(obj);//=>bind属于把fn中的this预处理为obj，此时fn没有执行，当点击的时候才会把fn执行  
```
# 需求一：获取数组中的最大值(最小值)
方法：
  1.给数组先排序(由大到小排序),第一项就是最大值
  2.假设法:假设第一个值是最大值,依次遍历数组中后面的每一项,和假设的值进行比较,如果比假设的值要大,把当前项赋值给MAX...
  3.基于Math.max完成
```
let ary = [12, 13, 14, 23, 24, 13, 15, 12];

//=>排序
/*
let max = ary.sort(function (a, b) {
    return b - a;
})[0];
console.log(max);
*/
```

```
//=>假设法
let max = ary[0];
for (let i = 1; i < ary.length; i++) {
    let item = ary[i];
    item > max ? max = item : null;
}
console.log(max);
```

```
//=>Math.max
// console.log(Math.max(ary));//=>NaN =>Math.max是获取一堆数中的最大值,需要我们把比较的数,一个个的传递给这个方法 =>Math.max(12,13,14...) =>Math.max([12,13,14...])这样只是传递一个值
/*
[12,13,14].toString() =>"12,13,14"
eval("12,13,14") =>14

   1.eval：把字符串转换为JS表达式
    eval("1+2") =>3

   2.括号表达式（小括号的应用）
    用小括号包起来，里面有很多项（每一项用逗号分隔），最后只获取最后一项的内容（但是会把其它的项也都过一遍）
    (function(){
        console.log(1);
    },function(){
        console.log(2);
    })();
    =>2

    let a=1===1?(12,23,14):null;
    =>a=14

   不建议大家过多使用括号表达式，因为会改变THIS
```

```
//=>基于EVAL转换字符串为JS表达式
// console.log(eval("Math.max(" + ary.toString() + ")"));
```

```
//=>利用了APPLY的一个特征：虽然放的是一个数组，但是执行方法的时候，也是把数组中的每一项一个个的传递给函数
// console.log(Math.max.apply(null, ary));

```
## 基于ES6中的展开运算符完成
```
// let ary = [12, 13, 14, 23, 24, 13, 15, 12];

// let max = Math.max.apply(null, ary);
// console.log(max);

//=>基于ES6中的展开运算符完成
// let max = Math.max(...ary);
// console.log(max);
```
## 解构赋值：
 * 解构赋值：按照一个数据值的结构，快速解析获取到其中的内容
 *   1.真实项目中一般都是针对于数组或者对象进行结构赋值

```
// let [a] = ary;
// console.log(a);//=>12

// let [a, , c] = ary;
// console.log(a, c);//=>12 34
```

```
// let ary = [12, 23, 34, 45, 56];
//=>需求：获取第一项，把剩下的项作为一个数组返回
// let [a, ...b] = ary;
// console.log(a, b);//=>12 [23,34,45,56]  “...”在此处称之为剩余运算符：除了前面以外的项，都放在一个数组中
// let [a, ...b, c] = ary;//=>Uncaught SyntaxError: Rest element must be last element 剩余运算符处于解构中最后的位置

```

```
let ary = [12];
let [a, b = 0] = ary;//=>在解构的时候可以给变量设置默认值：如果当前变量对应结构中的这一项没有值，变量用默认值
console.log(a, b);//=>12 0
```

```
换位置：
// let a = 12,
//     b = 13;
//=>a&b互换位置
/*[a, b] = [b, a];//=>[13,12]
console.log(a, b);*/
以前的做法：
/*let c=a;
a=b;
b=c;
console.log(a, b);*/

/*a=a+b;
b=a-b;
a=a-b;
console.log(a, b);*/
```
## 解构赋值例子：
```
//=================对象解构赋值
// let obj = {name: 'xxx', age: 25, sex: 0};
// let {name, age} = obj;//=>对象解构赋值默认情况下要求：左侧变量名和对象中的属性名一致才可以
// console.log(name, age);

// let {sex} = obj;
// console.log(sex);//=>0

// let {age: ageAA} = obj;
// // console.log(age);//=>Uncaught ReferenceError: age is not defined
// console.log(ageAA);//=>25 给解构的属性名起别名作为我们使用的变量

// let {friend = 0} = obj;
// console.log(friend);//=>0 给不存在的属性设置默认值

/*let fn = function ({
                       name = '珠峰',
                       age = 0
                   } = {}) {//=>把传递的对象解构了(不传递值,默认赋值为空对象：现在传递对象或者不传递，形参接收到的都是对象)，解构的时候，可以把传递进来对象中，如果某个属性不存在，我们赋值默认值
    console.log(name, age);

};
fn({
    name: 'xxx',
    age: 25
});*/
```
## 解构赋值例子：
```
/*let fn = function ({
                       name = '珠峰',
                       age = 0
                   } = {}) {//=>把传递的对象解构了(不传递值,默认赋值为空对象：现在传递对象或者不传递，形参接收到的都是对象)，解构的时候，可以把传递进来对象中，如果某个属性不存在，我们赋值默认值
    console.log(name, age);

};
fn({
    name: 'xxx',
    age: 25
});*/
```
## 解构赋值例子:
```
let value = {name: 'xxx', age: 25, score: [12, 23, 34, 45]};
// a='xxx'
// b=12
// c=[23,34,45]
let {name: a, score: [b, ...c]} = value;
console.log(a, b, c);

```
## 解构赋值6(...用法):
```

 * “...”在ES6的语法中，三个点有三种含义
 *   1.剩余运算符
 *   2.拓展运算符
 *   3.展开运算符：把数组(对象/类数组)中的每一项展开 xxx,xxx,xxx...
 */
// let ary = [12, 23, 34];
// let [...arg] = ary; //=>ary.slice(0)

// function fn(context, ...arg) {
//     //=>获取传递值中的第一个和剩下的
//     console.log(context, arg);
//     //=>ARG是一个数组 / ARGUMENTS是类数组
// }
// let obj = {};
// fn(obj, 10, 20, 30);

//最终结果是 {}，[10,20,30]

// function sum(...arg) {
//     //=>传递几个实参,ARG中就存储多少个,此时的ARG和ARGUMENTS一样的,区别是ARG是一个数组,ARGUMENTS是一个类数组
// }

// let ary = [12, 23, 34];
// let fn = function (a, b, c) {
//     console.log(a, b, c);
// };
// // Math.max(...ary);//=>Math.max(12,23,34)
// // fn(ary);//=>a:ary b/c:undefined
// fn(...ary);//=>fn(12, 23, 34) 把数组中的每一项分别传递给一个函数,此时我们使用展开运算符把数组展开即可

// let obj = {name: 'xxx', age: 20};
// let newObj = {...obj, sex: 0};//=>{name: 'xxx', age: 20,sex:0} 把原有对象展开(克隆)放到新对象中

// let ary = [12, 23];
// let newAry = [...ary, 100];//=>[12, 23, 100]
```
## 深入原型7(把类数组转换为数组):数组求最大值最小值

```
 * 编写一个方法fn，实现任意数求平均数（去除数字中的最大和最小，然后再算平均数，保留小数点后面两位）
 */
// let fn = function () {
//     //=>arguments:类数组(不能直接调取数组原型上的方法)
//     //1.先给ARGUMENTS排序(不能直接使用SORT方法),把排序后的值去掉首位(干掉最大值和最小值)
//     //2.把剩下的值求和,除以总长度,求出平均数即可
//
//     //arguments.sort()//=>Uncaught TypeError: arguments.sort is not a function
//     //=>把ARG类数组转换为数组ARY
//     let ary = [];
//     for (let i = 0; i < arguments.length; i++) {
//         ary.push(arguments[i]);
//     }
//
//     //=>给ARY排序，去除首位
//     ary.sort(function (a, b) {
//         return a - b;
//     });
//     ary.pop();
//     ary.shift();
//
//     //=>然后再求和，最后求平均
//     let total = 0;
//     for (let i = 0; i < ary.length; i++) {
//         total += ary[i];
//     }
//     return (total / ary.length).toFixed(2);
// };
```
## 8基于ES6的方式把类数组转换为数组：求任意数的平均值

```
/*let fn = function () {
    // let ary = [...arguments];//=>把类数组转换为数组
    let ary = Array.from(arguments);//=>把类数组转换为数组
    ary.sort(function (a, b) {
        return a - b;
    }).pop();
    ary.shift();
    return (eval(ary.join('+')) / ary.length).toFixed(2);
};*/
let fn = function (...ary) {
    ary.sort(function (a, b) {
        return a - b;
    }).pop();
    ary.shift();
    return (eval(ary.join('+')) / ary.length).toFixed(2);
};
console.log(fn(10, 9.8, 9.5, 8.7, 8.8, 8, 9.2, 8.9));
```
## 箭头函数：

```
//======================[箭头函数]

// let fn = (x, y) => {
//
// };
// fn(10, 20);

// let fn = x => {
//     //=>只有一个形参，我们可以省略小括号
// };
// fn(10);

// let fn = function (x, y) {
//     return x + y;
// };
// let fn = (x = 0, y = 0) => x + y; //=>如果函数体中只有一句操作，并且是RETURN的，我们可以省略大括号（给形参设置默认值）
// console.log(fn(10, 20));

// let fn = x => y => x + y;
// /*
//  var fn = function fn(x) {
//   return function (y) {
//     return x + y;
//   };
//  };
//  */
```

```
// let obj = {
//     fn: (function () {
//         //=>this:window
//         return () => {
//             console.log(this);
//         }
//     })()
// };
// obj.fn();//=>this:window 箭头函数执行和是否有点，点前面是谁都没关系了，因为它没有自己的执行主体，在箭头函数中使用到的THIS都是直接找上下文中的THIS来使用
```






















