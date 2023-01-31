var EventEmitter = require('events').EventEmitter; 
var event = new EventEmitter(); 
// EventEmitter触发和响应事件
// EventEmitter 的每个事件由一个事件名和若干个参数组成，事件名是一个字符串，通常表达一定的语义。
// 对于每个事件，EventEmitter 支持 若干个事件监听器
console.log( (new Date()).getSeconds() );
//触发some_event事件
setInterval(function() { 
    console.log( (new Date()).getSeconds() );
    console.log('发送事件')
    event.emit('some_event', 'arg', 'args'); 
}, 5000); 

//响应some_event事件
event.on('some_event', function(arg1, arg2) { 
    console.log('some_event 事件触发', arg1, arg2); 
}); 