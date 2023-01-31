var http = require("http");
var makePool = require("./pooler");
var runJob = makePool("./worker");

http.createServer(function(req,res){
    runJob("some dummy job",function(er,data){
        console.log("father callback get:",data);
        if(er){
            return res.end("get an error:"+er.message)
        }
        res.end("work pool");
    })
    
}).listen(8000)