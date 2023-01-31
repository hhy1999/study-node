const xlsx = require("node-xlsx");
const fs = require("fs");
const path = require('path')
const outpath = path.join(__dirname,'/txt')
const name = '2.txt'
const outdir = path.join(__dirname, '/txts')
fs.readFile(__dirname+"/xls/result.xlsx", 'utf8',(err, data) => {
    if(err) console.error('Error:(spec)', err)
    // console.log(data.toString())
    const sheets = xlsx.parse(__dirname+"/xls/result.xlsx");

    let txt = fs.createWriteStream(outdir + '/' +name, {
        encoding: 'utf8'
    });
    sheets.forEach(function(sheet) {
        for (let rowId in sheet['data']) {
            // console.log(rowId)
            let row = sheet['data'][rowId];
            console.log(row)
            txt.write('\r\n')//换行
            if(!row || row !='' || row != undefined){
                txt.write(row.join('|'))//转成字符串写入txt
            }
            
        }
    });
    // txt输入完成
    txt.end();
    console.log('转换完成')
    // console.log(files)
    // files.forEach(filename => {
    //     console.log(filename)
    //     const filepath = path.join(__dirname+"/xls", filename);
    //     console.log(filepath)
    //     // 读取xlsx文件
    //     const sheets = xlsx.parse(filepath);
        // 循环遍历每一张表格，避免存在表格数据为空的情况
        // console.log(sheets)
        // for(let i = 0; i <= sheets.length; i++){
        //     // console.log(sheets[i]?.data)
        //     if(!sheets[i]?.data || sheets[i]?.data == null || sheets[i]?.data ==''){
        //         console.log(sheets[i]?.name+' is null')
        //     }else{
        //         const sheetData = sheets[i].data;
        //         console.log(sheetData)
        //     }
        // }
        // console.log(sheets)
        // const sheetData = sheets[0].data;
        // console.log(sheetData, 'sheetData')
        // txt创建

    //     let excel = []
    //     let file = filename.split('.')
    //     let name = file[0] + '.txt'
    //     let txt = fs.createWriteStream(outpath + '/' +name, {
    //         encoding: 'utf8'
    //     });
        
    //     sheets.forEach(function(sheet) {
    //         for (let rowId in sheet['data']) {
    //             // console.log(rowId)
    //             let row = sheet['data'][rowId];
    //             let rows = row.toString()
    //             // rows.replace(',','|')
    //             console.log(row)
    //             /*
    //             对行进行处理
    //             */
    //             // excel.push(rows)
    //             // 写入txt文件中
    //             txt.write('\r\n')//换行
    //             txt.write(row.join('|'))//转成字符串写入txt
    //         }
    //     });
    //     // txt输入完成
    //     txt.end();
    // })

})












