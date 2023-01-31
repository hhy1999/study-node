// 一个Web服务器，需要将外部程序输出实时展示给客户端。
// 通过使用spawn使用流，可以实现这个需求。
// 它和之前学习过的exeFile使用方法非常相似，
// 但这里为什么使用spawn呢，因为通过流是实时的传输数据，对于大量数据，不必预先缓存，可以极大的提高响应效率。


const cp = require('child_process')

var child = cp.spawn('ping', ['81.71.15.170'])
// 数据是实时输出的，并非是一次性的
child.on('error', console.error)
child.stdout.pipe(process.stdout)
child.stderr.pipe(process.stderr)