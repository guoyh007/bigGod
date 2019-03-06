let selects = document.getElementsByClassName('select');
//点击切换
for(let attr of selects){
    console.log(attr);
    attr.onclick = function(){
        let result = this.className==="select active";
        this.className = result?"select":"select active";
    }
    
}
/* 购物车 点击删除 出现框 */
del.onclick = function(){
    ensure.style.display = "block";
}

/* 确定删除？对话框 */
ensure.onclick =  function(ev){
    let T = ev.target;
    // console.log(T.innerHTML);
    // console.log(T.innerHTML==="确定");
    let key = ev.target.nodeName;
    if(key==='A'){
        ensure.style.display = "none";
    };
    if(T.innerHTML.trim()==="确定"){
        console.log('确定事件');
    };
    if(T.innerHTML.trim()==="取消"){
        console.log('取消事件');
    };
}