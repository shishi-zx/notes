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
        ]
    },
    plugins: [new HtmlWebpackPlugin()],
    mode: 'development',
    resolve: {
        //配置解析模块路径别名, 在js代码引文件时候，代替路径
        alias: {
            $css: resolve(__dirname,'./src/css')
        },
        extensions: ['.js','.json','.css'],
        // modules: ['node_modules'],
        modules: [reslove(__dirname,'../../node_modules'),'node_modules']
    }
}