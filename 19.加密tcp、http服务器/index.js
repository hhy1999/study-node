// 用Nodejs的TLS模块、用net.createServer（）可法，创建一个加密通讯的TCP服务器（https服务器）
// 进行SSL通信，SSL公钥、私钥证书是必备的。
// 当前，免费ssl证书的获取方法已经很多，不过一般只能获取独立网站的证书。
// key文件是服务器私钥文件，pem文件是服务器证书key。
var tls = require('tls');
var fs = require('fs');
// options，这个参数中包含了私钥和证书内容，在创建服务器时会将这个参数传入。
var options = {
    key: fs.readFileSync('./jshaman.com.key'),
    cert: fs.readFileSync('./jshaman.com.pem'),
};


var server = tls.createServer(options, function(cleartextStream){
    console.log("connected")
    cleartextStream.write("welcome");
    cleartextStream.setEncoding("utf8");
    cleartextStream.pipe(cleartextStream);
});

server.listen(8000,function(){
    console.log("server listening");
});