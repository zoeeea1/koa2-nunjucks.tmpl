const homeController = require('../controllers/homeController');


const auth = (actions) => (ctx, next) => {

    if (!ctx.user) {
        if (ctx.headers['X-Requested-With'] === 'XMLHttpRequest' || ctx.headers['X-Requested-With'] === 'Fetch') {
            ctx.throw(401);
        } else {
            return ctx.redirect('/login');
        }
    }

    actions(ctx, next)
}


const isAuth = async(ctx, next) => {
    let accessToken = ctx.cookies.get('accessToken');
    if (accessToken) {
        !ctx.user && (ctx.user = {})
        ctx.user['isAuth'] = true;
        ctx.user['accessToken'] = accessToken;
    }
    await next();
};

const UA = async(ctx, next) => {
    let headers = {};

    headers.mebdeviceId = ctx.cookies.get('deviceId');

    if (!headers.mebdeviceId) {
        headers.mebdeviceId = utils.uuid();
        ctx.cookies.set('deviceId', headers.mebdeviceId)
    }
    if (ctx.user && ctx.user.accessToken) {
        headers.usertoken = ctx.user.accessToken;
    }

    ctx.apiHeaders = headers;

    await next();
}


module.exports = (router) => {

    router.use(isAuth);

    router.use(UA);

    router.get('/', homeController.list);
}