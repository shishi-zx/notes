const { resolve } = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

module.exports = {
    // entry: './src/js/index.js', // 单入口
    entry: {
        // 多入口： 有一个入口，最终输出就有一个bundle
        main: './src/js/index.js',
        test: './src/js/test.js'
    },
    output: {
        filename: 'js/[name].[contenthash].js',
        path: resolve(__dirname,'dist')
    },
    plugins:[
        new HtmlWebpackPlugin({
            template: './src/index.html'
        })
    ],
    mode: 'production'
}