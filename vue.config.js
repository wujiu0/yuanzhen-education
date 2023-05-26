const {defineConfig} = require('@vue/cli-service');
module.exports = defineConfig({
    transpileDependencies: true,
    // devServer: {
    //     proxy: {
    //         '/user': {
    //             target: 'http://123.57.0.23:8090',
    //             ws: true,
    //             changeOrigin: true,
    //         },
    //     },
    // },
});
