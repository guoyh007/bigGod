let ex = require('express');
let route = ex.Router();
route.get('/',(req,res,next)=>{
    let {id} = req.query;//
    console.log(req.query);
    console.log(id);
    let arr = req.sql;
    let num = null;
    for(let i=0;i<arr.length;i++){
        if(arr[i].id == id){
            num = i
        }
    }
    req.sql.splice(num,1);

    console.log(req.sql);

    res.send({code:0,data:req.sql}); 

   
});  
// route.use('/oo',require('./addoo'));

module.exports = route;