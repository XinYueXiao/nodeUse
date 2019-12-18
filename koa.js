const Koa = require('koa')
const app = new Koa()

app.use(async (ctx, next) => {
    const start = new Date().getTime()
    console.log("TCL: start", start)
    await next()
    const end = new Date().getTime()
    console.log("TCL: end", end)
    console.log(`请求${ctx.url}，耗时${end - start}`);

})
app.use((ctx, next) => {
    ctx.body = [{
        name: 'lili'
    }]
})
app.listen(3002)