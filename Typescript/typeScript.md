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



# 泛型

* 在定义函数或者类时候，不知道类型就可以使用泛型

* 使用 `<名字>` 来表示泛型  

```typescript
function fn<T>(a: T): T{
    return a;
}

// 1. 可以直接调用，让编译器自动去判断类型
console.log(fn(2));
console.log(fn("gg"));

// 2. 也可以指定类型调用
let s = fn<string>('44')
console.log(s);
```

* 泛型可以指定多个

```typescript
function fn2<T, K>(a: T, b: K): T{
    console.log(a);
    console.log(b);


    return a
}

fn2(32,'gg')
fn2<string, number>('33',33)
```

* 泛型也可以指定继承了谁(接口，类都行)

```typescript
interface Int{
    name: string
}

function fn3<T extends Int>(a: T): number{
    return 2
}

fn3({name: 'gg'})
```



# 编译选项

* 如果在每次修改ts文件后自动编译为js文件

  * 方式一

    ```bash
    tsc 06_编译选项.ts  -w
    
    //可以开启编译模式，就不需要每次修改完之后再去重新编译了,命令行会卡住状态，修改完后有提示变化
    
    //只针对当前文件，所以如果同时修改多个文件，需要开启多个控制台
    ```

  * 方式二

    ```typescript
    // tsc 命令  再加一个配置文件 tsconfig.json
    
    // 它可以自动编译所有tsc文件(配置文件什么也不写默认就是这个效果)
    
    // 然后  tsc -w  会监视所有ts文件
    ```

## ts配置文件： tsconfig.json

* 是ts编译器的配置文件，ts编译器可以根据它的信息来对代码进行编译
* 这个json文件可以写注释

## 编译选项

### include

* 用来指定哪些ts文件需要被编译

```json
{
    "include": [
        //"./src/**/*"  //表示只编译src目录下任意文件夹下的任意文件
        "06_编译选项.ts"
    ]
}
```

* `*`表示任意文件，`**`表示任意文件夹

### exclude

* 于include相反，不包含那些文件

* 默认值为:

  ```json
  ["node_modules","bower_components","jspm_packages"]
  ```

### extends

* 指定继承的配置文件

### files

* 指定被编译文件的列表, 与include差不多，files主要是文件少时候可以用

  ```json
  "files": [
      "index.ts",
      "haha.ts",
      "binder.ts"
  ]
  ```

  

### compilerOptions

* 编译器的配置，很重要
* 有很多子选项

#### target： 

* 指定被编译成哪个版本的es版本

```json
"compilerOptions": {
     "target": "ES6",//默认为es3
}
```

#### module

* 指定导入的模块使用哪个es版本编译, 和target一个意思，只不过一个是本文件，一个是引入的文件

```json
"compilerOptions": {
        "target": "ES6",//默认为es3
        "module": "ES6",
}
```

#### lib

* 指定项目中要使用的库
* 一般都不需要去改这个选项

```json 
"lib": ["dom"],//指定我们要用到DOM库
```

#### outDir

* 指定编译后的文件放到哪个文件夹，默认放在一起

```json
"compilerOptions": {
    "target": "ES6",//默认为es3
    "module": "ES2015",
    //"lib": ["dom"],//指定我们要用到DOM库
    "outDir": "./dist",
}
```

#### outFile

* 可以用来将代码合并为一个文件

```json
"compilerOptions": {
    "target": "ES6",//默认为es3
    "module": "System",
    //"lib": ["dom"],//指定我们要用到DOM库
    // "outDir": "./dist",
    "outFile": "./dist/app.js",//如果要合并模块的话，模块必须规范，module必须是 System 或 amd
}
```

#### allowJs, checkJs

* 设置是否编译 js文件（默认为false）
* 设置是否检查js语法（像ts一样）（默认为false）

```json
"compilerOptions": {
        "target": "ES6",//默认为es3
        "module": "ES2015",
        "outDir": "./dist",
        "allowJs": true,
   		"checkJs": true,
    }
```

#### removeComments

* 设置是否将注释也放进到编译后的文件，默认为false

#### noEmit

* 是否生成编译文件，默认为false，true的话只执行编译过程而不生成文件

#### noEmitOnError

* true：编译出错则不生成编译文件，默认false（所以才会编译出错也能编译上去）

#### alwaysStrict

* 设置编译后的文件是否使用严格模式，默认为false
* 编译后的文件就会加上  ”use strict"
* 注意如果有使用 module化的话，js是默认严格模式的



