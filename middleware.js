// const add = (x, y) => x + y
// const square = z => z * z
// const compose = (fn1, fn2) => (...args) => fn2(fn1(...args))
// const compose = (...[first, ...other]) => (...args) => {
//     console.log("TCL: compose -> first, ...other", first, 'xx', ...other)
//     let ret = first(...args)
//     other.forEach(fn => {
//         ret = fn(ret)
//     })
//     return ret
// }
// const fna = compose(add, square, square)
// console.log("TCL: compose--", fna(1, 2))

/*这个函数是做什么的？
    这个函数使用来执行多个函数洋葱圈结构的，什么是洋葱圈结构呢？
    例如有一个函数 fn1 和一函数fn2,这个函数要获取的结果则是
    fn2(fn1()),这里的参数通过什么传递呢
*/
const compose = (middleware) => {
    return function () {
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
                fn(function next() {
                    //next()表示下一个函数
                    return dispatch(i + 1)
                })
            )
        }
    }
}
async function fn1(next) {
    console.log("fn1");
    await next();
    console.log("end fn1");
}
async function fn2(next) {
    console.log("fn2");
    await delay();
    await next();
    console.log("end fn2");
}
function fn3(next) {
    console.log("fn3");
}
function delay() {
    return new Promise((reslove, reject) => {
        setTimeout(() => {
            reslove();
        }, 2000);
    });
}
const middlewares = [fn1, fn2, fn3];
const finalFn = compose(middlewares);
finalFn();