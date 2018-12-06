// console.log('进入delete');
const tanbox = document.getElementById('tanbox');//
const confbtn = tanbox.getElementsByClassName('conf-btn')[0];
const yes = confbtn.children[0];
const no = confbtn.children[1];
console.log(yes);
const del = document.getElementById('del');


//点击删除按钮的时候
del.onclick = function(){
    console.log('del')
    // console.log(seleEleArr);
    
    if(seleEleArr.length == 0){
        alert('请选择一个或多个文件夹')
    }else{
        tanbox.style.display = 'block';

        //点击确定
        yes.onclick = function(){
            //删除原数据中的相应的项。
            seleEleArr.forEach(e=>{
                // let arr = getChild(e.id)//需要先获取子元素再删除，要不然先删除了，就找不到子元素了

                //找到所有的后代
                // let arr2 =[];
                // function fn1(){
                //     let arr = getChild(e.id);
                //     arr.forEach(e=>{
                //         if(e.id){
                //             arr2.push(data[e.id]);
                //         }
                //     })

                // }
                // fn1(e.id)

                // data[e.id] = null;//千万不要用 null来删除对象中的数据，在循环数据的时候回出问题
                delete data[e.id];//他本身需要删掉
            })

            seleEleArr.length = 0;//暂存数据的数组归0
            // console.log(seleEleArr);
            console.log(data);
            
            tanbox.style.display = 'none';
            render(breadNav.getElementsByTagName('span')[0].dataset.id*1);//页面重新渲染
            tree.appendChild(renderTree(-1, num));//树重新渲染
        }

        //点击取消
        no.onclick = function(){
            tanbox.style.display = 'none';
        }


    }


}
