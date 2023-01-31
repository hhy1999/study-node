const xlsx = require("node-xlsx");
const fs = require("fs");
const path = require('path')


var database = [{name: 'sheet', data: []}]
var int = 1
fs.readFile('./txt/test.txt',(err, data) => {
    if(err) throw err;
    // console.log(data)
    // console.log(data.toString())
    var datas = data.toString().replace(/\|/g,', ').replace(/, /g, '", "').split('\r\n')
    // var datas = data.toString().replace(/\|/g, ",").split('\r\n')
    // let d1 = '"' + datas[1] + '"'
    // console.log(datas.toString())
    console.log(datas)
    let arr = []
    for(var i = 0; i <= datas.length; i++){
        let row = '"' + datas[i] + '"'
        // console.log(row)
        
        arr.push(row)
        // database[0].data = arr
        // console.log(arr)    
    }
    // console.log(arr)   
    let arrs = arr.map(item => {
        // return item.split('@')
        return item.split(', ')

    })
    console.log(arrs)
    database[0].data = arrs
    // console.log(arrs[1])
    // console.log(database[0])
    const buffer = xlsx.build(database)
    fs.writeFile("./write2.xlsx", buffer, err => {    if (err) {        throw err;    }});
    console.log('写入成功！')
})