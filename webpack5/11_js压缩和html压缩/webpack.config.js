const { resolve } = require("path")
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
    entry: './src/js/index.js',
    output: {
        filename: 'js/built.js',
        path: resolve(__dirname, 'build')
    },
    module: {
        rules: []
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './src/index.html',
            // minify: {
            //     collapseWhitespace: true,
            //     removeComments: true
            // }
        })
    ],
    //生产模式下会自动压缩js代码,webpack5 会自动压缩html代码
    mode: 'production'
}