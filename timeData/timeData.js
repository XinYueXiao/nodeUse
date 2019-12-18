
class TimeData {
    constructor() {
        this.data = {}
        this.startTime = '00:00:00'
        this.isStartCaching = false
    }
    isNeedUpdate(date) {
        if (date == this.startTime) {
            this.getData()
            this.isStartCaching = true
            return true
        } else {
            return false
        }
    }
    setData(data) {
        this.data = data
    }
    getData(ctx) {
        if (ctx.method == "GET" && ctx.url && ctx.url.indexOf("/api/data") > -1) {
            setData({
                [this.getKey(ctx.url)]: ctx.response.data
            })
        }
    }
    getKey(url) {
        //获取最后一个/的位置
        var lastIndex = url.lastIndexOf("\/");
        //截取最后一个/后的值
        return url.substring(lastIndex + 1, url.length);
    }
}
module.exports = TimeData;