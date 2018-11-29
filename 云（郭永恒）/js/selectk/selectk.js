// console.log('进去选框');
const kuang = folderBox.getElementsByClassName('kuang')[0];
console.log(kuang);
const fBox =  document.getElementById('fBox');
// const checkall = document.getElementById('checkall');
// console.log(fBox);
let{targetP,duang} =myTools;
// 鼠标按下
folders.addEventListener('mousedown',function(ev){
    // checkall.className = 'checked';
    // console.log('按下');
    ev.preventDefault();
    //如果down的时候点中了文件夹，就不能让选框出来
    if(targetP(ev.target,'file-item'))return;
    let{left,top} = fBox.getBoundingClientRect();
    // console.log(left,top);
    let fileItem =folders.getElementsByClassName('file-item');
    console.log(fileItem);

    // 点击空白处，清楚所有的选中
    for(let i=0;i < fileItem.length; i++){//这里可能需要把dom改为数据
        fileItem[i].classList.remove('active');//这里需要循环数据
        if(fileItem[i].children[3]){
            fileItem[i].children[3].className = '';
        }//对号清空
        checkall.className = '';
    }
    seleEleArr.length = 0;

/*  */
    let evx1 = ev.pageX;
    let evy1 = ev.pageY;
    let disX = ev.pageX - left;
    let disY = ev.pageY - top;
    // kuang.style.left = disX+'px';//这个left是相对于相对于父盒子的left的值
    // kuang.style.top = disY +'px';
    let num = 0
    // let onnoff = true;
    let move = function(ev){
        // if(!onnoff)return
        // onnoff = false ;
        // num ++;
        // console.log(num);
        kuang.style.display = 'block';//这个原来放到mousedown下边，但是放到move里边好。
        
        ev.preventDefault();
        let l = ev.pageX -disX;
        let t = ev.pageY -disY;
        seleEleArr.length = 0; //这个需要注意，循环完，之后会接着加数组，，可以弄个开关*****
        //盒子的宽高
        kuang.style.width = Math.abs(ev.pageX-evx1)+'px';
        kuang.style.height = Math.abs(ev.pageY-evy1)+'px';
        //盒子的 left和top值
        kuang.style.left = Math.min(disX,ev.pageX - left)+'px';//这个left是相对于相对于父盒子的left的值
        kuang.style.top = Math.min(disY,ev.pageY - top) +'px';

        //碰到的改变盒子的状态，并改变原来数组的状态，checked
        for(let i = 0,len = fileItem.length;i<len;i++){
            if(duang(kuang,fileItem[i])){
                // console.log('j xunhuan');
                fileItem[i].classList.add('active');
                fileItem[i].children[3].className = 'checked';
                seleEleArr.push(data[fileItem[i].dataset.id*1]);
                data[fileItem[i].dataset.id*1].checked =true;
                // console.log(seleEleArr);//3个
            }else{
                fileItem[i].classList.remove('active');
                fileItem[i].children[3].className = '';
                if(data[fileItem[i].dataset.id*1]){
                    data[fileItem[i].dataset.id*1].checked = false;
                }
               
            }
        }

        checkall.className = (seleEleArr.length == fileItem.length)?'checked':'';
        // console.log(checkall.className);
        console.log(seleEleArr);
        console.log(fileItem);
        // onnoff = false
        // onnoff = true ;
    }
    // 如果碰到元素的个数和页面中的文件夹个数相等,说明全选；
    
    

    let up = function(ev){
        kuang.style.width = kuang.style.height = 0;
        kuang.style.display = 'none';
        document.removeEventListener('mousemove',move);
        document.removeEventListener('mouseup',up);
        // onnoff = true ;
    }
    document.addEventListener('mousemove',move);
    document.addEventListener('mouseup',up);
















})