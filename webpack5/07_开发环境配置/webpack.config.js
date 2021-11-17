/*
    开发环境配置，能运行代码就行

*/
const { resolve } = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
module.experts = {
    entry: './src/index.js',
    output: {
        filename: 'built.js',
        path: resolve(__dirname, 'build')
    },
    module: {
        rules: [
            // loader的配置
            {
                test: /\.css$/,
                use: ['style-loader','css-loader']
            },
            {
                test: /\.(jpg|png|gif)$/,
                loader: 'url-loader',
                options: {
                    limit: 8*1024,
                    name: '[hash:10].[ext]',
                    esModule: false
                }
            },
            {
                // 处理html中的img问题
                test:/\.html$/,
                loader: 'html-loader'
            }
        ]
    },
    plugins: [
        // plugins 的配置
        new HtmlWebpackPlugin({
            template: './src/index.html'
        })
    ],
    devServer: {
        // contentBase: resolve(__dirname,'build'),
        static: resolve(__dirname,'build'),
        // 启动gzip压缩，让编译运行的更快
        compress: true,
        // 指定运行的端口号
        port: 3000,

        //自动打开浏览器
        open: true
    }
}