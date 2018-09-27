[toc]
# Zhou_
##  变量提升：
 * =>当栈内存(作用域)形成，JS代码自上而下执行之前，浏览器首先会把所有带 “VAR”/“FUNCTION” 关键词的进行提前 “声明” 或者 “定义” ，这种预先处理机制称之为 “变量提升”

 *   =>声明(declare)：var a  （默认值undefined）
 *   =>定义(defined)：a=12 （定义其实就是赋值操作）
## [变量提升阶段]
 *   =>带“VAR”的只声明未定义
 *   =>带“FUNCTION”的声明和赋值都完成了
 *   =>变量提升只发生在当前作用域（例如：开始加载页面的时候只对全局作用域下的进行提升，因为此时函数中存储的都是字符串而已） 
 *   =>在全局作用域下声明的函数或者变量是“全局变量”，同理，在私有作用域下声明的变量是“私有变量” [带VAR/FUNCTION的才是声明]
 *   =>浏览器很懒，做过的事情不会重复执行第二遍，也就是，当代码执行遇到创建函数这部分代码后，直接的跳过即可（因为在提升阶段就已经完成函数的赋值操作了）
##  带var和不带var的区别
 在全局作用域下声明一个变量，也相当于给WINDOW全局对象设置了一个属性，变量的值就是属性值（私有作用域中声明的私有变量和WINDOW没啥关系）

```
console.log(a);//=>undefined
console.log(window.a);//=>undefined
console.log('a' in window); //=>TRUE 在变量提升阶段，在全局作用域中声明了一个变量A，
此时就已经把A当做属性赋值给WINDOW了
，只不过此时还没有给A赋值，默认值UNDEFINED  in：检测某个属性是否隶属于这个对象
var a = 12;//=>全局变量值修改，WIN的属性值也跟着修改
console.log(a);//=>全局变量A  12
console.log(window.a);//=>WINDOW的一个属性名A  12

a = 13;
console.log(window.a);//=>13

window.a = 14;
console.log(a);//=>14
//=>全局变量和WIN中的属性存在 “映射机制”
```
==不加VAR的本质是WIN的属性==
```
// console.log(a);//=>Uncaught ReferenceError: a is not defined
console.log(window.a);//=>undefined
// console.log('a' in window);//=>false
a = 12;//=>window.a=12
console.log(a);//=>12
console.log(window.a);//=>12
```

```
/*var a = 12,
    b = 13;//=>这样写B是带VAR的*/
/*var a = b = 12;//=>这样写B是不带VAR的*/

console.log(a, b);//=>undefined undefined
var a = 12,
    b = 12;

function fn() {
    console.log(a, b);//=>undefined 12
    var a = b = 13;
    /*var a=13;  b=13;*/
    console.log(a, b);//=>13 13
}

fn();
console.log(a, b);//=>12 13
```
# 作用域链
## 私有作用域中带var和不带也有区别
1.带var的在私有作用域变量提升阶段，都声明为私有变量，和外界没有任何的关系
2.不带var不是私有变量，会向它的上级作用域查找，看是否为上级的变量，不是，会继续向上查找，一直找到window为止。（我们把这种查找机制叫做：“作用域链”）,也就是我们在私有作用域的这个非私有变量，是一直操作别人的。



