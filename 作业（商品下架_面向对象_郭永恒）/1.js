// console.log(1);//进入i
let num = 1;
console.log(new Date("2017/12/07 17:00:00"));
let sum = 0;//总价格初始值
let all = document.getElementsByClassName('all')[0];
//用面向对象写4个li
function Box(tagName, i) {
    this.ul = document.getElementsByTagName(tagName)[0];
    this.li = this.ul.getElementsByTagName('li')[i];
    // console.log(1);
    this.index = i+1;
    this.btn = this.li.getElementsByTagName('input')[1];//按钮
    this.timer = null;//定时器
    this.times = this.li.getElementsByClassName('times')[0];//时间显示
    this.shadow = this.li.getElementsByClassName('bg')[0];//阴影
    this.gaizhang = this.li.getElementsByClassName('big-c')[0];//盖章
    this.name = this.li.getElementsByTagName('h5')[0].innerText;//获取当前商品的名字
    this.price = this.li.getElementsByClassName('price')[0].innerText;//获取当前的价格
    this.img = this.li.getElementsByTagName('img')[0];//获取当前图片
    this.footer = document.getElementById('footer');//最后一行显示
    // this.content =
    //下架后显示的内容
}
//在构造函数原型下挂，点击事件。evName进行传参。
Box.prototype.events = function (evName) {
    let that = this;
    this.btn[evName] = function () {
        that.display();
    }
}
//变化方法：如下，change
Box.prototype.change = function () {
    //下边两个可以一起再挂在原型下
    this.shadow.style.display = 'block';//时间到了，遮罩
    this.gaizhang.style.visibility = 'visible';//时间到了，盖章显示
    this.gaizhang.style.transform = 'scale(1)';//时间到了，章由大到小
    // this.
}
// //在构造函数原型下挂，chang事件。定时器启动，数字变动
// Box.prototype.change = function () {
// }
//在构造函数原型下挂，自定播放事件；
Box.prototype.display = function () {
    let that = this;
    this.newDate = new Date(this.li.getElementsByTagName('input')[0].value);//获取未来的时间,这个是字符串
    // console.log(this.newDate);
    function tfn() {//定时器函数
        let nowDate = new Date();//现在的时间
        console.log(nowDate);
        let t = Math.floor((that.newDate - nowDate) / 1000);
        if (t < 0) {//如果未来十几件-现在时间小于0，说明现在的时间超过了设置的时间，所以关闭定时器
            clearInterval(that.timer);
            that.timer = null;
            that.change();//下架之后，最后一行弹出列表
            sum += parseInt(that.price.substring(1));//下架之后进行总计
            all.innerHTML = "总计:" + sum;//总计在最下边显示
            num++;//每关闭一个定时器，数字增加1
            that.add(num,that.index);//计时结束，最后一行增加一行信息。
        } else {
            console.log(1);//已经进入
            let d = Math.floor(t / 86400);
            t %= 86400;
            let h = Math.floor(t / 3600);
            t %= 3600;
            let m = Math.floor(t / 60);
            t %= 60;
            function tDouble(n) {
                return n < 10 ? '0' + n : '' + n;
            };
            let H = tDouble(h);//返回值是一个字符串
            let M = tDouble(m);//返回值是一个字符串
            let T = tDouble(t);//返回值是一个字符串
            //将times中的数字进行改变
            that.times.innerHTML = `<p class="times">剩余
            <span>${H.substr(0, 1)}</span>
            <span>${H.substr(1, 1)}</span>
            <strong>:</strong>
            <span>${M.substr(0, 1)}</span>
            <span>${M.substr(1, 1)}</span>
            <strong>:</strong>
            <span>${T.substr(0, 1)}</span>
            <span>${T.substr(1, 1)}</span>
        </p>`;
        }
    }
    tfn();
    this.timer = setInterval(tfn, 1000);
}

//最后一行增加东西
Box.prototype.add = function (n,i) {
    let content = ` <ul class="style${(n % 2) + 1}">
    <li class="li1">${this.name}</li>
    <li class="li2">${this.price}</li>
    <li class="li3"><img src="img/${i}.jpg"></li>
</ul>`;//下架之后增加的内容${this.img},这里有个问题**********************************
    this.footer.innerHTML += content;
    // console.log(1);
}

//第一个box
let box = new Box('ul', 0);
box.events('onclick');
//第二个box
let box1 = new Box('ul', 1);
box1.events('onclick');
//第三个box
let box2 = new Box('ul', 2);
box2.events('onclick');
//第四个box
let box3 = new Box('ul', 3);
box3.events('onclick');


