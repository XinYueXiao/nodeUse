const KoaNew = require('./koaNew')
const app = new KoaNew()

// app.use((res, req) => {
//     res.writeHead(200)
//     res.end('hi wxy')
// })
// compose测试
// app.use(async (ctx, next) => {
//     ctx.body = "1";
//     await next();
//     ctx.body += "5";
// });
// app.use(async (ctx, next) => {
//     ctx.body += "2";
//     await next();
//     ctx.body += "4";
// });
// app.use(async (ctx, next) => {
//     ctx.body += "3";
// });
// app.use(ctx => {
//     ctx.body = 'wxy'
// })
const static = require('./static')
app.use(static(__dirname + '/public'));

const Router = require('./router')
const router = new Router();

//router测试
router.get('/index', async ctx => { ctx.body = 'index page'; });
router.get('/post', async ctx => { ctx.body = 'post page'; });
router.get('/list', async ctx => { ctx.body = 'list page'; });
router.post('/index', async ctx => { ctx.body = 'post page'; });
// 路由实例输出父中间件 router.routes() 
app.use(router.routes());

app.listen(3002)