const { resolve } = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

module.exports = {
    entry: './src/js/index.js',
    output: {
        filename: 'built.[contenthash].js',
        path: resolve(__dirname,'dist')
    },
    module:{
        rules: [
            {
                test: /.\css$/,
                use: [
                    'style-loader',
                    'css-loader'
                ]
            },
        ]
    },
    plugins:[
        new HtmlWebpackPlugin({
            template: './src/index.html'
        }),
        new MiniCssExtractPlugin({
            filename: 'built.[hash].css'
        })
    ],
    mode: 'production',
    devtool: 'source-map'
}