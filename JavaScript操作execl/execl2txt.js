const xlsx = require("node-xlsx");
const fs = require("fs");
const path = require('path')
/**
 * 
 * @param {*} indir execl文件夹
 * @param {*} outdir txt文件夹
 */
async function excel2txt(indir, outdir){
    const outdir = './txt'

    fs.readdir(indir, (err, files) => {
        if(err) return {code: -1, message: '请选择正确文件夹'}

        files.forEach(filename => {
            console.log(filename)
            const filepath = path.join(indir, filename);
            console.log(filepath)
            // 读取xlsx文件
            const sheets = xlsx.parse(filepath);
            let excel = []
            let file = filename.split('.')
            let name = file[0] + '.txt'
            
            let txt = fs.createWriteStream(outdir + '/' +name, {
                encoding: 'utf8'
            });
            sheets.forEach(function(sheet) {
                for (let rowId in sheet['data']) {
                    // console.log(rowId)
                    let row = sheet['data'][rowId];
                    console.log(row)
                    // let rows = row.toString()
                    // rows.replace(',','|')
                    // console.log(rows)
                    /*
                    对行进行处理
                    */
                    // excel.push(rows)
                    // 写入txt文件中
                    txt.write('\r\n')//换行
                    txt.write(row.join('|'))//转成字符串写入txt
                }
            });
            // txt输入完成
            txt.end();
            console.log('转换完成')
            return {code: 1, message: '转换完成！'}
        })
    })
}

module.exports.excel2txt = excel2txt