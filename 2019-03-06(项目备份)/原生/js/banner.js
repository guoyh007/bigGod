//导航目录
let bannerArr = data.banner; //这个是数据
let temp = "";
let len = bannerArr.length;
let arr2 = bannerArr.slice(1,len-1);
// console.log(arr2);
function render(i){
    let {nameArr} = bannerArr[i];
    temp+=`
        <li>
            <span>
                <a href="">${nameArr}</a>
            </span>
        </li>
    `;
    return temp;
}
//第一行内容
render(0);
let len2 = len-2;
//将中间的数组截取出来
for(let i=0;i<len2/2;i++){
    let arr = arr2.slice(2*i,2*(i+1));
    // let arr = arr2.slice(0,2);
    // console.log(arr);
    temp+=`
        <li>
            <span>
                <a href="">${arr[0].nameArr}</a>    
            </span>
            <span>
                <span>/</span>
                <a href="">${arr[1].nameArr}</a>
            </span>
        </li>
    `
};
//加上最后一行数据
render(len-1);  
bannerContainer.innerHTML = temp;

// 鼠标移过每一个li标签，显示内容弹框
let lis = Array.from(bannerContainer.children);
// console.log(lis);

//详细内容显示
lis.forEach((e,i)=>{
    // console.log(lis.length);9
    lis[i].onmouseenter = function(){
        navDetail.style.display = "block";
        //和数据产生联系
        let temp = "";
        //数据
        function render(i){
            let temp1 = "";
            let contentArr = bannerArr[i].content;
             let name = bannerArr[i].nameArr;
            contentArr.forEach((e)=>{
                temp1+=`
                    <li>
                        <img src=${e.src} alt="">
                        <span>${e.name}</span>
                    </li>
                `         
            });
            let temp11 = "";
            temp11+=`
                <div>
                    <p>${name}</p>
                    <ul>
                        ${temp1}
                    </ul>
                </div>   
            `;
            return temp11
        }
        if(i==0){
            temp+=render(0);
        }else if(i<lis.length-1){//不是第一个和最后一个的
            let temp1 = "";
            let arr = [bannerArr[2*i-1],bannerArr[2*i]];
            console.log(arr);
            arr.forEach((e)=>{
                e.content.forEach((e)=>{
                    temp1+=`
                        <li>
                            <img src=${e.src} alt="">
                            <span>${e.name}</span>
                        </li>
                    ` 
                })
                let temp11 = "";
                temp11+=`
                    <div>
                        <p>${e.nameArr}</p>
                        <ul>
                            ${temp1}
                        </ul>
                    </div>   
                `;
                temp+=temp11;  
            });
        }else{//最后一个 对应另个一数组的最后一个
            temp+=render(len-1);
        };
        navDetail.innerHTML = temp;
    };
    lis[i].onmouseleave = function(){
        navDetail.style.display = "none";
    };
   
});
navDetail.onmouseenter = function(){
    navDetail.style.display = "block";
}
navDetail.onmouseleave = function(){
    navDetail.style.display = "none";
}
// 导航目录完毕 children.onclick

//轮播开始 ，点击按钮左轮播
let num = 0;
leftBtn.onclick = function(){
    // console.log("left");
    num++;
    if(num>=4){
        num=0;
    }
    bannerInner.style.left = -num*859+"px";
}
//点击按钮右边轮播
rightBtn.onclick = function(){
    console.log("right");
    num--;
    if(num<0){
        num=4;
    }
    bannerInner.style.left = -num*859+"px";
}


