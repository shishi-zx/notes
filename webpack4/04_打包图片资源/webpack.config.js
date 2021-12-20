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
            // {
            //     // 处理图片资源
            //     test: /\.(jpg|png|jpeg|)$/,
            //     //只使用一个loader可以直接写,多个用 use
            //     // 要下载两个包，url-loader  file-loader
            //     loader: 'url-loader',
            //     options: {
            //         //当图片大小小于 8kb ，就会被base64处理（图片内容会变成字符串保存）
            //         // base64： 减少请求数量，但是图片体积会增大导致请求速度变慢
            //         // 根据资源而定
            //         limit: 8 * 1024,

            //         //而且url-loader默认使用es6的语法，import导入规则，html-loader是commonjs规则，会出问题
            //         //所以要关闭es6模块化
            //         esModule: false
            //     }
            // },
            {
                test: /\.html$/,
                //这个是处理html的img图片的（负责引入img，从而能被url-loader打包处理）
                loader: 'html-loader'
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './src/index.html'
        })
    ],
    mode : 'development'
}