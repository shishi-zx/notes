export namespace A{
    export let shishi:string = 'hh'
}
export namespace A{
    let shishi:string = 'ff'//不报错
}

export namespace B{
    export let shishi:string = 'gg'
}
export namespace B{
    //export let shishi:string = 'gg' //报错
    export let shishi_02:string = 'gggggg'
}


console.log(B.shishi);//gg
console.log(B.shishi_02);//gggggg
//console.log(shishi);//报错
//console.log(A.shishi);//报错


//可以作为模块暴露出去，然后在其他文件中引入该命名空间
//本文件中暴露出去
//其他文件中这样引入
// import {A,B} from './01_index'

// console.log(A.shishi);