#### noImplicitAny

* 设置是否检查隐式any
* 默认false
* true后，使用隐式any类型会报错

#### noImplicitThis

* 检查this，是否是确定的this，因为调用的不同，this可能不同
* 默认false

#### strictNullChecks

* 严格检查空值，如果值可能是空值时候，会报错
* 默认false

#### strict

* 所有严格检查的总开关，包含前面这几个严格检查



# 面向对象

## 类

* 定义类
* 于java的类有相通的地方
* 使用class定义类
* 使用static声明静态属性

```typescript
class Dog {

    //实例属性，通过实例访问
    name: string = 'shishi'
    age: number = 10

    //类属性（静态属性），通过类访问
    static type: string = 'Dog'
    
    say(){
        console.log('汪');
    }
}

const dog = new Dog()

console.log(dog.name);
console.log(Dog.type);
```

声明时候的关键字

* static： 声明为静态属性，属性和方法都可以指定为静态的，（类方法或者类属性）
* readonly：声明为只读属性，于static连用要放在后边

```typescript
class Dog {

    //实例属性，通过实例访问
    readonly name: string = 'shishi'
    age: number = 10

    //类属性（静态属性），通过类访问
    static readonly type: string = 'Dog'
    
    static say(){
        console.log('汪');
    }
}

const dog = new Dog()

console.log(dog.name);
//dog.name = "jj"//报错,只读属性
console.log(Dog.type);
```

## 构造函数

* 使用构造函数来初始化实例对象
* 会在每次创建实例时候调用
* 构造函数里的this就是新创建的实例,但是注意其他方法还是要看是谁调用的

```typescript
class People{
    readonly name: string
    age: number
    constructor(name: string ,age: number){
        this.name = name
        this.age = age
        console.log(this);
        
    }

    say(){
        console.log('hi, I`m '+this.name);
        
    }
}
let p1 = new People('luffy',13)
let p2 = new People('zero',15)
let p3 = new People('black',39)

console.log(p1);
console.log(p2);
console.log(p3);
p1.say()
p2.say()
p3.say()

p3.say.call(p2)//p2
```

## 继承

* 与其他面向对象的语言一样的意思
* 使用继承后，子类继承父类所有属性和方法
* 子类可重写方法，也可以添加自己的方法

```typescript
class Animal{
    name: string
    age: number

    constructor(name:string,age:number){
        this.name = name
        this.age = age
    }

    say(){
        console.log('!!!');

    }
}

class Dog extends Animal{
    say(){
        console.log(this.name,": wang !");

    }
}
class Cat extends Animal{
    say(){
        console.log(this.name,": miao !");

    }
}

const dog = new Dog('wangCai',2)
const cat = new Cat('maoMao',1)

console.log(dog);
console.log(cat);

dog.say()
cat.say()
```

* 与java一样，使用super关键字表示父类
* 如果子类中写了构造函数，**必须要super调用父类的构造函数**，不写构造函数会自动调用父类的构造函数

```typescript
class Animal {
    constructor(name, age) {
        this.name = name;
        this.age = age;
    }
    say() {
        console.log('!!!');
    }
}
class Dog extends Animal {
    constructor(name, age) {
        super(name, age);
        console.log('创建了 Dog');
        super.say();
    }
    say() {
        console.log(this.name, ": wang !");
    }
}
class Cat extends Animal {
    constructor(name, age) {
        super(name, age);
        console.log('创建了 Cat');
        super.say();
    }
    say() {
        console.log(this.name, ": miao !");
    }
}
const dog = new Dog('wangCai', 2);
const cat = new Cat('maoMao', 1);
console.log(dog);
console.log(cat);
dog.say();
cat.say();
```

## 抽象类

* 愈来愈像java了
* 使用 abstract关键字来定义抽象类
* 抽象类只能被继承，不能被实例化（不能 new）
* 抽象类里可以定义抽象方法，抽象方法必须被子类重写
* 抽象方法：
  * 使用abstract声明
  * 子类必须重写父类的抽象方法
  * 抽象方法只给出结构，不给实现

```typescript
abstract class Animal{
    name: string
    age: number

    constructor(name:string,age:number){
        this.name = name
        this.age = age
    }

    abstract say(): void
}
```



## 接口

* 抽象类都有了，接口也得有吧，愈来愈像了
* 接口就是一种规范
* 使用 interface 声明

```typescript
/**
 * interface
 *  使用接口来定义一个类结构，规定一个类中该包含哪些属性和方法
 *  同时它可以当作类型声明去使用 （type 关键字），但是接口可以重复声明，会合并在一起
 *  与抽象类相似，但是接口中不能给实际值，全都是抽象属性和抽象方法
 */
