//                                                          _ooOoo_
//                                                         o8888888o
//                                                         88" . "88
//                                                         (| -_- |)
//                                                          O\ = /O
//                                                      ____/`---'\____
//                                                    .   ' \\| |// `.
//                                                     / \\||| : |||// \
//                                                   / _||||| -:- |||||- \
//                                                     | | \\\ - /// | |
//                                                   | \_| ''\---/'' | |
//                                                    \ .-\__ `-` ___/-. /
//                                                 ___`. .' /--.--\ `. . __
//                                              ."" '< `.___\_<|>_/___.' >'"".
//                                             | | : `- \`.;`\ _ /`;.`/ - ` : | |
//                                               \ \ `-. \_ __\ /__ _/ .-` / /
//                                       ======`-.____`-.___\_____/___.-`____.-'======
//                                                          `=---='
//
//                                       .............................................
//                                              佛祖保佑             永无BUG
//                                      佛曰:
//                                              写字楼里写字间，写字间里程序员；
//                                              程序人员写程序，又拿程序换酒钱。
//                                              酒醒只在网上坐，酒醉还来网下眠；
//                                              酒醉酒醒日复日，网上网下年复年。
//                                              但愿老死电脑间，不愿鞠躬老板前；
//                                              奔驰宝马贵者趣，公交自行程序员。
//                                              别人笑我忒疯癫，我笑自己命太贱；
//                                              不见满街漂亮妹，哪个归得程序员？

const path = require('path');
const koa = require('koa');
const router = require('koa-router')();
const views = require('koa-nunjucks-2'); //require('koa-views');
const convert = require('koa-convert');
const json = require('koa-json');
const onerror = require('koa-onerror');
const bodyparser = require('koa-bodyparser')();
const logger = require('koa-logger');
const compress = require('./middleware/compress');

const through2 = require('through2');

const app = new koa();

app.use(convert(bodyparser));
app.use(convert(json()));
// app.use(convert(logger()));
app.use(convert(require('koa-static')(path.resolve(__dirname, 'public'))));
app.use(compress());

app.use(views({
    ext: 'html',
    path: path.join(__dirname, 'views'),
    nunjucksConfig: { trimBlocks: true },
    configureEnvironment: (env) => {
        env.addFilter('jsonStr', function(str) {
            return JSON.stringify(str);
        });
    }

}));


const headerNames = [];

app.use(async(ctx, next) => {

    let headers = {};

    headerNames.map(n => ctx.request.header[n] && (headers[n] = ctx.request.header[n]))

    headerNames.map(n => (!headers[n]) && (headers[n] = ctx.cookies.get(n)))

    ctx.apiHeaders = headers;

    await next();
});

app.use(async(ctx, next) => {
    !ctx.user && (ctx.user = {})
    ctx.user['isAuth'] = !!ctx.request.header['usertoken'];
    ctx.user['accessToken'] = ctx.request.header['usertoken'];

    await next();
});


app.use(async(ctx, next) => {
    try {
        await next();
    } catch (e) {
        ctx.status = 500;
        await ctx.render('error', { title: '页面异常', message: JSON.stringify(e) });
    }
});

const seo = require('./routes/index');

seo(router);

app.use(router.routes(), router.allowedMethods());

app.on('error', (err, ctx) => {

});


module.exports = app;