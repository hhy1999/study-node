// net模块是nodejs内置的基础网络模块，通过使用net，可以创建一个简单的tcp服务器。
var net =require("net");

//初始化客户端连接数量
var clients = 0;

var server = net.createServer(function(client){

    //客户端数量
    clients ++;
    var client_id = clients;

    console.log("client connected:",client_id);

    //断开连接
    client.on("end",function(){
        console.log("client disconnected:",client_id);
    })

    //发信息给连接客户端
    client.write("welcome client:"+client_id+"\r\n");
    client.pipe(client);
});

server.listen(8000,function(){
    console.log("server started on port 8000");
});