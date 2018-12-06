// console.log('进入rename');
const rename = document.getElementById('rename');
rename.onclick = function(){
    judgeRename = false;//写上这个开关，从而可以让input框可以失焦，不然不会失焦。
    if(seleEleArr.length == 1){
        let id = seleEleArr[0].id//选中的id
        console.log(id);
        let active = folders.getElementsByClassName('active')[0];//获取到被选中的div
        console.log(active);

        let folderName = active.getElementsByClassName('folder-name')[0];
        folderName.style.display ='none';
        console.log(folderName);

        let input =active.getElementsByTagName('input')[0];
        console.log(input);
        input.style.display = 'block';
        input.value = folderName.innerHTML;
        input.select();

        // input.focus();
        let v = '';//设置一个值用来存放处理过的 字符串
        input.oninput = function(){
            v = this.value.trim();
        }
        this.value = v;
        console.log(v);
        // document.onmousedown =function(){
        input.onblur = function(){
            console.log('进入onblur');    
            //如果名字重复
            let arr = getChild(breadNav.getElementsByTagName('span')[0].dataset.id*1)//获取当前层级的所有子文件夹
            let arr1 = arr.filter(e=> e!=seleEleArr[0])//过滤掉被选中的那个，也就是自己
            console.log(arr1);
            let a = arr1.every(e=>e.title!= v );//判断，每一项是否和设置的名字相同
            console.log(a);
            if(v ==''){//输入的名字为空，提示，并让当前的名字未原来的名字
                
                console.log(seleEleArr[0].title);
                v = this.value = seleEleArr[0].title;//原来的名字
                input.style.display = 'none';//input框隐藏
                folderName.style.display = 'block';
                // folderName.innerHTML = v;
                // this.select();//被选择到
                // return
            }else if(a){
                // 页面的渲染
                input.style.display = 'none';//input框隐藏
                folderName.style.display = 'block';//span 显示
                folderName.innerHTML = v;
                seleEleArr[0].title = v;//改变元数据
                seleEleArr[0].checked = false;
                // console.log(seleEleArr[0]);
                render(breadNav.getElementsByTagName('span')[0].dataset.id*1);//页面渲染
                tree.appendChild(renderTree(-1, num));//tree也发变化，需要重新渲染。
            }else{
                alert('文件名重复，请重新输入一个文件名')
            }


            judgeRename = true;//失焦完了之后恢复默认值，（用来阻止默认行为）
        }



    }else{
        alert('请不要选中多个文件夹或者不选')
    }   

}