const { resolve } = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
    entry:'./src/js/index.js',
    output: {
        filename: 'built.js',
        path: resolve(__dirname,'dist')
    },
    module:{
        rules:[
            {
                test: /\.css/,
                use: [
                    'style-loader',
                    'css-loader'
                ]
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './src/index.html'
        })
    ],
    mode: 'development',
    resolve: {
        alias: {
            $css: resolve(__dirname,'./src/css')
        }
    },
    devServer: {
        static: resolve(__dirname,'dist'),
        compress: true,
        port: 8000,
        host: 'localhost',
        open: true,
        hot: true,
        // clientLogLevel: 'none',
        // quiet: true,
        client: {
            overlay: false,
        },
        proxy: {
            '/api': {
                target:'http://localhost:3000',
                pathRewrite: {
                    '^/api': ''
                }
            }
        }
    }
}