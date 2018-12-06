console.log('进入creat');
const create = document.getElementById('create');
create.onclick = function(ev){
    // console.log('1111')
    ev.cancelBubble = true;
    // cancelBubble
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
    div.appendChild(img);
    div.appendChild(span);
    div.appendChild(input);
    div.appendChild(i);
    // console.log(div);

    folders.appendChild(div);

    input.value = '新建文件夹';
    input.select();
    input.focus = function(){//聚焦事件：聚焦时候，输入框的内容为空
        console.log('聚焦');
        input.value = '';
    };
    input.onclick = function(){//点击的时候聚焦
        input.focus();
    }
    input.oninput = function(){//输入的时候
        // this.value ='';
        console.log('输入');
        let v = this.value.trim();
        // console.log(v);
        //点击文档的时候
        document.onclick = function(){
            
            if(v ==''){//名字为空
                alert('名字不能为空,请重新输入一个文件夹名字');
            }else{//名字不是空
                let arr = getChild(id);//获取 子元素 title
                let result = arr.every(e=>e.title != v);//如果子元素中有
                console.log(result);
                if(v!=''&& result){//输入的文件夹名字不是空字符串的 && 名字不和其他名字相重复的时候，input框隐藏，span显示
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

                }else{
                    alert('名字重复,请重新输入一个新名字');
                }
            }
           
        }
       


        
    }


    
  
    
}
