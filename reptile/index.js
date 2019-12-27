const originRequest = require('request')//发送请求
const iconv = require('iconv-lite')//转码
const cheerio = require('cheerio')//后端的JQ

function request(url, callback) {
    const option = {
        encoding: null
    }
    originRequest(url, option, callback)
}

for (let i = 101557; i < 101568; i++) {
    const url = `https://www.dy2018.com/i/${i}.html`
    request(url, function (err, res, body) {
        const html = iconv.decode(body, 'gb2312')
        const $ = cheerio.load(html)
        const item = {
            title: $('.title_all h1').text(),
            time: $('.updatetime').text(),
            remark: $('#Zoom').text(),
        }
        list.push(item)
    })
}



