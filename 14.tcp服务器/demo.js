
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

    run_test(1);
});

//模拟一个客户端
function run_test(id){
    var client = net.connect(8000,"127.0.0.1");
    
    client.on("data",function(){
        console.log("id=",id);
    });

    client.on("end",function(){
        console.log("end");
    })
}