interface myInterface{
    name: string
    age: number
}
interface myInterface{
    gender: string
}
interface myInterface{
    say():void
}

//可以在定义类的时候，限制类的结构
class Animal implements myInterface{
    name: string;
    age: number;
    gender: string;

    constructor(name: string,age:number,gender: string){
        this.name = name
        this.age = age
        this.gender = gender
    }
    say(): void {
        throw new Error("Method not implemented.");
    }

}
```

## 属性的封装

* 注意在js中，对象的属性是可以通过  . 属性名来读取和修改的，显然这不是面向对象的思想
* 所以与java一样，还有其他的属性修饰符（注意这一切的前提是ts，not js）
  * public：公有属性（子类和外部都能访问）（默认值就是public）
  * private：私有属性（子类和外部都不能访问）
  * protect：保护属性 (子类可以访问，外部不能)
* 与之对应的getter和setter也就出来了

```typescript
class Person{
    private name: string
    private age: number

    constructor(name:string, age:number){
        this.name = name
        this.age = age
    }

    getName(){
        return this.name
    }
    getAge(){
        return this.age
    }
    setName(name: string){
        this.name = name
    }
     setAge(age:number){
        if(age<0)return
        this.age = age
    }
}

const p1 = new Person('shishi',23)

//console.log(p1.name);//ts 报错

console.log(p1.getName());
p1.setName('gg')
console.log(p1.getName());

```

* 但是一般在 TS中这样去写 getter 和 setter

```typescript
class Person{
    private name: string
    private age: number

    constructor(name:string, age:number){
        this.name = name
        this.age = age
    }

    // getName(){
    //     return this.name
    // }
    // getAge(){
    //     return this.age
    // }
    // setName(name: string){
    //     this.name = name
    // }
    // setAge(age:number){
    //     if(age<0)return
    //     this.age = age
    // }

    //但是 不能和属性重名， 也就是不能写小写 name，外部可以直接 通过 .获取到 （p.Name）
    get Name(){
        return this.name
    }

    set Name(name:string){
        this.name = name
    }

    get Age(){
        return this.age
    }

    set Age(age:number){
        if(age<0)return
        this.age = age
    }


}

const p1 = new Person('shishi',23)

//console.log(p1.name);//ts 报错

// console.log(p1.getName());
// p1.setName('gg')
// console.log(p1.getName());

//对应第二种写法
console.log(p1.Name);
p1.Name = 'gg'
console.log(p1.Name);
```

* 注意，在TS中，你可以这样写来简化类的写法

```typescript
 // 可以直接将属性定义在构造函数中，而不用在类的头部单独写了
class Dog{
    constructor(public name: string, private age: number){

    }
}
// 等价于
// class Dog{
//     public name: string
//     private age: number
//     constructor(name:string,age:number){
//         this.name = name
//         this.age = age
//     }
// }

let d = new Dog('ff',23)

console.log(d.name);
```

# 装饰器

* 一种特殊类型的声明
* 其实就是一个方法，可以注入到类，方法，属性参数上来扩展功能
* 能够添加到类声明，方法，属性上，可以修改类的行为
* 写法：
  * 普通装饰器（不能传参数）
  * 装饰器工厂（可传参）

```typescript
// 定义装饰器
function myLog(parmas:any){

    console.log(parmas);// parmas 就是当前类

    parmas.prototype.msg = 'ha ha'//给当前类扩展一个属性


}

//使用装饰器
@myLog
class Person{
    constructor(){

    }

    getData(){

    }
}

let p1:any = new Person()
console.log(p1.msg);// ha ha

```

* 上面这种是普通装饰器，不可以传参数
* 装饰器工厂

```typescript
function myLog(params:string){


    // return 的这个函数的参数就是类本身
    return function(target:any){
        console.log(target);
        console.log(params);

        target.prototype.msg = params

    }
}

@myLog('ha ha ha')
class Dog{
    constructor(){

    }
    getName(){

    }
}

// 执行此文件控制台会输出
//[class Dog]
//ha ha ha

