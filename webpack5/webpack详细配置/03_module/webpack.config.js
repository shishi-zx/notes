const { resolve } = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
    entry: './src/index.js',
    output: {
        filename: 'built.js',
        path: resolve(__dirname,'dist')
    },
    module: {
        rules: [
            //loader
            {
                test: /\.css/,
                //多个loader用use包裹
                use:[
                    'style-loader',
                    'css-loader'
                ]
            },
            // {
            //     test: /\.js/,
            //     // 单个loader
            //     exclude: /node_modules/,
            //     // includes: resolve(__dirname,'src'),
            //     enforce: 'pre',
            //     loader: 'eslint-loader'
            // }
        ]
    },
    plugins: [new HtmlWebpackPlugin()],
    mode: 'development'
}