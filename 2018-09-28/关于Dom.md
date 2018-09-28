[toc]
# Dom
## dom获取元素

```
// id : 是唯一的；不要在一个页面中使用同一个id;
    // 在JS中获取到的元素是对象数据类型的；
    // 1. getElementById ： 通过id获取元素；
        // get  获取
        // element 元素
        // by  : 通过
        // id :
    // getElementById这个方法的上下文只能是document；不可以是其他元素；
    //let  con = document.getElementById("box");
    //console.log(con.getElementsByClassName("a")[0]);
    /*console.log(con.getElementById("a"));
    console.log(typeof con);// "object"
    con.style.height = "50px";*/


    // 2.getElementsByClassName: 获取到的是一个集合；是一个类数组；
    // 在IE8 以下是不兼容的；
    /*let con = document.getElementsByClassName("box1")[1];
        console.log(con);
        con.style.height ="100px";
        let  obj = {};
        obj.height = 100;
        let  a = [{}];
        a.height = 199;
    */

    // 3. getElementsByTagName : 通过标签名来获取元素;
    // 上下文可以是元素；
    //let div= document.getElementsByClassName("box1")[0];
    //console.log(div.getElementsByTagName("span"));

    // 经常应用于移动端；
    // 4. querySelector :获取的是唯一的；
    //document.querySelector("#box")
    console.log(document.querySelector(".box1"));
    //$("")

    // 5.querySelectorAll
    console.log(document.querySelectorAll(".box1"));

    // 6.
    console.log(document.documentElement);
    // 7.
    console.log(document.body);

    // 8.document.getElementsByName : 通过name属性获取元素;
    // 一般应用于表单元素；

    console.log(document.getElementsByName("b"));
```
## Dom的节点属性

```
    // DOM : document object  model(数据)
    // 其实就是HTML中的标签；在JS中叫元素；

    // 节点类型；四种节点类型;节点都是对象数据类型的；
    // 空格和换行都是文本节点；
    //              nodeType      nodeName      nodeValue
    // 元素节点           1        大写的标签名    null
    // 文本节点           3        #text          文本的内容
    // 注释节点           8        #comment       注释的内容
    // document          9        #document      null
  /* let span = document.getElementById("span");
    console.log(span.nodeValue);*/   
    //以上的结果是null

    let  box = document.getElementById("box");
    let  span = document.getElementById("span");

    // 1. childNodes : 获取当前元素的所有子节点;类数组
    console.log(box.childNodes);//NodeList(7) [text, comment, text, div, text, span#span, text]
    // 2. children : 获取当前元素所有的子元素节点；
    console.log(box.children);//HTMLCollection(2) [div, span#span, span: span#span]

    // 3.parentNode : 获取当前元素的父亲节点
    //  document 的父亲节点是null；
    console.log(document.body.parentNode.parentNode.parentNode);

    // 4.nextSibling : 获取下一个弟弟节点；
    //   nextElementSibling : 获取下一个弟弟的元素节点； IE8以下不兼容
    // console.log(child.parentNode.nextSibling.nextSibling);
    // console.log(child.parentNode.nextElementSibling);

    // 5.previousSibling : 上一个哥哥节点
    //  previousElementSibling : 上一个哥哥元素节点  IE8以下不兼容

    // 6. firstChild : 第一个子节点
    // firstElementChild : 第一个子元素节点 IE8以下不兼容
    console.log(box.firstChild);
    console.log(box.firstElementChild);

    // 7.lastChild : 最后一个子节点
    // lastElementChild : 最后一个子元素节点// IE8以下不兼容
```
## 动态操作DOM的方法

```
   let box = document.getElementById("box");
    // 1.createElement； 创建一个元素
    // createElement();// 参数： 字符串； 是一个标签名；
    //console.log(document.createElement);
    //console.log(document.createElement("p"));
    //let  p = document.createElement("p")

    // 2.appendChild:向元素末尾添加一个子节点;
    //box.appendChild(p);

    // 3.removeChild : 删除一个子节点
    // removeChild : 接收一个节点类型的；参数是要删除的这个元素；
    let last = document.getElementById("last");
    //box.removeChild(last)

    // 4.replaceChild : 替换子节点
    // replaceChild(new,old); 用新的元素替换原有的元素；
    //let  p = document.createElement("p");
    //box.replaceChild(p,last);

    // 5.insertBefore: 将新的元素插入到指定元素的前面；
    //insertBefore(new,old)
   // box.insertBefore(p,last)

    // 6.cloneNode ;克隆元素;接收一个布尔类型的参数；true,false ;如果不传参数，默认是false；
    // 浅克隆
    // 深克隆
    //console.log(box.cloneNode(true));
    //a.appendChild(box.cloneNode(true))

    //自己
    //a.appendChild(box.cloneNode(true))
    getAttribute
```


