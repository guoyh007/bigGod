// console.log(data.tuijian);

// 点击每一个li标签进行 切换
function render2(i){
    let arr = data.food[0].img[0].big;
    // console.log(arr[i]);
    let temp1="";
    temp1 = `
     <img src=${arr[i]} alt=""/>
    `
    return temp1;
}
//大图
picbox1.innerHTML=render2(0);

let dArr = data.food[0].img[1].small;
function render(){
    let temp = "";
    let num = 0;
    dArr.forEach((e,i)=>{
        // console.log(e);
        temp+=`
        <li class=${num===i?"active":""}>
            <img src=${e} alt="">
        </li>
        `    
    });
    return temp;
};
picbox2.innerHTML = render();

// 文字类
// console.log(data.food[0]);
//默认打开时候显示的内容
let {name,price,serve}=data.food[0];//结构赋值
namelist.innerHTML = `
    <p>
        ${name}
    </p>
    <p>
        ${name}
    </p>
`
//card 价格
pricebox.innerHTML = `
    <span>售价</span>
    <div>
        <span class="price unit">¥</span>
        <span class="price">
            ${price}
        </span>
    </div>
`
// console.log(serve);
function render3(){
   let temp = "";
   let arr = serve;
   arr.forEach((e)=>{
        temp+=`
            <p>
                ${e.checked?`<img src="./img/对号.png" alt="">`:`<img src="./img/警示.png" alt="">`}
                ${e.serve}
            </p>
        `
   })
    return temp
}
servecontent.innerHTML = render3();
//规格
console.log();
function render4(){
    let {detail:arr,guige:arr2}=data.food[0];
    // console.log(arr);
   
    // console.log(arr2);// [数量]
    let temp = "";
    
    function renderx(j){
        let temp1 = "";
        arr.forEach((e,i)=>{
            let name = e.guige[j].name;
            // console.log(e.guige[0].name);
            // console.log(i);
            temp1+=`
                <li>${name}</li>
            `;
            
        });
        return temp1;
    }
   
    arr2.forEach((e,j)=>{// [数量]
        temp+=`
        <div class="name-box">
            <span>${arr2[j]}</span>
            <ul class="type">
                ${renderx(j)}
            </ul>
        </div>   
        `
    })
    return temp;
}
// render4();
detail.innerHTML =  render4();


//产品介绍
function render5(){
    let arr = data.food[0].introduce;
    let temp = "";
    arr.forEach((e)=>{
        temp+=`
            <li>${e.name}</li>
        `
    })
    return temp;
}
titlebox.innerHTML = render5();

//图片的显示：
function render6(i){
    let arr = data.food[0].introduce[i].picture;//0是变量
    let temp = "";
    arr.forEach((e)=>{
        // console.log(e);
        temp+=`
        <img src=${e} alt="">
        `
    })
    return temp;
}
imgcontainer.innerHTML =render6(0); //传入参数0；
titlebox.onclick = function(ev){
    ev.target
};
let lis = Array.from(titlebox.children);
console.log(lis);
lis.forEach((e,i)=>{
    console.log(lis[i]);
    lis[i].onclick = function(){
        active.style.left = 128*[i]+"px";
        imgcontainer.innerHTML =render6(i);
    }
})
