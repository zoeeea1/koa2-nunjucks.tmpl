exports.list = async(ctx, next) => {
    await ctx.render('index', { title: 'MVC' });
}

exports.get = async(ctx, next) => {
    try {
        let res = await http('POST', `url`, { mobile: ctx.request.query.xx }, ctx.apiHeaders);
        await ctx.render(`success`, { title: '成功', data: res.data });
    } catch (e) {
        await ctx.render(`error`, { title: '失败', message: res.message });
    }
}

exports.post = async(ctx, next) => {
    var model = ctx.request.body;
    try {
        let res = await http('POST', `url`, model, ctx.apiHeaders);
        ctx.body = res;
    } catch (e) {
        ctx.body = { success: false, msg: '网络异常' };
    }
}

exports.put = async(ctx, next) => {

}

exports.delete = async(ctx, next) => {

}