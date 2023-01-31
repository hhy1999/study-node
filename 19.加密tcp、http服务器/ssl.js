var fs = require('fs');
var https = require("https");
// ssl加密通信服务器，可以有多种。比如可以是web服务器，也可能是邮件服务器。
var options = {
    key: fs.readFileSync('./jshaman.com.key'),
    cert: fs.readFileSync('./jshaman.com.pem'),
};


var server = https.createServer(options, function(req,res){
    console.log("connected")
    res.write("welcome");
    res.end();
});

server.listen(8000,function(){
    console.log("server listening");
});