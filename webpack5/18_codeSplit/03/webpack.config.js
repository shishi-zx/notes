const { resolve } = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

module.exports = {
    entry: './src/js/index.js',
    output: {
        filename: 'js/[name].[contenthash].js',
        path: resolve(__dirname,'dist')
    },
    plugins:[
        new HtmlWebpackPlugin({
            template: './src/index.html'
        })
    ],
    // 可以将 node_modules中的代码单独打包成一个chunk最终输出
    // 会将多入口chunk中公共的文件单独打包成一个chunk（前提是这个文件不是太小），防止重复
    optimization: {
        splitChunks: {
            chunks: 'all'
        }
    },
    mode: 'production'
}