const path = require('path');

module.exports = {
    publicPath: process.env.NODE_ENV === 'production' ? '/custom-form/demo/' : '/',
    chainWebpack: config => {
        config.resolve.alias.set('~', path.resolve('src'))
    }
}