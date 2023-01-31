
const fs = reuire('fs')
const jschardet = require('jschardet')
const iconv = require('iconv-lite')


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
        xlsx.utils.book_append_sheet(workbook, '', '填写说明');

        /* 输出工作表， 由文件名决定的输出格式(book,xlsx文件名称)*/
        xlsx.writeFile(workbook, outdir + name);
    })
    


}