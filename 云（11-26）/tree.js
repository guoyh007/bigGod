// console.log('进入tree');
let dataArr = [];
for (let i in data) {
    dataArr.push(data[i]);
}
// console.log(dataArr);// 先把对象放到数组里边

let pidnum = 0;//设定一个初始值，将它设置为一个参数，方便以后修改
let restarr = dataArr.filter(e => e.pid >=pidnum);//先把数组中pid>0的过滤出来
let headarr = dataArr.filter(e => e.pid < pidnum);//先把数组中pid<0的过滤出来
console.log(restarr);
console.log(headarr);
let temp = '';
//利用两个for循环，将第二组的每一项和第一组的每一项进行比较
// let num = 0;//num用来判断进了多少次循环
temp += `<ul>`;
temp += `<li>
    <div class="tree-title tree-ico open">
    <span><i></i>${headarr[0].title}</span>
    </div>`;
function xh(){
    let restarr1 = restarr;//这里的它是一个炮灰，是来承接每次循环判断之后的结果
    for(let i = 0;i <headarr.length;i++){
        // num ++;
        // console.log(num);
        let headarr1 =[];//设置一个空数组用来接收找到符合条件restarr[j]，为下一次的父级，这个let在哪里申明，有待试验
        if(restarr.length >=1){//剩余数组等于1的话
            for(let j = 0;j <restarr.length;j++){
                if( restarr[j].pid == headarr[i].id){
                    headarr1.push(restarr[j]);
                    restarr1.filter(e => e!= restarr[j])//这里有点迷惑
                    temp += `<ul>`;
                    temp += `<li>
                        <div class="tree-title tree-ico open">
                        <span><i></i>${restarr[j].title}</span>
                        </div>`;
                    // xh();
                    temp += `</li>`;
                    temp += `</ul>`;
                }
            }
        }else{
            return temp;
        }
        
        headarr = headarr1;//里边的循环结束，后将找到的做为下一次的父级
        
        restarr = restarr1; //循环完了之后，将产生两个新数组进入下个循环
        console.log(headarr);
        console.log(restarr);
    }
    
    return temp;
}
xh();
console.log(temp);
temp += `</li>`;
temp += `</ul>`;
   


let tree = document.getElementsByClassName('tree-menu')[0];
tree.innerHTML = temp;

// function render(dataArr){
//     console.log('进入函数')
//     let temp = '';
//     let id = 0;
//     let pid = -1;
//     dataArr.forEach(e=> {
//         // console.log(e);
//         if(e.pid == pid ){
//             temp += `<ul>`;
//             temp += `<li>
//             <div class="tree-title tree-ico open">
//                 <span><i></i>${e.title}</span>
//             </div>`;

//             if(e.pid == id){//如果下边有则继续加 ul
//             temp += Fn10();
//             console.log('进if');
//             }

//             temp += `</li>`;
//             temp += `</ul>`;
//         }
//     });
//     return temp;

// }










/*
// for(let i in dataArr){
//     console.log(i);
// }
let tree = document.getElementsByClassName('tree-menu')[0];
// function render(dataArr){
//     console.log('进入函数')
//     let temp = '';
//     let id = 0;
//     let pid = -1;
//     dataArr.forEach(e=> {
//         // console.log(e);
//         if(e.pid == pid ){
//             temp += `<ul>`;
//             temp += `<li>
//             <div class="tree-title tree-ico open">
//                 <span><i></i>${e.title}</span>
//             </div>`;

//             if(e.pid == id){//如果下边有则继续加 ul
//             temp += Fn10();
//             console.log('进if');
//             }

//             temp += `</li>`;
//             temp += `</ul>`;
//         }
//     });
//     return temp;

// }


let temp = '';
// let pidnum = -1;//这定一个初始值
// let id = 0;//设置一个id的值用来接收找到的id
let idarr = [0]; //这是一
let objarr = []; //设置一个空对象，用来接收找到的对象
let judge = true; //设置一个初值值，找到就是true，找不到就是false；
let num = 1;

function Fn10() { //利用递归做字符串的拼接
    console.log('xx');

    function fn11() {
        for (let i in data) {

            // for(let i =0;i<objarr.length;i++ ){//利用for循环得到找到的数组的每个id
            //     id = objarr[i].id;//
            // }
            for (let j = 0; j < objarr.length; j++) { //利用for循环得到找到的数组的每个id
                // objarr[i].id;//
                fn11();
            }
            if (data[i].pid == objarr[j].id) { //找到第一次
                console.log(data[i]);
                objarr.push(data[i]); //这个是找到的数据
                for (let j = 0; j < objarr.length; j++) { //利用for循环得到找到的数组的每个id
                    // objarr[i].id;//
                    fn11();
                }

            } else { //找不到就是false
                judge = false;
            }
        }
    }


    temp += `<ul>`;
    temp += `<li>
    <div class="tree-title tree-ico open">
        <span><i></i>${obj.title}</span>
    </div>`;
    idarr = null; //用完里边数据之后销毁
    objarr = null; //用完里边数据之后销毁

    if (judge) { //如果下边有则继续加 ul
        temp += Fn10();
        console.log('进if');
    }
    temp += `</li>`;
    temp += `</ul>`;
    return temp;
}
Fn10();

// tree.innerHTML = render(dataArr);
tree.innerHTML = Fn10();

//先注释以后有用
// let lis =Array.from(document.getElementsByTagName('li')) ;//先获取以下，不一定写在这里
// lis.forEach(e =>{//为每一个li标签添加点击事件
//     e.onclick = function(){
//         if('子集存在'){
//             //子集.style.display = 'block';
//         }
//     }       
// })
 */
