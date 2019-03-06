// console.log(data.limit);
function render(){
   let temp = "";
   let arr = data.limit;
   arr.forEach((e)=>{
       let num = (e.price/e.price1).toFixed(1);
    //    console.log(e.name);
       let name =e.name.substring(0,11)+"...";
       let src = e.img[0].src
        temp+= `   
            <div>
                <div class="img-tag">
                    <span>${num}折</span>
                </div>
                <img src=${src} alt="">
                <div class="price">
                    <p class="pro-info">${name}</p>
                    <p class="pro-price">
                        <span class="pro-unit">￥</span>
                        <span class="now-price">${e.price}</span>
                        <span class="market-price">
                            <span>￥</span>
                            <span>${e.price1}</span>
                        </span>
                    </p>
                </div>
            </div>
        `
   })
    return temp;
}
limitContainer.innerHTML = render();

let numL = 0
limitL.onclick = function(){
    // console.log("L");
    numL ++;
    if(numL>=6){
        numL=6
    };
    limitContainer.style.left = -278*numL+"px"; 
};
limitR.onclick = function(){
    // console.log("R");
    numL --;
    if(numL<=0){
        numL=0
    };
    limitContainer.style.left = -278*numL+"px"; 
};
