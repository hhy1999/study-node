// 导入 express 模块
const express = require('express')
// 创建 express 的服务器实例
const app = express()


// 导入并注册用户路由模块
const userRouter = require('./router/user')
app.use('/api', userRouter)