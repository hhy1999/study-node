var http = require("http");

var req = http.request("http://127.0.0.1:8000",function(res){
    console.log("http headers:",res.headers);

    res.on("data",function(data){
        console.log(res.statusCode);
        console.log("body",data.toString());
    })
});

req.end();

// 1、使用http.request方法连接本机8000端口;
// 2、在连接请求回调函数中，输出返回的数据头、以及返回的数据内容；
// 3、req.end()方法必须调用，否则请求不会发出。