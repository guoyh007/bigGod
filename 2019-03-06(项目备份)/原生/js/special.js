// console.log(data.special);
function render(){
    let arr = data.special;
    let temp = "";
    arr.forEach((e)=>{
        let src = e.src;
        let name = e.name.substring(0,15);
        let title = e.title.substring(0,15)+"...";
        let price = e.price;
        // console.log(src);
        temp+=`
            <li class="box1">
                <div class="img-box">
                    <img src=${src} alt="">
                    <p>
                        ${title}
                    </p>
                </div>
                <div class="name-box">
                    <div>
                        <span></span>
                    </div>
                    <p class="title">
                        ${name}
                    </p>
                    <p class="price">
                        <span>¥</span>
                        <span class="price-num">${price}</span>
                        <span>起</span>
                    </p>
                </div>
            </li>
        `
    });
    return temp;
}
special.innerHTML = render(); 