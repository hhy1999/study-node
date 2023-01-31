const xlsx = require('xlsx');
var json2xls = require('json2xls');
const fs = require('fs')
let indir = 'G:/nodeProject/node-step-by-step/JavaScript文档转换-2/txt/导入导出格式.xls'
let intxt = 'G:/nodeProject/node-step-by-step/JavaScript操作execl/txt/1/导入导出格式.txt'

// let workbook = xlsx.readFile(indir)
// let sheetNames = workbook.SheetNames

// let sheet = workbook.Sheets[sheetNames[0]];
// console.log(sheetNames)
// console.log(sheet)

// var data = xlsx.utils.sheet_to_json(sheet)
// let datas = xlsx.utils.json_to_sheet(sheet)
// console.log(data)

fs.readFile(intxt, (err, data) => {
    let datas = data.toString().replace(/\|/g,', ').split('\r\n')

    let arrs = datas.map(item => {
        // let items = item.split('@')
        return item.split(', ')
    })
    console.log(arrs)
    const sheet = xlsx.utils.aoa_to_sheet(arrs)
    console.log(sheet)
    // 新建一个工作簿
    const workbook = xlsx.utils.book_new();//创建虚拟workbook
    /* 将工作表添加到工作簿,生成xlsx文件(book,sheet数据,sheet命名)*/
    xlsx.utils.book_append_sheet(workbook, sheet, 'Sheet');
    xlsx.utils.book_append_sheet(workbook, '', '盘点说明');

    /* 输出工作表， 由文件名决定的输出格式(book,xlsx文件名称)*/
    xlsx.writeFile(workbook, indir);
    console.log('到处完成')


})



// var xls = json2xls(data);

// fs.writeFileSync('data.xls', xls, 'binary');


async function txt2execl(intxt, outdir){

    fs.exists(outdir, function(exists) {
        if(!exists){
            fs.mkdir(outdir, function (err) {
                if(err){
                    return {code: 0, message: '转换失败！'};
                }
            })
        }
    });
    const name = '盘点数据.xls'
    fs.readFile(intxt, (err, data) => {
        if(err) return {code: 0, message: '转换失败！'};
        // 获得数据编码格式
        const result = jschardet.detect(data)
        data = iconv.decode(data, result.encoding)
        let datas = data.toString().replace(/\|/g,', ').split('\r\n')

        let arrs = datas.map(item => {
            // let items = item.split('@')
            return item.split(', ')
        })
        console.log(arrs)
        const sheet = xlsx.utils.aoa_to_sheet(arrs)
        console.log(sheet)
        // 新建一个工作簿
        const workbook = xlsx.utils.book_new();//创建虚拟workbook
        /* 将工作表添加到工作簿,生成xlsx文件(book,sheet数据,sheet命名)*/
        xlsx.utils.book_append_sheet(workbook, sheet, 'Sheet');
        xlsx.utils.book_append_sheet(workbook, '', '盘点说明');

        /* 输出工作表， 由文件名决定的输出格式(book,xlsx文件名称)*/
        xlsx.writeFile(workbook, outdir + name);
    })
    console.log('导出完成！')
}