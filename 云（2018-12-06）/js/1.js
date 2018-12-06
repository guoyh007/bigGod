// console.log(data);//点进去，显示文件夹
let bd = document.getElementsByClassName('bread-nav')[0];//这个是父元素的标签
let folders = document.getElementsByClassName('folders')[0];


let idnum = 0;//2

let nameArr = [];//面包图名字所在数组的初始值；

function fn1(){//双击之后的事件
    //面包图
    let temp1 = '';// 面包图的初始值
    for(let i = 0;i < nameArr.length;i++){
        temp1 += `<span>${nameArr[i]}</span>`;
    }
    bd.innerHTML = `<a >${data[0].title}</a>`+ temp1;//显示当前的父级元素
    //对父级元素以下的子元素，展示。  进行查找idnum
    let arr = [];//设置一个空数组，找到子元素就往里边加
    let n = 0;
    for(let i in data){//加入这里num是1
        if(data[i].pid == idnum ){//如果一个pid = 父元素的id数组，那么找到并且放到数组里边
            arr.push(data[i]);
            render();
            n++;
        }
    }
    if(n==0){
        folders.innerHTML = `<img src="img/cover-bg.png" alt="" />`;
        // alert(1);
    };

    function render(){
        let temp = '';
        arr.forEach(e=>{//得到
            temp += `<div class="file-item">
            <img src="img/folder-b.png" alt="" />
            <span class="folder-name">${e.title}</span>
            <input type="text" class="editor"/>
            <i class=""></i>
        </div>`;
        })//这里的class我吧checked去掉了
        folders.innerHTML = temp ;//将字符串塞给 父元素
    }

    // console.log(arr);//此时得到的数组就是想要的数组
    let arr1 = [];// 设置一个数组放id，
    for(let i = 0;i <arr.length;i++ ){
        arr1.push(arr[i].id)
    }
    // console.log(arr1);//这个是数组id的集合
    //对数组进行字符串的拼接
    let arr2 = [];// 设置一个数组放title
    for(let i = 0;i <arr.length;i++ ){
        arr2.push(arr[i].title)
    }
    // console.log(arr2);

    let fis = Array.from(folders.getElementsByClassName('file-item'))//获取folders子元素的div，为事件做准备（这行有点疑问）
    // console.log(fis);
   
    //利用for循环，给子元素的div绑定事件，为以后的点击做准备
    for(let i=0;i<fis.length;i++){
        fis[i].idnum = arr1[i];//将数据中农的id数组 给元素身上挂上，为了让元素和id数组产生联系
        fis[i].title = arr2[i];//给名字
    }
    // console.log(fis);
    fis.forEach(e =>{
        e.ondblclick = function(){//双击之后，发生如下事件
            // console.log('双击');
            idnum = e.idnum;//获取的id给 
            nameArr.push(e.title);
            console.log(nameArr);
            fn1();//递归
        }
    })

    let is = Array.from(folders.getElementsByTagName('i'));
    // console.log(is);
    let liall = document.getElementById('checkedAll');//获取总选的标签
    is.forEach(e =>{
        e.onclick = function(){//单击之后，
            console.log('单击');
           if(e.className =='checked'){
                e.className ='';
           }else{
               console.log('开关')
                e.className = 'checked';
           }
           judge();  
            // fn1();//递归
        }
    })

    function judge(){//对√进行判断，如果所有的 √全选，全选√加上
        let numm = 0;
        for(let i = 0;i<is.length;i++){
            if (is[i].className == 'checked'){
                numm ++;
            }
        } 
        // console.log(numm);
        if (numm ==is.length){
            liall.className = 'checked';
        }
    }

    liall.onclick = function(){//全选按钮，点击了全选，下边的子元素变成√
       if(this.className =='checked'){// √号的切换
            this.className ='';
            is.forEach(e => e.className = '')//每一个子元素变成  空
       }else{
            this.className = 'checked';
            is.forEach(e => e.className = 'checked')//每一个子元素变成√
       }
    }

    
  
}
fn1();
