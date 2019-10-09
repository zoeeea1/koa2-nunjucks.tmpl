const config = {
    server: {
        port: 3000
    },
    api: process.env.NODE_ENV === 'production' ? '' : '',
    isProduction: process.env.NODE_ENV === 'production'
}

module.exports = Object.assign({}, config)