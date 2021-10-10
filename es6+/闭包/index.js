//闭包（closure）指有权访问另一个函数作用域中变量的   函数
// fun 的函数作用域访问了另外一个函数fn里面的局部变量num
function fn() {
    let num = 10
    function fun() {
        console.log(num);
    }
    return fun;
}
let f = fn()
f()