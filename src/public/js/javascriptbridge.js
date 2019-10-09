+ (function () {
    var functionId = 1;

    var functions = {};

    function connectWebViewJavascriptBridge(callback) {

        if (window.WebViewJavascriptBridge) { return callback(WebViewJavascriptBridge); }
        if (window.WVJBCallbacks) { return window.WVJBCallbacks.push(callback); }
        window.WVJBCallbacks = [callback];

        var ua = navigator.userAgent.toLowerCase();
        if (ua.match(/MicroMessenger/i) == "micromessenger") return;

        if (window.navigator.userAgent)
            var WVJBIframe = document.createElement('iframe');
        WVJBIframe.style.display = 'none';
        WVJBIframe.src = 'https://__bridge_loaded__';
        document.documentElement.appendChild(WVJBIframe);
        setTimeout(function () { document.documentElement.removeChild(WVJBIframe) }, 0)
    }

    function convertFunction(target) {
        if (!target) return target;
        if (typeof target != "object" && typeof target != "function") return target;
        if (typeof target == "function") {
            var key = 'func' + functionId++ + 'N' + new Date().getTime()
            functions[key] = target;
            return target = key;
        }
        for (var key in target) target[key] = target[key] && convertFunction(target[key]);
        return target;
    }

    /**
     * 选择图片
     * @param {*参数} opt 请求参数
     * @param {*} callbacks 回调函数
     */
    function javascriptLog(opt, callbacks) {
        convertFunction(opt);
        connectWebViewJavascriptBridge(function (bridge) {
            bridge.callHandler('javascriptLog', opt, callbacks || function (data) { });
        });
    }

    // {
    //     current: 1,
    //     urls: ['https://cdn-ssl.meb.com/2017/04/27/1353389622-o', 'https://cdn-ssl.meb.com/2018/06/29/1126548361-o'],
    //     thumb:['https://cdn-ssl.meb.com/2017/04/27/1353389622-s', 'https://cdn-ssl.meb.com/2018/06/29/1126548361-s']
    // }
    /**
     * 预览大图
     * @param {*参数} settings 
     */
    function previewImage(settings) {
        connectWebViewJavascriptBridge(function (bridge) {
            bridge.callHandler('previewImage', settings, function (data) {
            });
        });
    }
    /**
     * 导航配置
     * @param {*导航参数} opt 导航
     */
    function navigation(opt) {
        var defaults = {
            mode: 0,//0 正常 1、渐变 2、上滑隐藏下滑显示                
            title: document.title,
            icon: '',
            opaqueHeight: 200,
            pullCommand: void 0,
            // {
            //     name: '搜索',
            //     icon: '',
            //     subMenus: [
            //         { name: '搜索文章', icon: '', command: 'option1' },
            //         { name: '搜索商品', icon: '', command: 'option2' },
            //         { name: '搜索帖子', icon: '', command: 'option3' },
            //     ]
            // }
            buttons: [],
            tabCheckd: 0,
            // {
            //     name: '商品列表',
            //     icon: '',
            //     command: function (data) { alert('商品列表') }
            // }
            tabs: []

        }
        var options = Object.assign({}, defaults, opt);

        connectWebViewJavascriptBridge(function (bridge) {

            convertFunction(options);

            bridge.registerHandler('navigationEvent', function (data, responseCallback) {
                functions[data.command] && functions[data.command](data, responseCallback);
            })

            bridge.callHandler('navigation', options, function (data, responseCallback) {
                responseCallback && responseCallback()
            });
        });
    };

    /**
     * 选择图片
     * @param {*参数} opt 请求参数
     * @param {*} callbacks 回调函数
     */
    function chooseImage(opt, callbacks) {
        convertFunction(opt);
        connectWebViewJavascriptBridge(function (bridge) {
            bridge.callHandler('chooseImage', opt, callbacks || function (data) { });
        });
    }

    /**
     * 咨询
     * @param {*参数} opt 请求参数
     * @param {*回调函数} callbacks 回调函数
     */
    function openConsulting(opt, callbacks) {
        convertFunction(opt);
        connectWebViewJavascriptBridge(function (bridge) {
            bridge.callHandler('consulting', opt, callbacks || function (data) { });
        });
    }


    /**
     * 返回上一页
     * @param {*参数} opt 请求参数
     * @param {*回调函数} callbacks 回调函数
     */
    function goBack(opt, callbacks) {
        convertFunction(opt);
        connectWebViewJavascriptBridge(function (bridge) {
            bridge.callHandler('goBack', opt, callbacks || function (data) { });
        });
    }

    /**
     * 预约
     * @param {*参数} opt 请求参数
     * @param {*回调函数} callbacks 回调函数
     */
    function openReservation(opt, callbacks) {
        convertFunction(opt);
        connectWebViewJavascriptBridge(function (bridge) {
            bridge.callHandler('reservation', opt, callbacks || function (data) { });
        });
    }



    /**
     * 获取用户信息
     * @param {*参数} opt 请求参数
     * @param {*回调函数} callbacks 回调函数
     */
    function isLogin(opt, callbacks) {
        convertFunction(opt);
        connectWebViewJavascriptBridge(function (bridge) {
            bridge.callHandler('isLogin', opt, callbacks || function (data) { });
        });
    }

    /**
     * 选择项目
     * @param {*参数} opt 请求参数
     * @param {*回调函数} callbacks 回调函数
     */
    function selectProject(opt, callbacks) {
        convertFunction(opt);
        connectWebViewJavascriptBridge(function (bridge) {
            bridge.callHandler('selectProject', opt, callbacks || function (data) { });
        });
    }


    /**
     * 打电话
     * @param {*参数} opt 请求参数
     * @param {*回调函数} callbacks 回调函数
     */
    function tel(opt, callbacks) {
        convertFunction(opt);
        connectWebViewJavascriptBridge(function (bridge) {
            bridge.callHandler('tel', opt, callbacks || function (data) { });
        });
    }


    /**
     * 分享链接
     * @param {*参数} opt {shareurl}
     * @param {*回调函数} callbacks 回调函数
     */
    function shareurl(opt, callbacks) {
        convertFunction(opt);
        connectWebViewJavascriptBridge(function (bridge) {
            bridge.callHandler('shareurl', opt, callbacks || function (data) { });
        });
    }


    var javascriptBridge = window.javascriptBridge = {
        connectWebViewJavascriptBridge,
        navigation,
        openConsulting,
        openReservation,
        previewImage,
        chooseImage,
        javascriptLog,
        selectProject,
        goBack,
        tel,
        isLogin,
        shareurl,
    };
})();

