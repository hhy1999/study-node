var fs = require("fs");
// 文件读写
var read_able = fs.createReadStream("1.txt");
// console.log(read_able)
var write_able = fs.createWriteStream("2.txt");

read_able.pipe(write_able);

// 文件监控

fs.watchFile(__dirname+'/1.txt',{persistent: true, interval: 300},function(status){
    if(status){
        console.log(status);
    }
});
// 文件锁
fs.open("1.txt","wx",function(err){
    if(err) return console.error(err);
});

fs.open("1.txt","wx",function(err,fp){
    if(err) return console.error(err);
    fs.close(fp);
});
