// 对代码做修改，改写为一个web服务器，通过流向客户端实时反馈信息
const http = require('http')

http.createServer((req, res) => {
    var cp = require('child_process')
    // 给ping传参数：-t，可以使ping不停的进行，
    // 这样可以方便我们从浏览器里确认是否数据是实时回传，而不是执行完之后再发送到客户端：
    var child = cp.spawn('ping', ['-t', '81.71.15.170'])
    child.on('error', console.error)
    // 进程之间的通信，创建线程的四种方式：spawn()，exec()，execFile()和fork()
    // 通过child.stdin，child.stdout和child.stderr访问子进程的stdio流
    child.stdout.pipe(res)
    child.stderr.pipe(res)
}).listen(8000)