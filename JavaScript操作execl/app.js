const fs = require('fs')
const path = require('path')
const jschardet = require('jschardet')
const iconv = require('iconv-lite')

// console.log(path.join(__dirname))

const file = 'G:/nodeProject/node-step-by-step/JavaScript操作execl/txt/PanDian.txt'
// const file = 'G:/nodeProject/node-step-by-step/JavaScript操作execl/txt/test.txt'
// const buf = fs.readFileSync(file, 'utf8')
// console.log(buf)
// const result = jschardet.detect(buf)
// console.log(result)


// const reader = fs.createReadStream(file)
// console.log(render)


const readFileSync = async () => {
    let data = await fs.promises.readFile(file)
    console.log(iconv.decode(data, jschardet.detect(data).encoding))
}

readFileSync()
//输出data = <Buffer 89 50 4e ...> 

// 每次读取都会触发data事件
// reader.on("data", (data) => {
//     // do something ... ...
//     const result = jschardet.detect(data)
//     data = iconv.decode(data, result.encoding)
//     console.log(data.toString().replace(/\|/g,', ').replace(/, /g, '", "').split('\r\n'))
//   });



































// const file = 'G:/nodeProject/node-step-by-step/JavaScript操作execl/txt/PanDian.txt'
// const buf = fs.readFileSync(file)
// // console.log(buf)
// const result = jschardet.detect(buf)

// console.log(result)
// data = iconv.decode(buf, result.encoding)
// console.log(data)
// const paths = path.join(__dirname, '/app')
// existsSync 同步执行的方法，返回的结果就是boolean类型
// exists 方法判断文件夹是否存在，可以在回调函数中创建不存在的文件夹，没有返回结果，故打印为undefined
// const res = fs.exists(paths, exists => {
//     if(!exists){
//         fs.mkdir(paths, err => {
//             if(err) return err
//         })
//     }
//     // console.log(exists)
// })
// const ress = fs.existsSync(paths)

// console.log(res)
// console.log(ress)

