const { resolve } = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')

/*
    entry: 入口起点
        1. string --> './src/index.js', (单入口)
            打包形成一个chunk，输出一个bundle文件
            此时这个chunk文件默认名称为main.js
        2. array --> ['./src/index.js','./src/count.js'],（多入口）
            所有入口文件最终只会形成一个chunk，输出出去只有一个bundle文件
        3. object --> 键值对 （多入口）
            有几个入口文件就形成几个chunk，输出几个bundle文件

            --> 特殊用法
            value可以是一个数组，对应第二种方式，将多个入口打包到一个key下
 */

module.exports = {
    entry: {
        index: ['./src/index.js','./src/add.js'],
        count: './src/count.js'
    },
    output: {
        filename: '[name].js',
        path: resolve(__dirname, 'dist')
    },
    plugins: [
        new HtmlWebpackPlugin()
    ],
    mode: 'development'
}