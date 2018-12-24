let ex = require('express');
let route = ex.Router();
route.get('/',(req,res,next)=>{
    let {s0,s1} = req.query;
    //s1=2从高到低，s1=1从低到高
    if(s1==1){s1=-1}//值为负数，从而好排序
    //如果是id排序
    if(s0=='id'){
        function compare(a,b){
            if(s1==-1){
                return  a.id*1 - b.id*1;
            }else{
                return  b.id*1 - a.id*1;
            }
           
        }

        req.sql.sort(compare) 
    }

    if(s0=='price'){
        function compare(a,b){
            if(s1==-1){
                return a.age*1 - b.age*1;
            }else{
                return b.age*1 - a.age*1;
            }
        }

        req.sql.sort(compare) 
    }

    res.send({code:0,data:req.sql}); //发送给前端
});  
// route.use('/oo',require('./addoo'));

module.exports = route;