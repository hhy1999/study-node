var cp = require("child_process");

var netstat = cp.spawn("netstat",["-an"]);
var echo = cp.spawn("cmd",["echo"]);

netstat.stdout.pipe(echo.stdin);
echo.stdout.pipe(process.stdout);

// 1、dir和echo两个变量，分别是进行netsta和echo命令的执行。

// 2、netstat.stdout.pipe(echo.stdin)是将netstat的执行结果，通过管道输出给echo的输入。

// 3、再用echo.stdout.pipe(process.stdout)将echo的输出内容，以管道输出给process.stdout，以实现将内容打印到命令行中。