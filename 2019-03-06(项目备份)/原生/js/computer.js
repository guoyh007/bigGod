// console.log(data.computer);
function render(){
    let arr = data.computer;
    let temp = "";
    arr.forEach((e)=>{
        let src = e.img[0].src;
        // console.log(src);
        let name = e.name.substring(0);
        let price = e.price;
        temp+=`
        <li class="box1">
            <div class="img-box">
                <img src=${src} alt="">
                <p>
                    电竞级性能怪兽，多核性能计算...
                </p>
            </div>
            <div class="name-box">
                <div>
                    ${e.down!==""?`<span>直降${e.down}元</span>`:""}
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
pcbox.innerHTML = render();