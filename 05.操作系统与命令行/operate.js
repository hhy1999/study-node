// Nodejs中存在一些内置的方法用于查询操作系统的信息
// process.arch获取到系统是32位还是64位，
// process.platform可获取系统的类型。
console.log(process.arch);
console.log(process.platform);

// process.memoryUsage()可以获取当前进程的内存使用情况，它有三个方法：
// rss：常驻内存大小；
// heapTotal：动态分配的可用内存；
// heapUsed：已使用堆大小。
console.log(process.memoryUsage().rss);
console.log(process.memoryUsage().heapTotal);
console.log(process.memoryUsage().heapUsed);


//输出整体参数
console.log(process.argv);

// 分别输入各参数
if(process.argv.length >0){
    //遍历参数
    process.argv.forEach(function(arg,index){
        console.log(arg,index);
        // console.log(arg)
        // console.log(index)
    });
}