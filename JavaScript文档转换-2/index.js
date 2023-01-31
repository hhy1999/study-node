const xlsx = require("node-xlsx");
const fs = require("fs");
const path = require('path')
const jschardet = require('jschardet')
const iconv = require('iconv-lite')



/**
 * 
 * @param {*} inxlsx 输入文件
 * @param {*} outdir 输出文件夹
 */
async function excel2txt(inxlsx, outdir){

    // const outdir = path.join(__dirname, '/txts')
    
    // 判断文件输出路径是否存在，若是不存在便创建文件夹
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

    // 文件名暂定
    let paths = inxlsx.toString().split('/')
    let filename = paths[paths.length-1].split('.')
    // console.log(paths[paths.length-1])
    console.log(filename[0])
    const name = filename[0]+'.txt'

    fs.readFile(inxlsx, 'utf8', (err, data) => {
        if (err) return {code: 0, message: '转换失败！'};
         // 读取xlsx文件
        const sheets = xlsx.parse(inxlsx);

        let txt = fs.createWriteStream(outdir + '/' +name, {
            encoding: 'utf8'
        });
        // console.log(sheets[0]['data'])
        
        for (let rowId in sheets[0]['data']) {
            // console.log(rowId)
            let row = sheets[0]['data'][rowId];
            if(rowId == 0){
                txt.write(row.join('|'))//转成字符串写入txt 
            }else{
                // 写入txt文件中
                txt.write('\r\n')//换行
                txt.write(row.join('|'))//转成字符串写入txt
            }
        }

        // sheets.forEach((sheet) => {
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
        txt.end();
        console.log('转换完成')
        // return {code: 1, message: '转换完成！'}
    })
    return {code: 1, message: '转换完成！'}
}

/**
 * 
 * @param {*} intxt 传入txt文件
 * @param {*} outdir 输出文件夹
 */
async function txt2execl(intxt, outdir){
    // const outdir = path.join(__dirname, '/xlsx')
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
        // data = iconv.decode(data, 'utf8')
        console.log(jschardet.detect(data))

        let datas = data.toString().replace(/\|/g,', ').split('\r\n')
        // console.log(datas)
        // let arr = []
        // for(var i = 0; i <= datas.length; i++){
        //     let row = '"' + datas[i] + '"'       
        //     arr.push(row)   
        // }
        let arrs = datas.map(item => {
            // let items = item.split('@')
            return item.split(', ')
        })
        database[0].data = arrs
        // console.log(arrs)
        const buffer = xlsx.build(database)

        fs.writeFile(outdir+'/'+name, buffer, 'ascii', err => {
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
