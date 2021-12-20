
console.log('index 被加载了')

document.getElementById('btn').onclick = function(){
    import(/* webpackChunkName: 'test' ,webpackPrefetch: true */'./test')
    .then(( {add } ) => {
        console.log(add(2,4));
    })
}
