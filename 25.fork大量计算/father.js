var cp = require("child_process");

var child = cp.fork("./child");

child.on("message",function(msg){
    console.log("[father get msg]:",msg);
})

child.send("msg from father");