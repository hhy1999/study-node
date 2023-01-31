process.on("message",function(job){
    console.log("worker get msg:",job);
    for(var i=0;i<10;i++){
        console.log("worker send:",job,i);
        process.send("finish job:"+job+i);
    }
    
})