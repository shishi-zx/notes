/*
    index.js: webpack 入口起点文件

    1. 运行指令：
        开发环境： webpack ./src/index.js -o ./build/built.js  --mode=development
        : webpack 会以 ./src.index.js 为入口文件开始打包，打包后输出到 ./build/built.js
        整体打包环境，是开发环境

        生产环境：webpack ./src/index.js -o ./build/built.js  --mode=production
            : webpack 会以 ./src.index.js 为入口文件开始打包，打包后输出到 ./build/built.js
            整体打包环境，是生产环境
 */

import $ from 'jquery'

// webpack打包失败
// import './index.css'
console.log($);

function sum(x,y) {
    return x + y
}

console.log(sum(3, 5));