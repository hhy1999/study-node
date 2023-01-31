const fs = require('fs')
const path = require('path')
const xlsx = require('node-xlsx')
const { exec } = require('child_process')

let filetxt = path.join(__dirname, '/txt/result.txt')
let fileexecl = path.join(__dirname, '/xls/result.xlsx')
const sheets = xlsx.parse(fileexecl)
// console.log(sheets)
let txt = fs.createWriteStream('./output.txt', {
    encoding: 'utf8'
});
let excel = []
sheets.forEach(sheet => {
    for (let rowId in sheet['data']) {
        let row = sheet['data'][rowId];
        // console.log(rowId)

        /*
        对行进行处理
        */
        excel.push(row)
        if(rowId == 0){
            txt.write(row.join('   |   '))//转成字符串写入txt 
        }else{
            // 写入txt文件中
            txt.write('\r\n')//换行
            txt.write(row.join('   |   '))//转成字符串写入txt
        }

        // 写入txt文件中
        // txt.write('\r\n')//换行
        // txt.write(row.join('   |   '))//转成字符串写入txt
    }4
    txt.end();
});
// console.log(excel)
// let buffer = xlsx.build([{ name: 'name', data: excel }]);
fs.writeFileSync('./output.xls', buffer, 'binary')
console.log(excel)
fs.readFile('./output.txt', (err, data) => {
    // console.log(data.toString())
    // var datas = data.toString().replace(/\|/g,', ').replace(/, /g, '', '').split('\r\n')
    console.log(data.toString())
    let datas = data.toString().replace(/\|/g,', ').split('\r\n')
    // console.log(datas[1].split(','))
    // console.log(datas)
    let arrs = datas.map(item => {
        // let items = item.split('@')
        return item.split(', ')
    })
    let buffer = xlsx.build([{ name: 'name', data: arrs }]);
    console.log(arrs)
    fs.writeFileSync('./output2.xls', buffer, 'binary')
})