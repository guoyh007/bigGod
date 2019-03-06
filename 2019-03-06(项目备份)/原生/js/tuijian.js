// console.log(data.tuijian);
let tArr = data.tuijian;
function render(){
    let temp = "";
    tArr.forEach((e)=>{
        // console.log(e.img[0].timg);
        temp+=`
            <div>
                <div class="recommend-container">
                    <p class="pro-info">${e.title1}</p>
                    <p class="pro-desc fontcolor-fade">${e.title2}</p>
                </div>
                <img src=${e.img[0].timg} alt="">
            </div>
        `    
    });
    return temp;
};
recommend.innerHTML = render();
console.log(recommend.innerHTML);