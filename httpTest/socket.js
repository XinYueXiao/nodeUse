const net = require('net')
//创建一个服务
const chatServer = net.createServer()
//数据存储位置
const clientList = []
chatServer.on('connection', client => {
    //打印个日志
    client.write('hi\n')
    //把每次输入的结果，存储起来
    clientList.push(client)
    client.on('data', data => {
        console.log('receive', data.toString());
        //广播每个消息
        clientList.forEach(v => v.write)
    })
})
chatServer.listen(9000)