/*
    webpack.config.js  webpack 的配置文件

    使用 commonjs 语法规范
*/

// resolve 是用来拼接绝对路径的方法
const { resolve} = require('path')

module.exports = {
    // webpack 的配置

    // 入口起点
    entry: './src/index.js',

    // 输出
    output: {
        // 输出文件名
        filename: 'built.js',

        // 输出路径
        // __dirname 表示当前文件的目录绝对路径
        path: resolve(__dirname, 'build')
    },

    // loader
    module: {
        rules: [
            // 详细 loader的配置
            {
                // test 是正则匹配，匹配哪些文件要做处理
                test: /\.css$/,
                // use 是指定使用哪些 loader 处理
                use: [
                    //use数组中的loader执行顺序：从右到左，从下到上，一次执行
                    // 创建一个style标签，将 js中的css样式资源插入进去，添加到 页面（head）中生效
                    'style-loader',
                    // 将 css文件变成commonjs模块加载到js中，里面内容是样式字符串
                    'css-loader'
                ]
            },
            {
                test: /\.less$/,
                use: [
                    'style-loader',
                    'css-loader',
                    // 需要下载 less 和 less-loader
                    'less-loader'
                ]
            }
        ]
    },

    //plugins 的配置
    plugins: [
        // 详细插件的配置
    ],

    // 模式
    mode: 'development'
    // mode: 'production'
}