let d:any = new Dog()
console.log(d.msg);// ha ha ha
```

* 类装饰器
  * 如果装饰器方法里return 一个类构造函数（继承了装饰的类，就是接收到的target参数）那么被该装饰器装饰的类会使用提供的构造函数来替换类的声明（原来的类就变成装饰后返回的子类）
  * 但是注意，这种情况下必须重写父类方法，不然报错

```typescript
function myLog(params:any){
    console.log(params);
    return class extends params{
        msg:string = '被改了'
    }
}

@myLog
class Dog{
    public msg: string | undefined
    constructor(){
        this.msg = '我是原来的'
    }
}

let d = new Dog()
console.log(d.msg);// 被改了
```

* 属性装饰器
  * 会在运行时当作函数被调用，传入两个参数
    * 对于静态成员来说是类的构造函数，对于实例来说是类的原型对象
    * 成员的名字

```typescript
// 定义一个属性装饰器
function myValue(params:any){
   return function(target:any,attr:string){
       console.log(target);// {}   注意执行此文件就会打印这两行，不需要 new 实例，因为在类里 使用 @的时候就当作函数执行过这一段代码了
       console.log(attr);// msg

       target[attr] = params

   }
}
class Dog{

    @myValue('hello')
    public msg: string | undefined

    constructor(){
    }
}

let d = new Dog()
    console.log(d.msg);// hello
```

* 方法装饰器
  * 接受三个参数
    * 对于静态成员来说是类的构造函数，对于实例来说是类的原型对象
    * 方法的名字
    * 方法的属性描述符

```typescript
 // 定义一个方法属性装饰器
function myFn(params:any){
   return function(target:any,methodsName:string,desc:any){
      console.log(target);// {}
      console.log(methodsName);// getData
      console.log(desc); //{
                        //     value: [Function: getData],
                        //     writable: true,
                        //     enumerable: false,
                        //     configurable: true
                        //   }

      target['name'] = 'shishi'

      // 可以修改被装饰的方法
      // 1.先保存当前方法
      let old = desc.value

      // 2.如果要替换方法的话就这样写,没有第三步
      desc.value = function(...args:any[]){
            args = args.map((i)=>{
                return String(i)
            })

            console.log(args);

            // 3. 如果只是想修改的话，调用一下原来的方法
            old.apply(this,args)

      }

   }
}
class Dog{
    public msg: string | undefined

    constructor(){
    }

    @myFn('gggg')
    getData(){
        console.log('如果只是替换的话看不到我');

    }
}

let d:any = new Dog()
console.log(d.name);//shishi
d.getData(12,'34','gg',45)// [ '12', '34', 'gg', '45' ]  //如果只是替换的话看不到我

    
```

* 方法参数装饰器
  * 会在运行时候当作函数被调用，可以使用参数装饰器为类的原型增加一些元素数据，传入三个参数
    * 对于静态成员来说是类的构造函数，对于实例来说是类的原型对象
    * 参数所在方法的方法名称
    * 参数在函数的参数列表中的索引

```typescript
// 定义一个方法属性装饰器
function myFnParams(params:any){
   return function(target:any,paramsName:string,paramsIndex:number){
      console.log(target);// {}
      console.log(paramsName);// getData
      console.log(paramsIndex);//1
      console.log(params);// agexx



   }
}
class Dog{
    public msg: string | undefined

    constructor(){
    }
    //getData(name:string, age:number){
    getData(name:string,@myFnParams('agexx') age:number){


    }
}
```

* 装饰器执行顺序
  * 属性->方法->方法参数->类
  * 如果多个同样装饰器，会先执行后面的，就近
  * 从上到下，从里到外，从右到左

# 命名空间

* 为了避免多个文件的命名冲突

```typescript
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
```







# 补充

* 可以使用 ts-node包来简化ts文件执行步骤
  * 它会先转化为js文件，然后执行这个js文件
  * 而且这里不会在文件夹中产生新的js文件，但实际上是转换为js文件执行的
  * 安装`npm i -g ts-node`
  * 使用： `ts-node  app.ts`

## TS中函数重载

* 与java重载一个意思，但是写法思路不一样
* java中函数重载是因为同名函数的参数不一样
* TS中重载是通过为同一个函数提供多个函数类型定义来达到多种功能的目的
* 写法区别(因为要兼容es5)：

```typescript
function add(a:number):number

function add(a:number,b:number):number

function add(a:string):string

function add(a:any,b?:number):any{
    if(typeof a === 'string'){
        return a+'#'
    }else{
        if(!b)
        return a*10
        return a+b
    }
}

console.log(add(2));//20
console.log(add(2,3));//5
console.log(add('shishi'));//shishi
```

* 这只是为了迎合重载的思想