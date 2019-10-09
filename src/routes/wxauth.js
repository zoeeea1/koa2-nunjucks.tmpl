const wxauthorize = require('../controllers/wxauthorize');

module.exports = (router) => {
    router.get('/wxauth', wxauthorize.auth);
}