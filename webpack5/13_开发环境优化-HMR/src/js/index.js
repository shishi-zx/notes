import printfMsg from "./log";
import '../css/index.css'

printfMsg('这是入口文件')

printfMsg('hhh')

let btn = document.querySelector('button')
btn.addEventListener('click',()=>{
    printfMsg('点击按钮')
})

if(module.hot){
    // 一旦module上有hot属性，说明开启了HMR功能，这时候我们需要让HMR功能代码生效
    module.hot.accept('./log.js', function () {
        // 该方法会监听 log.js 文件的变化，一旦发生并变化，其他文件默认不会重新打包构建
        // 会执行该回调
        console.log('log.js文件更新');
        // printfMsg()
    })
}