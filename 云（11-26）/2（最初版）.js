console.log(1);//点进去，显示文件夹
let bd = document.getElementsByClassName('bread-nav')[0];//这个是父元素的标签
let folders = document.getElementsByClassName('folders')[0];//这个是显示的子元素的标签
// let fis = Array.from(folders.getElementsByTagName('file-item'));//获取子元素的div，为事件做准备（这行有点疑问）
// console.log(fis);
let num = 0;
// bd.innerHTML = `<a >${data[num].title}</a><span>${data[++num].title}</span>`;
function fn1(){
    //双击之后的事件
    let temp1 = '';
    for(let i= 1;i<num+1;i++){
        temp1 += `<span>${data[num].title}</span>`
    }
    bd.innerHTML = `<a >${data[0].title}</a>`+ temp1;//显示当前的父级元素
    // console.log(bd);

    //对父级元素以下的子元素进行查找idnum
    let arr = [];//设置一个空数组，找到子元素就往里边加
    for(let i in data){//加入这里num是1
        if(data[i].pid == data[num].pid+1  ){//某一个等于下一个pading  0-  -1
            arr.push(data[i]);
            // data[i].checked = true;//代表找到他
        }
    }
    //对数组进行字符串的拼接
    let temp = '';
    arr.forEach(e=>{
        temp += `<div class="file-item">
        <img src="img/folder-b.png" alt="" />
        <span class="folder-name">${e.title}</span>
        <input type="text" class="editor"/>
        <i class="checked"></i>
    </div>`;
    //给每个子元素绑定事件
        // e.onclick = function(){
        //     num++;
        //     fn1();
        //     console.log(num);
        //     console.log(1);
        // }
    })
    folders.innerHTML = temp ;//将字符串塞给 父元素

    let fis = Array.from(folders.getElementsByClassName('file-item'))//获取子元素的div，为事件做准备（这行有点疑问）
    console.log(fis);
    //利用for循环，给子元素的div绑定事件，为以后的点击做准备
    fis.forEach(e =>{
        e.ondblclick = function(){
            console.log('双击');
            num++;//每次点击为下一次做准备pid
            //假装给了一个 idnum=2
            fn1();
        }
    })
}
fn1();



// bd.onclick = function(ev){

// }