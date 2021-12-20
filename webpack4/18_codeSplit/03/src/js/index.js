
function log(msg){
    console.log(msg)
}

log('hello hhhhh')
// log(fn1())

/**
 * 通过js代码，让某个文件被单独打包成一个chunk
 */
// es10的语法
// import(/* webpackChunkName: 'test' */'./test')
// .then((res)=>{
//     console.log(res)
//     res.fn1
//     res.fn2
// })
// .catch((err)=>{
//     console.log(err)
// })

async function loadTest(){
    let {fn1 ,fn2} = await import(/* webpackChunkName: 'test' */'./test')
    log(fn1())
    log(fn2())
}
loadTest()
