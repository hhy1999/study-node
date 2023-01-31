// 运行一个外部的应用程序，并得到输出结果，那么使用exeFile方法是最直接的
var cp = require("child_process");

cp.execFile("ping",["81.71.15.170"],function(err,stdout,stderr){
    if(err){
        console.error(err);
    }
    console.log("stdout:",stdout)
    console.log("stderr:",stderr);
});
// 1、引用nodejs内置模块child_process；

// 2、用execFile方法调用外部程序。

// execFIle的第一个参数是要调用的程序，

// 第二个参数，需要放在数组里，是传给外部程序的参数。

// 第三个参数是回调函数，在回调中，可以取得外部程序的执行结果