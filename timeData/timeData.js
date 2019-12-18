const moment = require('moment')

class TimeData {
    constructor() {
        this.data = {}
        this.startTime = '00:00:00'
        this.isStartCaching = false
    }
    isNeedUpdate(ctx) {
        setInterval(() => {
            const data = moment().format('HH:mm:ss')
            console.log("TCL: TimeData -> isNeedUpdate -> data", data)
            if (data == this.startTime) {
                this.setData(ctx)
                this.isStartCaching = true
                return true
            } else {
                return false
            }
        }, 1000);
    }
    setData(ctx) {
        if (ctx.method == "GET" && ctx.url && ctx.url.indexOf("/api/data") > -1) {
            this.data[this.getKey(ctx.url)] = ctx.response.data
            console.log("TCL: TimeData -> setData -> this.data", this.data)
        }
    }
    getData() {
        return this.data
    }
    getKey(url) {
        //获取最后一个/的位置
        var lastIndex = url.lastIndexOf("\/");
        //截取最后一个/后的值
        return url.substring(lastIndex + 1, url.length);
    }
}
module.exports = TimeData;