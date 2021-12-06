const {resolve} = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
// 引入webpack
const webpack = require('webpack')
//
const AddAssetHtmlWebpackPlugin = require('add-asset-html-webpack-plugin')

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
        new HtmlWebpackPlugin({
            template: './src/index.html'
        }),
        // 告诉webpack哪些库不参与打包，同时使用时的名称也得改
        new webpack.DllReferencePlugin({
            manifest: resolve(__dirname,'dll/manifest.json')
        }),
        // 将某个文件打包输出出去，并在html中自动引入这个资源
        new AddAssetHtmlWebpackPlugin({
            filepath: resolve(__dirname,'dll/jquery.js')
        })
    ],
    mode: 'production'
}