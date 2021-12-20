const { resolve } = require('path')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const OptimizeCssAssetsWebpackPlugino = require("optimize-css-assets-webpack-plugin")
const HtmlWebpackPlugin = require('html-webpack-plugin')
const WorkboxWebpackPlugin = require('workbox-webpack-plugin')


// 定义nodejs环境变量： 决定使用browserslist的哪个环境
process.env.NODE_ENV = "production"

module.exports = {
    entry: './src/js/index.js',
    output: {
        filename: 'js/built.[contenthash:10].js',
        path: resolve(__dirname, 'dist')
    },
    module: {
        rules: [
            {
                //以下loader只会命中一个
                oneOf: [
                    {
                        test: /\.css$/,
                        use: [
                            MiniCssExtractPlugin.loader,
                            'css-loader',
                            {
                                //还需要在package.json中定义browserslist
                                loader: 'postcss-loader',
                                options: {
                                    postcssOptions: {
                                        plugins: [
                                        [
                                            'postcss-preset-env'
                                        ],
                                        ],
                                    },
                                },
                            },
                        ]
                    },
                    {
                        test: /\.less$/,
                        use: [
                            MiniCssExtractPlugin.loader,
                            'css-loader',
                            {
                                //还需要在package.json中定义browserslist
                                loader: 'postcss-loader',
                                options: {
                                    postcssOptions: {
                                        plugins: [
                                        [
                                            'postcss-preset-env'
                                        ],
                                        ],
                                    },
                                },
                            },
                            'less-loader'
                        ]
                    },
                    {
                        test: /\.html$/,
                        //这个是处理html的img图片的（负责引入img，从而能被url-loader打包处理）
                        loader: 'html-loader'
                    }
                ]
            }
        ]
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: 'css/built.[contenthash:10].css'
        }),
        new OptimizeCssAssetsWebpackPlugino(),
        new HtmlWebpackPlugin({
            template: './src/index.html'
        }),
        new WorkboxWebpackPlugin.GenerateSW({
            clientsClaim: true,
            skipWaiting: true
        })
    ],
    mode: 'production',
    devtool: 'source-map'
}