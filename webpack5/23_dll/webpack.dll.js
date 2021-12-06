/**
 * 使用dll技术，对某些库（第三方库：jquery，vue）进行单独打包
 *      当你运行 webpack时，默认查找 webpack.config.js 配置文件
 *      但是我们需要运行 webpack.dll.js 文件
 *          --> :  webpack --config webpack.dll.js
 */
const {resolve} = require('path')
const webpack = require('webpack')
module.exports = {
    entry: {
        // 最终打包生成的【name】--> jquery
        // ['jquery'] --> 要打包的库是jquery
        jquery: ['jquery']
    },
    output: {
        filename: '[name].js',
        path: resolve(__dirname,'dll'),
        library: '[name]_[hash]', //打包的库向外暴露出去的内容叫什么名字
    },
    plugins: [
        // 打包生成一个 manifest.json文件 --> 提供和jquery映射
        new webpack.DllPlugin({
            name: '[name]_[hash]',//映射库的暴露的内容名称
            path: resolve(__dirname,'dll/manifest.json')// 输出文件路径
        })
    ],
    mode: 'production'
}