
```
https://www.jb51.net/article/143456.htm
```

```
var user = {};
var defaultName = "狂奔的蜗牛";
Object.defineProperty(user,"name",{
  get:function(){
    console.log("来获取值");
    return defaultName;
  },
  set:function(value){
    console.log("来设置值");
    defaultName = value;
  }
})

console.log(user.name);
user.name = "狂奔的萝卜";
console.log(user.name);
```

```
来获取值
狂奔的蜗牛
来设置值
来获取值
狂奔的萝卜
```



