var utils = {
    //截取url參數
    query: function(name) {
        var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
        var url = decodeURI(window.location.search)
        var r = url.substr(1).match(reg);
        if (r != null) return unescape(r[2]);
        return null;
    },
    uri: function() {
        return 'https://' + window.location.host + '/';
    },
    platform: function() {
        var u = navigator.userAgent,
            app = navigator.appVersion;
        var isAndroid = u.indexOf('Android') > -1 || u.indexOf('Linux') > -1; //g
        var isIOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
        if (isAndroid) {
            return 'android'
        }
        if (isIOS) {
            return 'ios'
        }
    }
}