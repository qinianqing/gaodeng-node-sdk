/*
 * @Descripttion: 云票儿SDK
 * @version: v1.0.0
 * @Author: nianqing
 * @Date: 2021-06-02 14:58:46
 */
const axios = require("axios");
const crypto = require('crypto');
// 参考文档: https://docs.cloud.goldentec.com/%E4%BA%91%E5%BC%80%E7%A5%A8/API%E6%96%87%E6%A1%A3/%E5%BC%80%E7%A5%A8%E6%9C%8D%E5%8A%A1%E7%9B%B8%E5%85%B3%E6%8E%A5%E5%8F%A3/%E5%8F%91%E7%A5%A8%E5%BC%80%E5%85%B7%E3%80%81%E6%89%93%E5%8D%B0/%E5%8F%91%E7%A5%A8%E5%BC%80%E5%85%B7.html
class BanuSdk {
    /**
    * @param {*} appKey 应用Key
    * @param {*} algorithm 加密方式
    * @param {*} appSecret 应用秘钥
    * @param {*} env 环境，测试:test 线上：prod
    */
    constructor({ appKey = '550c2af56e4b174c9505', algorithm = "HMAC-SHA256", appSecret = '3792950fd36c9c54ee96deacc3ef433a', env = "test" }) {
        this.appKey = appKey;
        this.appSecret = appSecret;
        this.algorithm = algorithm;
        this.env = env;
        this.host = env === 'test' ? 'https://apigw-test.goldentec.com' : 'https://apigw.goldentec.com';
    }

    formatPublicParams(args) {
        let keys = Object.keys(args)
        keys = keys.sort() //参数名ASCII码从小到大排序（字典序）；
        let newArgs = {}
        keys.forEach(function (key) {
            if (args[key] != "" && args[key] != 'undefined') {  //如果参数的值为空不参与签名；
                newArgs[key] = args[key]  //参数名区分大小写；
            }
        })
        let string = ''
        for (let k in newArgs) {
            string += '|' + k + '=' + newArgs[k]
        }
        string = string.substr(1)
        return string
    }

    formatParams(args, join) {
        let keys = Object.keys(args)
        if (join === '|') { keys = keys.sort() }
        let newArgs = {}
        keys.forEach(function (key) {
            if (args[key] != "" && args[key] != 'undefined') {  //如果参数的值为空不参与签名；
                newArgs[key] = args[key]  //参数名区分大小写；
            }
        })
        let string = ''
        for (let k in newArgs) {
            string += join + k + '=' + newArgs[k]
        }
        string = string.substr(1)
        return string
    }

    sign(path, params) {
        const timeStamp = Math.round(new Date().getTime() / 1000).toString(); //毫秒级时间戳
        const nonce = Math.random().toFixed(6).slice(-6); // 6位随机数字
        const publicParams = {
            algorithm: 'HMAC-SHA256',
            appkey: this.appKey,
            nonce: nonce,
            timestamp: timeStamp
        }
        const formatString = this.formatParams(publicParams, '|');
        params = JSON.stringify(params)
        const oldString = `${formatString}|${path}|${params}`;
        const sign = crypto.createHmac('sha256', this.appSecret).update(oldString).digest('base64');
        let authParams = Object.assign({}, publicParams);
        authParams.signature = sign;
        const auth = this.formatParams(authParams, ',')
        return auth;
    }


    request(path, options) {
        const auth = this.sign(path, options.post)
        const url = `${this.host}${path}`
        return axios.post(url, options.post, { headers: { "Authorization": auth, "Content-Type": "application/json" } }).then(res => {
            if (res.data && res.data.code === 0) {
                return res.data
            } else {
                console.log(res.data)
                const msg = '请求云票儿服务失败'
                return msg
            }
        })
    }
}
module.exports = BanuSdk;