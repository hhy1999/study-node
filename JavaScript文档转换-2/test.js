const index = require('./index')
const file = require('./file')
const fs = require('fs')
const xlsx = require('xlsx');

const jschardet = require('jschardet')
const iconv = require('iconv-lite')
async function test(){
    let indir = 'G:/nodeProject/node-step-by-step/JavaScript文档转换-2/test.xls'
    let outdir = 'G:/nodeProject/node-step-by-step/JavaScript文档转换-2/txt/1'
    let intxt = 'G:/nodeProject/node-step-by-step/JavaScript操作execl/txt/test.txt'
    // let res = await index.excel2txt(indir, outdir)
    // let res = await file.txt2execl(intxt, outdir)
    // console.log(res)
    let res =await txt2execl(intxt, outdir)
    console.log(res)
}
test()




async function txt2execl(intxt, outdir){
    
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
    const name = outdir + '/' + filename[0] + '.xls'
    console.log(name)

    fs.readFile(intxt, (err, data) => {

        if(err) return {code: 0, message: '转换失败！'};
        // var datas = data.toString().replace(/\|/g,', ').replace(/, /g, '", "').split('\r\n')
        
        // 获得数据编码格式
        const result = jschardet.detect(data)
        // console.log(result)
        // 识别中文内容，编码格式
        data = iconv.decode(data, result.encoding)
        // console.log(jschardet.detect(data))

        let datas = data.toString().replace(/\|/g,', ').split('\r\n')

        let arrs = datas.map(item => {
            // let items = item.split('@')
            return item.split(', ')
        })
        // console.log(arrs)
        
        const sheet = xlsx.utils.aoa_to_sheet(arrs)
        // console.log(sheet)
        // 新建一个工作簿
        const workbook = xlsx.utils.book_new();//创建虚拟workbook
        /* 将工作表添加到工作簿,生成xlsx文件(book,sheet数据,sheet命名)*/
        xlsx.utils.book_append_sheet(workbook, sheet, 'Sheet');
        xlsx.utils.book_append_sheet(workbook, '', '盘点说明');

        /* 输出工作表， 由文件名决定的输出格式(book,xlsx文件名称)*/
        xlsx.writeFile(workbook, name);


        
    })
    console.log('写入成功！')
    return {code: 1, message: '写入成功！'}
}

module.exports.txt2execl = txt2execl
