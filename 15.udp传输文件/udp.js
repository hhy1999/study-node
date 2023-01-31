// 一个udp服务器、一个udp客户端，并实现客户端发送文件给服务器。
// 1、dgram是nodejs的内置模块，提供了 UDP 数据包 socket 的实现。
// 2、server（）函数提供了监听和消息响应方法，当接收到数据时，会进行输出显示。
var dgram = require("dgram");
server();

function server(){
    var socket = dgram.createSocket("udp4");

    socket.on("message",function(msg,rinfo){
        process.stdout.write(msg.toString());
    });

    socket.on("listening",function(){
        console.log("server ready:",socket.address());
    });

    socket.bind(8000);
}