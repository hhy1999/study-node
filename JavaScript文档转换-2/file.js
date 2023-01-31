const xlsx = require("node-xlsx");
const fs = require("fs");
const path = require('path')
const jschardet = require('jschardet')
const iconv = require('iconv-lite')

/**
 * 若是一个xlsx文件中存在多张表格，则使用该方法
 * 此时，一张表格转换成一个txt文件
 * txt文件名便需要根据表格名进行设置
 * @param {*} inxlsx 
 * @param {*} outdir 
 * @returns 
 */
async function excel2txt(inxlsx, outdir){
    fs.exists(outdir, function(exists) {
        if(!exists){
            fs.mkdir(outdir, function (err) {
                if(err){
                    // console.log(err)
                    return {code: 0, message: '转换失败！'};
                }
            })
        }
    });



    fs.readFile(inxlsx, 'utf8', (err, data) => {
        if (err) return {code: 0, message: '转换失败！'};
         // 读取xlsx文件
        const sheets = xlsx.parse(inxlsx);

        sheets.forEach(sheet => {
            let name = sheet.name + '.txt'

            let txt = fs.createWriteStream(outdir + '/' +name, {
                encoding: 'utf8'
            });
            for (let rowId in sheet['data']) {
                // console.log(rowId)
                let row = sheet['data'][rowId];
                if(rowId == 0){
                    txt.write(row.join('|'))//转成字符串写入txt 
                }else{
                    // 写入txt文件中
                    txt.write('\r\n')//换行
                    txt.write(row.join('|'))//转成字符串写入txt
                }
            }
            txt.end();
        })

        // let txt = fs.createWriteStream(outdir + '/' +name, {
        //     encoding: 'utf8'
        // });

        // sheets.forEach(function(sheet) {
        //     for (let rowId in sheet['data']) {
        //         // console.log(rowId)
        //         let row = sheet['data'][rowId];
        //         if(rowId == 0){
        //             txt.write(row.join('|'))//转成字符串写入txt 
        //         }else{
        //             // 写入txt文件中
        //             txt.write('\r\n')//换行
        //             txt.write(row.join('|'))//转成字符串写入txt
        //         }
        //     }
        // });
        // txt输入完成
        // txt.end();
        console.log('转换完成')
        // return {code: 1, message: '转换完成！'}
    })
    return {code: 1, message: '转换完成！'}
}




async function txt2execl(intxt, outdir){
    var database = [{name: '盘点数据', data: []}, {name: '填写说明', data: []}]
    
    // 判断文件输出路径是否存在，若是不存在便创建文件夹
    fs.exists(outdir, function(exists) {
        if(!exists){
            fs.mkdir(outdir, function (err) {
                if(err){
                    return {code: 0, message: '转换失败！'};
                }
            })
        }
    });
    // 文件名暂定
    let paths = intxt.toString().split('/')
    let filename = paths[paths.length-1].split('.')
    // console.log(paths[paths.length-1])
    console.log(filename[0])
    const name = filename[0] + '.xls'

    fs.readFile(intxt, (err, data) => {

        if(err) return {code: 0, message: '转换失败！'};
        // var datas = data.toString().replace(/\|/g,', ').replace(/, /g, '", "').split('\r\n')
        
        // 获得数据编码格式
        const result = jschardet.detect(data)
        console.log(result)
        // 识别中文内容，编码格式
        data = iconv.decode(data, result.encoding)
        // console.log(jschardet.detect(data))

        let datas = data.toString().replace(/\|/g,', ').split('\r\n')

        let arrs = datas.map(item => {
            // let items = item.split('@')
            return item.split(', ')
        })
        console.log(arrs)
        database[0].data = arrs
        
        let cols = []
        let wch = {}
        arrs[2].forEach(item => {
            // console.log(item.length * 2)
            wch = {'wch': item.length * 2}
            cols.push(wch)
            // console.log(cols)
            // console.log(wch)
        })
        // console.log(cols)
        // let sheetOptions = {'!cols': cols}
        // console.log(sheetOptions)
        // 存在问题：即使对第一行数据进行列宽限定，但是表格中的数据仍旧存在
        // 通过每个列中的数据进行设置
        // 即使通过后台设置列宽远不如自动调整列宽
        const buffer = xlsx.build(database)

        fs.writeFile(outdir+'/'+name, buffer, err => {
            if (err) {        
                return {code: 0, message: '转换失败！'};  
            }
        });
        // return {code: 1, message: '写入成功！'}
        // console.log('写入成功！')
    })
    return {code: 1, message: '写入成功！'}
}

module.exports.excel2txt = excel2txt
module.exports.txt2execl = txt2execl