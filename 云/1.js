console.log(data);//点进去，显示文件夹
let bd = document.getElementsByClassName('bread-nav')[0];//这个是父元素的标签
let folders = document.getElementsByClassName('folders')[0];//这个是显示的子元素的标签
// let fis = Array.from(folders.getElementsByTagName('file-item'));//获取子元素的div，为事件做准备（这行有点疑问）
// console.log(fis);
let idnum = 0;//2
// bd.innerHTML = `<a >${data[num].title}</a><span>${data[++num].title}</span>`;
function fn1(){
    //双击之后的事件
    
    //面包图
    let temp1 = '';
    for(let i in data){//加入这里num是1
        if(data[i].id == idnum && !data[i]=='0'){//如果一个pid = 父元素的id数组，那么找到并且放到数组里边
        temp1 += `<span>${data[i].title}</span>`
        }
    }
    // console.log(temp1);
    bd.innerHTML = `<a >${data[0].title}</a>`+ temp1;//显示当前的父级元素
    // console.log(bd);

    //对父级元素以下的子元素，展示。  进行查找idnum
    let arr = [];//设置一个空数组，找到子元素就往里边加
    for(let i in data){//加入这里num是1
        if(data[i].pid == idnum ){//如果一个pid = 父元素的id数组，那么找到并且放到数组里边
            // console.log()
            arr.push(data[i]);
        }
        // else{
        //     alert('1');
        // }
    }

    let temp = '';
    arr.forEach(e=>{
        temp += `<div class="file-item">
        <img src="img/folder-b.png" alt="" />
        <span class="folder-name">${e.title}</span>
        <input type="text" class="editor"/>
        <i class="checked"></i>
    </div>`;
    })
    folders.innerHTML = temp ;//将字符串塞给 父元素

    // console.log(arr);//此时得到的数组就是想要的数组
    let arr1 = [];
    for(let i = 0;i <arr.length;i++ ){
        arr1.push(arr[i].id)
    }
    console.log(arr1);//这个是数组id的集合
    //对数组进行字符串的拼接
    

    let fis = Array.from(folders.getElementsByClassName('file-item'))//获取子元素的div，为事件做准备（这行有点疑问）
    console.log(fis);
    //利用for循环，给子元素的div绑定事件，为以后的点击做准备
    for(let i=0;i<fis.length;i++){
        fis[i].idnum = arr1[i];//将数据中农的id数组 给元素身上挂上，为了让元素和id数组产生联系
    }
    fis.forEach(e =>{
        e.ondblclick = function(){//双击之后，发生如下事件
            console.log('双击');
            idnum = e.idnum;//获取的id给 num  2
            //假装给了一个 idnum=2
            console.log(idnum);

            // fn3(idnum);//点哪一个标记哪一个为true
            fn1();//递归
        }
    })
//如果被查看了就为true
    // function fn3(idnum){
    //     for(let i in data){//加入这里num是1
    //         if(data[i].id == idnum ){//如果一个pid = 父元素的id数组，那么找到并且放到数组里边
    //             data[i].checked = true;//操作数据中的checked
    //             console.log(data);
    //         }
    //     }
    // }


}
fn1();
