console.log('index.js is load');


// 1 注册 servicework
// 2 处理兼容性问题
if('serviceWorker' in navigator) {
    window.addEventListener('load',() => {
        navigator.serviceWorker.register('./service-worker.js')
        .then(() => {
            console.log('serviceWorker 注册成功');
        })
        .catch(() => {
            console.log('serviceWorker 注册失败');
        })
    })
}