// var s = 'sssss'
// let ss = s.replace(/s/g,'a')
// console.log(ss)
const path = require('path')
const fs = require('fs')
const index = require('./index')
async function test(){
    let indir = 'G:/nodeProject/node-step-by-step/JavaScript操作execl/xls/index.xlsx'
    let outdir = 'G:/nodeProject/node-step-by-step/JavaScript操作execl/txt'
    const res = index.excel2txt(indir)
}

test()
// const outdir = path.join(__dirname, '/txt')
// let filePath = path.join(__dirname,'../')+'/download_tmp/'
// fs.exists(filePath, function(exists) {
//     if(!exists){
//         fs.mkdir(filePath,function (err) {
//             if(err){
//                 console.log(err)
//             }
//         })
//     }
// });

// console.log(outdir)
// console.log(res)