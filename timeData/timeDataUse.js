const TimeData = require('./timeData')

const Koa = require('koa')
const app = new Koa()
let tm = new TimeData()

app.use((ctx, next) => {
    if (ctx.method == "GET" && ctx.url == "/api/data/user") {
        const list = [
            { name: '秋咪', sex: '男', number: Math.random() * 10000 },
            { name: '丘吉尔', sex: '男', number: Math.random() * 10000 },
            { name: '马拉斯蒂', sex: '男', number: Math.random() * 10000 },
            { name: '欧吉桑', sex: '男', number: Math.random() * 10000 }
        ]
        ctx.response = list
    }
    tm.isNeedUpdate(ctx)
})
app.listen(3004)
