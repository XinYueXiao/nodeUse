const express = require('express')
const app = express()
app.use(express.static(__dirname + '/'))
const proxy = require('http-proxy-middleware')
app.use('/api', proxy({ target: 'http://localhost:3006' }))
app.listen(3008, () => {
    console.log('启动请求服务3008');
})