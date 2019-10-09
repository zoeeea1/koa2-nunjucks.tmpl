const request = require('request');
const defaults = {
    "content-type": "application/json",
    "requestsource": "",
};


function http(method, url, params, headers) {
    return new Promise(function(resolve, reject) {
        headers = Object.assign(headers, defaults);
        let startTime = Date.now();
        let requesturl = url.match('http') ? url : `${config.api}${url}`;
        request({
            url: requesturl,
            method: method,
            json: true,
            headers: headers,
            body: params || ''
        }, function(error, response, body) {
            console.log(`----〉请求接口：${requesturl}`);
            console.log(`接口请求时间： ${Date.now() - startTime}ms`);
            console.log(response.statusCode)
            if (url.match('http')) {
                if (!error && response.statusCode == 200) {
                    resolve(body, response);
                } else {
                    reject(body);
                    console.error(`API 请求异常：${new Date().toLocaleString()}`)
                }
            } else {
                if (!error && response.statusCode == 200) {
                    resolve(body, response);
                } else {
                    reject(body);
                    console.error(`API 请求异常：${new Date().toLocaleString()}`)
                }
            }
        });
    })

}
module.exports = http;