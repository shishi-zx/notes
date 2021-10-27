"use strict";
(() => {
    //可以直接字面量声明类型
    let num2; //指定num2固定值为 10 ，不能修改
    //num2 = 11//报错
    //可以使用 | 来来连接多个类型  : 联合类型
    let p;
    p = "male";
    p = "female";
    //p = "hh";//报错
    let a;
    a = true;
    a = "str";
    //设置为any后，相当于没有用 TS 类型限制，又回到js一样了
    let b;
    b = 1;
    b = "str";
    b = true;
    // let str: string
    // str = b// 而且 any 类型可以赋值给其他类型，霍霍了别人的类型检查
    // unknow 表示未知类型的值
    let c;
    c = 1;
    c = "hello";
    c = true;
    let str;
    //str = c//会报错 unknow 不可以赋值给其他类型，
    //所以要先类型检查
    if (typeof c === "string") {
        str = c;
    }
    //或者使用TS的类型断言
    str = c;
    str = c;
})();
