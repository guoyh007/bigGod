backTotop.onclick = function(ev){
    // console.log('回到顶部');
    let time = window.pageYOffset;
    let timer = null;
    (function animate(){
        timer = requestAnimationFrame(animate);
        
        time -= 100;
        
        if(time <= 0){
            time = 0;
        }
        window.scrollTo(0,time);

        if(time == 0){
            cancelAnimationFrame(timer);
        }
    })();
 
}

/* 登录注册  弹出block */
let loginx = document.getElementById('login-business');
login.onclick = function(){
    console.log(loginx);
    loginx.className = "show";
};

/* x 号，关闭窗口 */
let close =loginx.getElementsByClassName('m-icons-close')[0];
close.onclick = function(){
    loginx.className = "hidden";
};