console.log('进入creat');
const create = document.getElementById('create');
let num1 = 0;//用于新建文件夹的重名
create.onclick = function(ev){
    // console.log('1111')
    ev.cancelBubble = true;
    // cancelBubble
    judgeRename = false;//写上这个开关，从而可以让input框可以失焦，不然不会失焦。
    //页面渲染：
    let id = breadNav.getElementsByTagName('span')[0].dataset.id*1//获取父 id（用来找子）；
    let div = document.createElement('div');
    div.className = 'file-item';
    let img = document.createElement('img');
    img.src = 'img/folder-b.png';
    let span = document.createElement('span');
    span.className="folder-name";
    span.style.display = 'none';

    let input = document.createElement('input');
    input.type = 'text';
    input.className = 'editor';
    input.style.display = 'block';

    let i = document.createElement('i');
    i.className = '';
    div.appendChild(img);
    div.appendChild(span);
    div.appendChild(input);
    div.appendChild(i);
    // console.log(div);

    folders.appendChild(div);
    input.value = '新建文件夹';
    let v1 = input.value;
    input.select();
   
    input.focus = function(){//聚焦事件：聚焦时候，输入框的内容为空
        console.log('聚焦');
        input.value = '新建文件夹';
        
       
    };
    let v = '新建文件夹';

    input.oninput = function(){//输入的时候
        console.log('输入');
        v = this.value.trim();
    }
    // console.log(v);

    input.onclick = function(){//点击的时候聚焦
        input.focus();
    }


    //失去焦点事件
    input.onblur = function(){
        console.log('失焦');
        console.log(v);
        // if(v =='新建文件夹'){//名字为空
        //     // console.log(v1);
        //     v = v1;
        //     console.log(v);
        //     this.select();
        //     // return
        // }else{//名字不是空
            console.log('进去else');

            let arr = getChild(id);//获取 子元素 title
            let result = arr.every(e=>e.title != v);//如果子元素中有
            console.log(result);
            if(v!=''&& result){//输入的文件夹名字不是空字符串的 && 名字不和其他名字相重复的时候，input框隐藏，span显示
                display();
                // span.style.display = 'block';
                // span.innerHTML = v;
                // input.style.display = 'none';
                
                // // 数据的更改：
                // let idnew = +new Date;
                // data[idnew] = {
                //     "id": idnew,
                //     "pid": id,
                //     "title": input.value,
                //     "type": "file",
                //     "checked":false
                // }
                // console.log(data);
                // render(id);//将更新的数据重新渲染到页面上
                // tree.appendChild(renderTree(-1, 0));//tree也发变化，需要重新渲染。
            }else{
                num1 ++;
                console.log(num1);
                
                v = v +`${num1}`;
                display()
                

            }
        // }aaaaaaaaaaaaaa
        judgeRename = true;
        // console.log(data);
    }
       
//
    function display(){
        span.style.display = 'block';
        span.innerHTML = v;
        input.style.display = 'none';
        
        // 数据的更改：
        let idnew = +new Date;
        data[idnew] = {
            "id": idnew,
            "pid": id,
            "title": input.value,
            "type": "file",
            "checked":false
        }
        console.log(data);
        render(id);//将更新的数据重新渲染到页面上
        tree.appendChild(renderTree(-1, 0));//tree也发变化，需要重新渲染。
    }
    
  
    
}








// const create = document.getElementById('create');
// create.onclick = function(){
//     // console.log(data);
//     fEmpty.style.display = 'none';
//     let id = breadNav.getElementsByTagName('span')[0].dataset.id*1;
//     console.log(id)
//     let div = document.createElement('div');
//     let v = ''; //默认的新建文件夹编号
//     div.className = 'file-item';

//     let img = new Image();
//     img.src = 'img/folder-b.png';

//     //重命名要用的
//     let input = document.createElement('input');
//     input.type = 'text';
//     input.className = 'editor';
//     // log(data[id]);
//     if(!data[id].num.length){
//         data[id].num.push(0);
//     }else{
//         /*
//             [0,1,3]
//         */
//         // console.log(data[id].num);
//         for(let i=0;i<data[id].num.length+1;i++){
//             // if(num + 1 != data[id].num[i+1]){}
//             if(data[id].num[i] === undefined){
//                 data[id].num[i] = i;
//                 v = i;
//                 break;
//             }
//         }
//     }
//     // log(data[id].num);
//     if(v === 0)v = '';
//     input.value = '新建文件夹' + v;

//     input.style.display = 'block';

//     input.onblur = function(){
//         let id = breadNav.getElementsByTagName('span')[0].dataset.id*1;
//         let arr = getChild(id);
//         let o = arr && arr.some(e=>e.title == this.value);
//         if(o){
//             console.log('又重了');
//             this.value = '新建文件夹' + v;
//             input.select();
//             return;
//         }
//         let idn = +new Date;
//         if(v==='')v = 0;
//         data[idn] = {
//             "id": idn,
//             "pid": id,
//             "title": input.value,
//             "type": "file",
//             "checked":false,
//             "create":v,
//             "num":[]
//         }
//         render(id);
//     }
//     let span = document.createElement('span');
//     //是否选中
//     let i = document.createElement('i');
//     i.className = '';
//     div.appendChild(img);
//     div.appendChild(span);
//     div.appendChild(input);
//     div.appendChild(i);
    
//     folders.appendChild(div);
//     input.select();
// }
