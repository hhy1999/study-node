
// 流是node最强大的功能之一，是一个抽象接口，很多对象皆实现此接口
// 例如，对http 服务器发起请求的request 对象就是一个 Stream，还有stdout（标准输出）等。

/**
 * 流的四种类型
 * dable - 可读操作。
 * Writable - 可写操作。
 * Duplex - 可读可写操作.
 * Transform - 操作被写入数据，然后读出结果。
 * 
 * 流的事件
 * 所有的流对象都是 EventEmitter 的实例，流常用的事件有：
 * data - 当有数据可读时触发。
 * end - 没有更多的数据可读时触发。
 * error - 在接收和写入过程中发生错误时触发。
 * finish - 所有数据已被写入到底层系统时触发。
 * 
 * 1、当使用fs.readFileSync同步读取一个文件的时候，所有的数据会被全部读到内存中，这个操作过程中程序会被阻塞。
 * 2、如果使用fs.readFile，由于它是异步方法，那么阻塞不会发生，但数据仍会被全部读到内存中再处理。
 * 当处理大文件压缩、媒体文件等的时候，无疑会很吃力。那么这时，就是使用流的时候了。
 * 3、流会将分批次的读取适量的内容到缓存区进行操作，而不是一次性读取所有目标内容。
 * 这样，程序对内存的使用量会极大减少、执行性能会提升很多：
 */

//  var http = require("http");
//  var fs = require("fs");
 
//  http.createServer(function(req,res){
//      fs.readFile(__dirname + "../09.EventEmitter事件/EventEmitter.js",function(err,data){
//          if(err){
//              res.statusCode = 500;
//              res.end(String(err));
//          }else{
//              res.end(data);
//          }
//      })
//  }).listen(8000);

var http = require("http");
var fs = require("fs");
var zlib = require("zlib");

http.createServer(function(req,res){
    console.log('server is running in 8000')
    res.writeHead(200,{"content-encoding":"gzip"});

    fs.createReadStream(__dirname+"/index.html").pipe( zlib.createGzip() ).pipe(res);

}).listen(8000);
