const uuid = function () {
    let uuid = '';
    let s = [];
    let hexDigits = "0123456789abcdef";
    for (let i = 0; i < 36; i++) {
        s[i] = hexDigits.substr(Math.floor(Math.random() * 0x10), 1);
    }
    s[14] = "4";  // bits 12-15 of the time_hi_and_version field to 0010
    s[19] = hexDigits.substr((s[19] & 0x3) | 0x8, 1);  // bits 6-7 of the clock_seq_hi_and_reserved to 01
    s[8] = s[13] = s[18] = s[23] = "-";

    uuid = s.join("");
    return uuid;
}
const auth = (actions) => async (ctx, next) => {
    
    if (!ctx.user) {

        if (ctx.headers['X-Requested-With'] === 'XMLHttpRequest' || ctx.headers['X-Requested-With'] === 'Fetch') {
            ctx.throw(401);
        } else {
            return ctx.redirect(`/login?crmuser=${ctx.query.crmuser}&invitationCode=${ctx.query.invitationCode}`);
        }
    }

    if (!ctx.user.accessToken) return ctx.redirect(`/login?crmuser=${ctx.query.crmuser}&invitationCode=${ctx.query.invitationCode}`);

    await actions(ctx, next)
}

module.exports = {
    uuid,
    auth
};