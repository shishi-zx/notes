const { resolve } = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')

/*
    output
        filename: 指定文件名称和目录
        path: 指定文件目录（将来所有资源输出的公共目录）
        publicPath: '/'   所有资源引入公共路径前缀 --> 'imgs/a.png' --> '/imgs/a.png'
        chunkFilename: 非入口chunk的名称
        library: 指定向外暴露的变量名
        libraryTarget: 会将这个向外暴露的变量添加到指定的变量上（window浏览器端，global node端）
*/
module.exports = {
    entry: './src/index.js',
    output: {
        filename: 'js/[name].js',
        path: resolve(__dirname,'dist'),
        // publicPath: '/',
        chunkFilename: 'js/[name]_chunk.js',
        library: '[name]_libbbb',
        libraryTarget: 'window'
    },
    plugins: [
        new HtmlWebpackPlugin()
    ],
    mode: 'development'
}