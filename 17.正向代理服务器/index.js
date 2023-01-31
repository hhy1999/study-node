var http = require("http");
var url = require("url");

http.createServer(function(req,res){
    console.log("start request:",req.url);

    var option = url.parse(req.url);
    option.headers = req.headers;

    var proxyRequest = http.request(options, function(proxyResponse){

        proxyResponse.on("data",function(chunk){
            console.log("proxyResponse length",chunk.length);
        });
        proxyResponse.on("end",function(){
            console.log("proxyed request ended");
            res.end();
        })

        res.writeHead(proxyResponse.statusCode,proxyResponse.headers);
    });

    
    req.on("data",function(chunk){
        console.log("in request length:",chunk.length);
        proxyRequest.write(chunk,"binary");
    })

    req.on("end",function(){
        console.log("original request ended");
        proxyRequest.end();
    })

}).listen(8000);
// 整个代码，会建立一个http服务器，并监听8000端口：
// 当接收到请求信息时，从请求头发获取信息并进行转发：
// 以上两点最重要，其余就是对信息输出，以方便我们了解到代理是否生效、代理内容如何等：