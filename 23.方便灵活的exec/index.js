var cp = require("child_process");


// var netstat = cp.spawn("netstat",["-an"]);
// var echo = cp.spawn("cmd",["echo"]);

// netstat.stdout.pipe(echo.stdin);
// echo.stdout.pipe(process.stdout); 

cp.exec("echo | netstat -an",function(err,stdout,stderr){
    if(err){
        console.error(err);
    }
    console.log("stdout:",stdout)
    console.log("stderr:",stderr);
});