+ (function () {
    var modalBackdrop = document.createElement('div');
    var tmpModel = { zIndex: 900, position: 'fixed', display: 'none', right: '0', top: '0', bottom: '0', left: '0', background: '#000', opacity: .5 };

    for (var item in tmpModel) {
        modalBackdrop.style[item] = tmpModel[item];
    }

    var count = 0;
    document.body.appendChild(modalBackdrop);
    function Alert(msg) {
        var container = document.createElement('div');
        var modal = document.createElement('div');

        var tmpModel2 = { zIndex: 990 + count++, position: 'fixed', right: '0', top: '0', bottom: '0', left: '0', display: 'flex', alignItems: 'center', justifyContent: 'center' };
        for (var item in tmpModel2) {
            container.style[item] = tmpModel2[item];
        }

        //Object.assign(container.style, { zIndex: 990 + count++, position: 'fixed', right: '0', top: '0', bottom: '0', left: '0', display: 'flex', alignItems: 'center', justifyContent: 'center' });

        var tmpModel3 = { zIndex: 999 + count, position: 'relative', margin: '30px auto', width: '60%', minHeight: '100px', background: '#FFF' };

        for (var item in tmpModel3) {
            modal.style[item] = tmpModel3[item];
        }

        //Object.assign(modal.style, { zIndex: 999 + count, position: 'relative', margin: '30px auto', width: '60%', minHeight: '100px', background: '#FFF' });

        modalBackdrop.style.display = 'block';

        document.body.appendChild(container);
        container.appendChild(modal);
        modal.innerHTML = JSON.stringify(msg) || '';

        container.addEventListener('click', function () {
            container.remove();
            if (!--count) modalBackdrop.style.display = 'none';
        })
    }

    window.alert = Alert;

})();

+ (function () {

    window.addEventListener('load', function () {
        if (!window.sonic) return;

        //耗时分析(上报)
        var performanceJson = JSON.parse(window.sonic.getPerformance());//clickTime;loadUrlTime
        var pageTime = views.jsendtTime - performanceJson.clickTime;

        // alert('页面加载时间：' + pageTime / 1000 + 's')
        // setTimeout(function () {

        //     getSonicData(function (status, y, data) {
        //         alert(arguments)

        //         if (status == 1) {
        //             // alert('首次加载')
        //         } else if (status == 2) {
        //             // alert('页面没变化')
        //         } else if (status == 3) {
        //             for (var key in data) {
        //                 if (data.hasOwnProperty(key)) {
        //                     // alert(key)
        //                 }
        //             }
        //         }
        //     })
        // }, 10);
    })

    function getSonicData(callback) {
        var sonicStatus = 0, //sonic状态 0-状态获取失败 1-sonic首次 2-页面刷新 3-局部刷新 4-完全cache
            reportSonicStatus = 0, //sonic上报状态
            sonicHadExecute = 0, //sonic执行标志位
            sonicUpdateData = {}; //sonic diff数据 
        window['getDiffDataCallback'] = function (diffData) {
            console.log(diffData)
            try {
                var result = JSON.parse(diffData);
            } catch (e) { }
            if (result['code'] == 200) {
                reportSonicStatus = sonicStatus = 3;
                sonicUpdateData = JSON.parse(result['result']);
                //页面完全没有变化
            } else if (result['code'] == 1000) {
                reportSonicStatus = sonicStatus = 1;
            } else if (result['code'] == 2000) {
                reportSonicStatus = sonicStatus = 2;
            } else if (result['code'] == 304) {
                sonicStatus = 4;
                switch (parseInt(result['srcCode'])) { //上报状态处理
                    case 304:
                        reportSonicStatus = 4;
                        break;
                    case 200: //局部刷新也可能返回304 但srcCode是200，当返回的局部数据足够快，终端会组装好页面返回304
                        reportSonicStatus = 3;
                        break;
                    case 1000:
                        reportSonicStatus = 1;
                        break;
                    case 2000:
                        reportSonicStatus = 2;
                        break;
                    default:
                        reportSonicStatus = sonicStatus;
                }
            }
            if (sonicHadExecute == 0) {
                callback(sonicStatus, reportSonicStatus, sonicUpdateData);
                sonicHadExecute = 1;
            }
        }
        /**
         * sonic超时处理 默认5s
         */
        setTimeout(function () {
            if (sonicHadExecute == 0) {
                sonicHadExecute = 1;
                callback(sonicStatus, reportSonicStatus, sonicUpdateData);
            }
        }, 5000);

        window.sonic && window.sonic.getDiffData(); //执行sonicdiff
    }
})();