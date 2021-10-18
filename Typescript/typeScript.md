* TypeScript  是 js 的超集
* 使js编写代码更加规范
* 扩展了js，并添加了类型

* TS不能被js解析器直接执行，需要经过编译为js文件
* 增加了：
  * 类型
  * 支持ES的新特性
  * 添加了ES中不具备的新特性
  * 丰富的配置选项
  * 匹配了一些强大的开发工具

# 开始

## 安装TypeScript

```bash
npm i -g typescript
```

创建一个文件，文件为 .ts文件，然后编写ts代码

## 编译ts文件

```bash
tsc xx.ts
//然后会在同目录下生成.js文件
```

==如果报错系统不支持脚本，则在终端中输入，一定管理员权限进入终端==

```shell
set-ExecutionPolicy RemoteSigned
```

# 类型声明

* 类型声明是TS中非常重要的一个特点
* 通过类型声明可以指定TS中变量（参数，形参）的类型
* 指定类型后，当为变量赋值时，TS编译器会自动检查是否符合类型声明，符合则赋值，负责报错
* 简而言之，类型声明给变量设置了类型，使得变量只能存储某种类型的值

```js
let a:number
a= 10
console.log(a);
//a = 'gg' 会报错  但是编译一定会成功
```

```js
let str: string
```

* 注意如果声明变量时候不指定类型，TS会根据值指定类型

```typescript
let bool = false
// === 
let bool: boolean
bool = false
```

* 函数参数也可以加
  * 参数类型必须符合
  * 参数个数必须符合
  * 可以指定返回值类型，在 括号（）后面加类型注解

```typescript
function sum(a:number,b:number): number{
    return a+b
}
console.log(sum(12,34));//如果传字符串 ‘23’会报错,如果参数传的不够或者多了也会报错
```

* 类型统计

| 类型    | 例子               | 描述                               |
| ------- | ------------------ | ---------------------------------- |
| number  | 2，-34 5.6         | 任意数字                           |
| string  | 'hello', 'shishi'  | 任意字符串                         |
| boolean | true false         | 布尔值                             |
| 字面量  | 其本身             | 限制变量的值就是该字面量的值       |
| any     | *                  | 任意类型                           |
| unknown | *                  | 类型安全的 any                     |
| void    | 空值（undefined）  | 没有值（undefined）                |
| never   | 没有值             | 不能是任何值                       |
| object  | {id:1,msg:'hello'} | 任意的js对象                       |
| array   | [1,2,3]            | 任意js数组                         |
| tuple   | [2,3]              | 元组，TS新增的类型，固定长度的数组 |
| enum    | enum{A,B}          | 枚举，TS新增类型                   |

* 字面量

```typescript
//可以直接字面量声明类型
let num2 : 10  //指定num2固定值为 10 ，不能修改
//num2 = 11//报错

//可以使用 | 来来连接多个类型  : 联合类型
let p : "male" | "female"
p = "male"
p = "female"
//p = "hh";//报错

let a: boolean | string
a = true
a = "str"
```

* any  （不建议使用）

```typescript
//设置为any后，相当于没有用 TS 类型限制，又回到js一样了
let b :any
b =1
b = "str"
b = true

let str: string
str = b// 而且 any 类型可以赋值给其他类型，霍霍了别人的类型检查
```

* unknow（建议用它替换any,他是一个类型安全的 any）

```typescript
// unknow 表示未知类型的值
let c: unknown
c = 1
c = "hello"
c = true

let str: string
//str = c//会报错 unknow 不可以赋值给其他类型，
//所以要先类型检查
if(typeof c === "string"){
    str = c
}
//或者使用TS的类型断言，告诉编译器 c 就是字符串，有两种写法
str = c as string
str = <string>c
```

* void (表示返回值为空值)

```typescript
function fn():number{
    return 12
}
function fn2():boolean{
    return true
}
function fn3():void{
    //return true  //会报错，因为设置了没有返回值
    //可以返回  undefined
}
```

* never （表示没有返回值，永远不会返回结果，什么都没有，于空不同，空也是一种结果）

```typescript
function fn4():never{
    //return true  //会报错，因为设置了没有返回值
    //return undefined 会报错
    throw new Error('error')//这种不会返回结果的函数就可以设置never ，不写这行代码never会报错
}
```

* object

```typescript
//obj 只能用来表示 js 对象, 一般来说并不实用，因为对于对象，一般都只关注于属性，而不管是不是对象
let obj: object
obj = {}
obj = function(){}

//这种也表示是一个对象，而且这样写之后，能对里面的属性做类型限制,而且也限制要包含那些属性
let obj2 : {
    id: number,
    name:string
}

//obj2 = {}// 会报错，缺少name，id属性
obj2 = {id:2,name:'ss'}//结构必须和指定的一样，属性不能多也不能少，除了 ？ 表示的可选属性
obj2 = {id:2,name:'ss',option: '我是可选属性'}
```

* 或者我们可以只限制必须要有的属性，其他属性不做限制

```typescript
//通过处理来实现这种需求，[qitashuxing: string]: any表示任意类型的属性
let obj3: {name: string, [qitashuxing: string]: any}
obj3 = {name: 'gg',age: 34,gender: 1}//只有name是必须的
```

* Function

```typescript
//可以这样写, 类似于箭头函数的写法， 表示参数必须是什么样的（个数，类型），返回值必须是什么类型的
let f:  (a:number, b: number)=>number
f = function(n,m){
    //return 'gg'//报错
    return n+m
}
```

* Array

```typescript
//对于数组   类型[]； 表示什么类型的数组
let arr: string[]; // 表示是字符串的数组，只能是字符串
arr = ['1','ggag','hello']

//或者另一种方式来表示数组
let arr2: Array<number>
arr2 = [1,2,3,4,5,5,8]
```

* tuple（TS新增）*： 元组，TS新增的类型，固定长度的数组

```typescript
//元组，固定长度的数组
let arr3: [string, string, number]
arr3 = ['gg','hh', 45]
```

* enum（TS新增）: 枚举

```typescript
//枚举
// enum Gender{
//     Male = 0,
//     Female = 1
// }
//其实值已经并不重要了
enum Gender{
    Male,
    Female
}
let p : {name: string, gender: Gender}
p = {
    name: 'ss',
    gender: Gender.Male
}
if(p.gender === Gender.Female)console.log('hh');

```

* 别名： type

```typescript
//给 string 起了别名
type myType = string
let m: myType
m = 'hh'

//意义在于
//类型的别名
type myType2 = 1|2|3|4
// let k: 1|2|3|4
// let l: 1|2|3|4
let k: myType2
let l: myType2
```



# 类型断言

* 用来告诉解析器变量的实际类型
* 语法：
  * 变量 as 类型 ：  `str as number`
  * <类型>变量：  `<number>str`