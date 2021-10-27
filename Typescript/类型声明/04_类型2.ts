function fn():number{
    return 12
}
function fn2():boolean{
    return true
}
function fn3():void{
    //return true  //会报错，因为设置了没有返回值
    return undefined
}
function fn4():never{
    //return true  //会报错，因为设置了没有返回值
    //return undefined 会报错
    throw new Error('error')//这种不会返回结果的函数就可以设置never ，不写这行代码never会报错
}

//obj 只能用来表示 js 对象, 一般来说并不实用，因为对于对象，一般都只关注于属性，而不管是不是对象
let obj: object
obj = {}
obj = function(){}

//这种也表示是一个对象，而且这样写之后，能对里面的属性做类型限制
let obj2 : {
    id: number,
    name:string,
    option? : string
}

//obj2 = {}// 会报错，缺少name，id属性
obj2 = {id:2,name:'ss'}//结构必须和指定的一样，属性不能多也不能少，除了 ？ 表示的可选属性
obj2 = {id:2,name:'ss',option: '我是可选属性'}

let obj3: {name: string, [qitashuxing: string]: any}
obj3 = {name: 'gg',age: 34,gender: 1}

//这样去限制函数类型也和object有相同的思路，我们应该去限制他的参数和返回值，而不是关注于是不是函数
let d: Function

//可以这样写, 类似于箭头函数的写法， 表示参数必须是什么样的，返回值必须是什么类型的
let f:  (a:number, b: number)=>number
f = function(n,m){
    //return 'gg'//报错
    return n+m
}

