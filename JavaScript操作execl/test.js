const path = require('path')
const fs = require('fs')
const xlsx = require("node-xlsx")
const index = require('./index')
// const t = require('./execl2txt')
async function test(){
    let indir = 'G:/nodeProject/node-step-by-step/JavaScript操作execl/导入导出格式.xls'
    let outdir = 'G:/nodeProject/node-step-by-step/JavaScript操作execl/txt/1'
    let intxt = 'G:/nodeProject/node-step-by-step/JavaScript操作execl/txt/test.txt'
    let res = await index.excel2txt(indir, outdir)
    // let res = await index.txt2execl(intxt, outdir)
    console.log(res)
}
test()
// let name = 'index.xlsx'
// let ll = name.split('.')
// console.log(ll[0]+'.txt')

// var database = [{name: 'sheet', data: []}]
// var int = 1
// fs.readFile('./txt/result.txt',(err, data) => {
    // if(err) throw err;
    // // console.log(data)
    // // var datas = data.toString().replace('|',',').split('\r\n')
    // var datas = data.toString().replace(/\|/g, ",").split('\r\n')
    // console.log(datas)
    // let arr = []
    // for(var i = 0; i <= datas.length; i++){
    //     console.log(datas[i])
    //     datas[i]
    //     // arr.push(datas[i])
    //     // database[0].data.push(arr)
    //     // console.log(arr)
    // }
    // console.log(arr)
    // console.log(database)
    // // 构建数据流
    // const buffer = xlsx.build(database)
    // 数据写入
    // let xlsxObj = [
    //     {
    //         name: 'firstSheet',
    //         data: [
    //             [1, 2, 3],
    //             [4, 5, 6]
    //         ],
    //     },
    //     {
    //         name: 'secondSheet',
    //         data: [
    //             [7, 8, 9],
    //             [10, 1, 12]
    //         ],
    //     }
    // ]
    // fs.writeFile("./write.xlsx", xlsx.build(xlsxObj), err => {    if (err) {        throw err;    }});
    // console.log('写入成功！')
// })