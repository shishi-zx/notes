const { resolve } = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

//设置nodejs环境变量
process.env.NODE_ENV = 'development'

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
                    MiniCssExtractPlugin.loader, 
                    'css-loader',
                    /*
                        css 兼容性处理： 使用postcss：安装 postcss-loader postcss-preset-env

                        帮postcss找到package.json中的broswerslist里面的配置，通过配置加载指定的css兼容性样式
                    */
                    // 1. 直接使用默认配置
                    //'postcss-loader',
                    // 2 .修改配置，不适用默认，写成对象形式
                    {
                        loader: 'postcss-loader',
                        options: {
                            postcssOptions: {
                                plugins: [
                                [
                                    // postcss 的插件, 可以在postcss官网查询
                                    'postcss-preset-env',
                                    {
                                    // 其他选项
                                    },
                                ],
                                ],
                            },
                        },
                    },
                ]
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './src/index.html'
        }),
        new MiniCssExtractPlugin({
            filename: 'css/built.css'
        })
    ],
    mode: 'development'
}