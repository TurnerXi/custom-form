const path = require('path');

module.exports = {
    publicPath: process.env.NODE_ENV === 'production' ? '/custom-form/demo/' : '/',
    chainWebpack: config => {
        config.resolve.alias.set('~', path.resolve('src')).end();
        config.module.rule('bpmn').test(/\.bpmn$/).use('raw-loader').loader('raw-loader').end();
        config.plugin('copy').tap(args => {
            args[0].push({ from: 'assets/**', to: 'vendor/bpmn-js', context: 'node_modules/bpmn-js/dist/' });
            args[0].push({ from: 'assets/**', to: 'vendor/bpmn-js', context: 'node_modules/bpmn-js-properties-panel/dist/' });
            return args;
        })
    }
}