var xlsx = require('xlsx')
var fs = require("fs")
var moment = require("moment")
var os = require("os")

//查找是否存在指定文件夹路径
if(fs.existsSync('./excel/字段枚举值配置表格')){
    //读取文件夹下的所有文件名称
    fs.readdir('./excel/字段枚举值配置表格/', function (err, files) {
        if (err) {
            throw err
        }
        console.log(files)
        //查找是否存在指定SQL文件夹路径
        if(fs.existsSync('./sql')){
            //创建SQL存储文件
            fs.writeFile("./sql/字段枚举值配置.sql","" ,function(err) {
                if(err) {
                    return console.log(err)
                }
                console.log("创建SQL存储文件成功")
            })
        }else{
            //创建文件夹
            fs.mkdirSync('./sql', function(err){
                if(err){
                console.log(err);
                return;
                }
                //创建SQL存储文件
                fs.writeFile("./sql/字段枚举值配置.sql","" ,function(err) {
                    if(err) {
                        return console.log(err);
                    }
                    console.log("创建SQL存储文件成功")
                })
            })
        }

        //主表自增DOC_ENTRY
        var num = 1;

        //遍历文件名数组，拼接SQL语句
        files.forEach(function(d,n){
            let workbook = xlsx.readFile('./excel/字段枚举值配置表格/'+d)
            let sheetNames = workbook.SheetNames

            sheetNames.forEach(function(sheetName,n) {
                var worksheet = workbook.Sheets[sheetName]
                var data = xlsx.utils.sheet_to_json(worksheet)
                
                let fieldsName = "DOC_ENTRY ,GROUP_NAME ,BUSINESS_OBJ ,BUSINESS_DEC ,FIELDS_NAME ,BUSINESS_REMARK ,CREATE_DATE"
                let fieldsValue = "("+num+",'模板名称','业务对象','对象描述','对象字段','备注','"+moment(Date.now()).format('YYYY-MM-DD HH:mm:ss')+"')"+os.EOL
                let sql = `INSERT INTO MDM_SYNC_ENUM_GROUP(${fieldsName}) VALUES ${fieldsValue}`

                //向存储文件追加SQL语句
                fs.appendFileSync("./sql/字段枚举值配置.sql", sql)

                data.forEach(function(d,i){
                    let fieldsLineName = "DOC_ENTRY ,LINE_ID ,FIELDS_VALUE ,ENUM_NAME ,ENUM_ODATA ,ENUM_TYPE ,ENUM_VALUE"
                    let fieldsLineValue = "("+num+","+num+"00"+i+",'0','"+data[i].Object+"','"+data[i].Emun+"','Interger','"+i+"')"+os.EOL
                    let sql = `INSERT INTO MDM_SYNC_ENUM_GROUP_LINE(${fieldsLineName}) VALUES ${fieldsLineValue}`

                    fs.appendFileSync("./sql/字段枚举值配置.sql", sql)
                })
                num = num +1
            })
        })
    })
}else{
    //创建文件夹
    fs.mkdirSync('./excel/字段枚举值配置表格', function(err){
        if(err){
            console.log(err);
            return;
        }
    })
    console.log("未找到'excel/字段枚举值配置表格'文件夹，已创建该文件夹，请在'excel/字段枚举值配置表格'文件夹中放入SAP对应关系表格")
}
