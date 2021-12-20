const { resolve } = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')

// 用来将css单独提取为一个单独文件
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

module.exports = {
    entry: './src/js/index.js',
    output: {
        filename: 'js/built.js',
        path: resolve(__dirname, 'build')
    },
    module: {
        rules: [
            {
                test: /\.css$/,
                use: [
                    //'style-loader',  // 创建style标签，然后将样式放上去
                    MiniCssExtractPlugin.loader, // 取代style-loade ， 提取js中的css为单独文件
                    'css-loader'     // 将css文件整合到js文件中
                ]
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './src/index.html'
        }),
        // 将 css 为单独文件
        new MiniCssExtractPlugin({
            filename: 'css/built.css', // 重命名，默认输出为 main.css
        })
    ],
    mode: 'development'
}