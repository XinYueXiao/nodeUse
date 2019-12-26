const http = require("http");
const fs = require("fs");
//创建一个服务
http.createServer((req, res) => {
    //这里会返回两个参数，一个请求，一个响应，可以在这里对请求和反应进行处理
    const { method, url } = req //根据请求路径不用返回不同结果
    console.log("TCL: method", method)
    //首页请求时 http://localhost:3006
    if (method == "GET" && url == "/") {
        fs.readFile("./index.html", (err, data) => {
            res.setHeader("Content-Type", "text/html");//设置响应头
            res.end(data);
        });
    } else if (method == "GET" && url == "/api/users") {
        //设置cookie
        res.setHeader('Set-Cookie', 'token=tokendeas')
        res.setHeader('Access-Control-Allow-Credentials', 'true')
        // res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3008')
        res.setHeader("Content-Type", "application/json");//设置响应头
        res.end(JSON.stringify([{ name: "tom", age: 20 }]));
    }
    // else if (method == "OPTIONS" && url == "/api/users") {
    //     res.setHeader('Access-Control-Allow-Credentials', 'true')
    //     res.writeHead(200, {
    //         'Access-Control-Allow-Origin': 'http://localhost:3008',
    //         'Access-Control-Allow-Headers': 'X-Token,Content-Type',
    //         'Access-Control-Allow-Methods': 'DELETE'
    //     })
    //     res.end()
    // }
    else if (method == 'POST' && url == '/api/save') {
        let reqData = []
        let size = 0
        req.on('data', data => {
            console.log('req', data);
            reqData.push(data)
            size += data.length
        })
        req.on('end', function () {
            console.log('end');
            const data = Buffer.concat(reqData, size)
            console.log('data', size, data.toString());
            res.end(`formdata:${data.toString()}`)
        })
    }
    console.log('启动数据提供服务器3006');

}).listen(3006);