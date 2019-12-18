const http = require('http')
const request = require('./request')
const response = require('./response')
const context = require('./context')
class KoaNew {
    constructor() {
        this.middlewares = []
    }

    listen(...args) {
        //创建服务
        const server = http.createServer(async (req, res) => {
            //创建上下文
            let ctx = this.createContent(req, res)
            //中间件合成
            const fn = this.compose(this.middlewares)
            //执行合成函数
            await fn(ctx)
            //返回回调
            //this.callback(ctx)
            //响应
            res.end(ctx.body)
        })
        //添加监听端口
        server.listen(...args)
    }
    // use(callback) {
    //     this.callback = callback
    // }
    use(middleware) {
        this.middlewares.push(middleware)
    }
    //构建上下文
    createContent(req, res) {
        //继承已经封装好的属性
        const ctx = Object.create(context)
        ctx.request = Object.create(request)
        ctx.response = Object.create(response)

        ctx.req = ctx.request.req = req
        ctx.res = ctx.response.res = res
        return ctx
    }
    //合成函数
    compose(middleware) {
        return function (ctx) {//传入上下文
            //首先执行穿过来的第一个参数函数,并把结果返回
            return dispatch(0)
            //怎么执行这个函数呢
            function dispatch(i) {
                //当前索引的函数为fn
                let fn = middleware[i]
                if (!fn) {
                    //如果不存在则返回空的 resolve
                    return Promise.resolve()
                }
                //存在则执行
                return Promise.resolve(
                    fn(ctx, function next() {
                        //next()表示下一个函数
                        return dispatch(i + 1)
                    })
                )
            }
        }
    }
}
module.exports = KoaNew