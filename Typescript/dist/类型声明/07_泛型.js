"use strict";
(() => {
    // function fn<T>(a: T): T{
    //     return a;
    // }
    // // 1. 可以直接调用，让编译器自动去判断类型
    // console.log(fn(2));
    // console.log(fn("gg"));
    // // 2. 也可以指定类型调用
    // let s = fn<string>('44')
    // console.log(s);
    function fn2(a, b) {
        console.log(a);
        console.log(b);
        return a;
    }
    fn2(32, 'gg');
    fn2('33', 33);
    function fn3(a) {
        return 2;
    }
    fn3({ name: 'gg' });
})();
