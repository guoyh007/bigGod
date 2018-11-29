// console.log('进入tree');
let dataArr = [];
for (let i in data) {
    dataArr.push(data[i]);
}
console.log(dataArr);
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