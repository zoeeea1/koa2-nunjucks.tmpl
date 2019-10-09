const request = require('request');
const config = require('../config');
const shajs = require('./sha');
const Base64 = require('./base64.js');
const defaults = {
    "content-type": "application/json",
    "requestsource": "h5",
    "mebchannel": "fx-c-daren",
    "mebappName": 'fx-wxh5',
    "DevicePlatform": 'ios',
    "appid": '111',
    "nonce": "3343434",
};

// if (!config.isProduction) {
//     defaults["mebdeviceId"] = "214d2cb3-b8da-4e7b-8703-e8187d45d676  ";
//     defaults["usertoken"] = "MUuVIkzpjhVYh%2bH%2bEgroPpAXfQGCbUCkWuIYv46jdUjZpygnir6nYFuKIhRDFmqY9g7qoUk2KD8vocJAnm1EPw5x6dlHDeJJvcYnq2A3T0PSACbqCt%2ffhvLzpRMgMq6W";
// }


function http(method, url, params, headers) {
    return new Promise(function (resolve, reject) {
        let timestamp = Math.round(Date.now() / 1000).toString();

        let paramsStr = '';

        paramsStr = url.split('?').length > 1 ? url.split('?')[1] : '';

        let arr = ['appid=111', 'nonce=3343434', `timestamp=${timestamp}`];

        if (paramsStr.length) arr.push(...paramsStr.split('&'))

        arr.sort();

        let queryString = arr.join('&') + '&secret=9uCh4qxBlFqap/+KiqoM68EqO8yYGpKa1c+BCgkOEa4=';
        let sha = shajs.hex_sha1(queryString);

        let sigture = Base64.Base64.encode(sha);

        defaults.sigture = sigture;

        defaults.timestamp = timestamp;
        headers = Object.assign(headers, defaults);
        let startTime = Date.now();
        let requesturl = url.match('http') ? url : `${config.api}${url}`;
        request({
            url: requesturl,
            method: method,
            json: true,
            headers: headers,
            body: params || ''
        }, function (error, response, body) {
            console.log(`----〉请求接口：${requesturl}`);
            console.log(`接口请求时间： ${Date.now() - startTime}ms`);
            console.log(response.statusCode)
            if (url.match('http')) {
                if (!error && response.statusCode == 200) {
                    resolve(body, response);
                }
                else {
                    reject(body);
                    console.error(`API 请求异常：${new Date().toLocaleString()}`)
                }
            } else {
                if (!error && response.statusCode == 200) {
                    resolve(body, response);
                }
                else {

                    reject(body);
                    console.error(`API 请求异常：${new Date().toLocaleString()}`)
                    console.error(requesturl)
                    console.error(error)
                }
            }
        });
    })

}
module.exports = http;