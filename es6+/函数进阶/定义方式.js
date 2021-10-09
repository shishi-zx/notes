//1. 自定义函数（命名函数）
function fn() {}
//2. 函数表达式（匿名函数）
let fn2 = function() {}
//3. 利用new关键字  new Function("参数1","参数2"，"函数体")
let fn3 = new Function("console.log(1,2,3)")
let fn4 = new Function("a","b","console.log(a+b)")
fn3()
fn4(4,5)
