// Nodejs的http模块，是基于net.server，经过c++二次封装，也是nodejs的核心模块。
// 功能比net.server更强，可解析和操作更多细节内容，如值、content-length、请求方法、响应码状态等等，且使用更方便。
const http = require('http')
const { Http2ServerRequest } = require('http2')
//参数：req是请求数据包，res是返回数据包
var server = http.createServer((req, res) => {
    //200是返回码，类型是文本
    res.writeHead(200,{"Content-Type":"text/plain"});

    res.write("Hello Welcome XB");
    res.end();
})

server.listen(8000, () => {
    console.log('server is running in 8000')
})

// 1、引用http模块，并使用createServer方法建立http服务器；
// 2、监听在8000端口。