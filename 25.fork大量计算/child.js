process.send("msg from child");

process.on("message",function(msg){
    console.log("[child get msg]:",msg);
}) 