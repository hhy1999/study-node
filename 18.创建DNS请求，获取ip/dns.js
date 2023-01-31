// Nodejs有内置的dns功能，可实现域名到ip的转化。
var dns = require("dns");
// 引用dns模块、执行dns查询、在回调中输出查询到的域名ip地址。
dns.lookup("https://www.zhihu.com", function(err,address){
    if (err){
        console.log("error:",err);
    }
    console.log("[https://www.zhihu.com]address:",address);

});

// var dns = require("dns");

// dns.lookup("www.jshaman.com",function(err,address){
//     if (err){
//         console.log("error:",err);
//     }
//     console.log("[www.jshaman.com ]address:",address);

// });