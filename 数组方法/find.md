# find注意的问题
```
var ages = [3, 10, 18, 20];
let bbb=ages.find((e)=>e>3);
console.log(bbb);//10

1.find的参数为一个函数，函数里边是条件
2.find会遍历数组，但是找到第一个就会终止函数运行，并返回找的元素；

```

