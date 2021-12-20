const { resolve } = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
    entry: './src/index.js',
    output: {
        filename: 'built.js',
        path: resolve(__dirname,'build')
    },
    module: {
        rules: [
            {
                test: /\.css$/,
                use: [
                    'style-loader',
                    'css-loader'
                ]
            },
            {
                test: /\.html$/,
                //这个是处理html的img图片的（负责引入img，从而能被url-loader打包处理）
                loader: 'html-loader'
            },
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './src/index.html'
        })
    ],
    mode : 'development',

    // 开发服务器 devServer： 自动编译打包，自动打开浏览器，自动刷新浏览器
    // 特点： 只会在内存中编译打包，不会有任何输出
    // 启动命令： npx webpack-dev-server ,需要安装这个包
    // webpack5 的启动命令为 webpack server
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