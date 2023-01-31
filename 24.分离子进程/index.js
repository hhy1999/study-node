var cp = require("child_process");

cp.spawn("notepad",[],{detached:true}, function(err,stdout,stderr){
    if(err){
        console.error(err);
    }
    console.log("stdout:",stdout)
    console.log("stderr:",stderr);
});

// 使用execFile、spawn、exec可以打开外部进程并让它单独运行。

// 但如果在某些情况下主进程崩溃了，那么同步进程也会挂起。

// 为了避免这种情况发生、让子进程不受主程序状态影响，那么可以使用子进程分离技术。

// spawn有一个方法可以做到子进程与主进程分离、独立。
// 主程序会启动记事本。即时这时退出nodejs主进程（Ctrl+c），记事本也不会被关闭。