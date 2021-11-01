/*
    loader: 需要下载，然后使用
    plugin： 需要下载， 然后引入，然后使用
*/
const {resolve} = require('path')
//引入插件
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
    entry: './src/index.js',
    output: {
        filename: 'built.js',
        path: resolve(__dirname,'bulid')
    },
    module: {
        rules: [

        ]
    },
    plugins: [
        // 直接new 调用就行了
        new HtmlWebpackPlugin({
            template: './src/index.html'
        })
    ],
    mode: 'development'
}