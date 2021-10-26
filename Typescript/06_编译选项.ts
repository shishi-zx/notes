// import {price} from 'test.js'
(() => {
    console.log('haha');
    let a = 100
    let b = 9

    // console.log(price);
    
})()


//方式一
// tsc 06_编译选项.ts  -w
//可以开启编译模式，就不需要每次修改完之后再去重新编译了,命令行会卡住状态，修改完后有提示变化
//只针对当前文件，所以如果同时修改多个文件，需要开启多个控制台

//方式二
// tsc 命令  再加一个配置文件 tsconfig.json
// 它可以自动编译所有tsc文件(配置文件什么也不写默认就是这个效果)
// 然后  tsc -w  会监视所有ts文件