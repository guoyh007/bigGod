// console.log('进入folder')
//获取元素
const folderBox = document.getElementsByClassName('folder-content')[0];
const folders = folderBox.getElementsByClassName('folders')[0];
const breadmenu = folderBox.getElementsByClassName('breadmenu')[0];
const checkall = folderBox.getElementsByClassName('checkall')[0].children[0];//i标签 
const breadNav = folderBox.getElementsByClassName('bread-nav')[0];
const fEmpty = folderBox.getElementsByClassName('f-empty')[0]; 

let seleEleArr = [];
const {getChild,getParent,getParents} = myTools;
function render(id){
    folders.innerHTML = '';
    let arr = getChild(id);
    // console.log(arr);
    if(!arr){
        // console.log(111);
        fEmpty.style.display = 'block'; 
    }else{//拿到了对象
        // console.log(333);
        fEmpty.style.display = 'none'; 
        arr.forEach((e,k)=>{
            // console.log(333);
            let div = document.createElement('div');
            div.className = e.checked?'file-item active':'file-item';
            div.dataset.id = e.id;

            let img = new Image;
            img.src ='img/folder-b.png';
            img.alt = '';
            //双击进入子元素，重新渲染
            img.ondblclick = function(){
                // getChild(e.id);
                render(e.id);
                renderMenu(e.id);
            }

            
            // 文件的名字
            let span = document.createElement('span');
            span.className = 'folder-name';
            span.innerHTML = e.title;
            
            //重命名要用的
            let input = document.createElement('input');
            input.type = 'text';
            input.className = 'editor';
           
            //是否选中
            let i = document.createElement('i');
            i.className = e.checked?'checked':'';//none
            i.onclick =function(){
                // console.log('i标签点击事件')
                //显示√，并且元数据发生改变,需要页面渲染一下
                data[e.id].checked = !data[e.id].checked;//
                render(id);
                // e.checked = !e.checked
                // i.className = e.checked?'':'checked';//这行代码是错误的
            }
            //添加元素
            div.appendChild(img);
            div.appendChild(span);
            div.appendChild(input);
            div.appendChild(i);
            //将数据放到folders里边
            folders.appendChild(div);
        })
    }
}
render(0);
