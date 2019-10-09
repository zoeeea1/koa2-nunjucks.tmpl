const http = require('../utils/http');

exports.auth = async(ctx, next) => {
    let page = ctx.request.query.url;

    let model = await http('GET', `https://open.weixin.qq.com/connect/oauth2/authorize?appid=&redirect_uri=${page}&response_type=code&scope=snsapi_userinfo&state=STATE#wechat_redirect`, {}, ctx.apiHeaders);

    ctx.body = model.Content;

}