var url = encodeURIComponent(window.location.href.split('#')[0]);
$.get('https://ygapidev.meb.com/api/h5/v1.0/user/GetShare', { url: url }, function (res) {
    if (res.Success) {
        wx.config({
            debug: false,
            appId: res.Content.appId,
            nonceStr: res.Content.nonceStr,
            signature: res.Content.signature,
            timestamp: res.Content.timestamp,
            jsApiList: ['hideAllNonBaseMenuItem']
        });
        wx.ready(function () {
            wx.hideAllNonBaseMenuItem();
        });
    }
}, 'json')