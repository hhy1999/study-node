console.log( (new Date()).getSeconds() );

// 在node中常用setTimeout实现异步操作
var  time = setTimeout(function(){

    console.log( (new Date()).getSeconds() );
    console.log("hello world");
    
    //延迟一秒执行
    },5000);

// clearTimeout函数，可以清除掉定时器。
// clearTimeout(time)

// 使用bind可以确保这个方法绑定到正确的对象上，这样可以访问到这个对象的内部属性。
function bomb(){
    this.message = "bomb";
}
   
bomb.prototype.explode = function(){
    console.log( (new Date()).getSeconds() );
    console.log(this.message);
}
   
var bomb = new bomb();
setTimeout(bomb.explode.bind(bomb),1000);
console.log(bomb)
clearTimeout(time)


console.log( (new Date()).getSeconds() );
var interval_id = setInterval(function(){

 console.log( (new Date()).getSeconds() );
 console.log("hello world");
 
},1000);
clearInterval(interval_id);