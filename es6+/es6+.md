# 一 类

在es6中新增加了类的概念，可以使用class关键字声明一个类，之后以这个类来实例化对象

## 创建类

**语法：**

~~~js
class name {
  //body
}
~~~

**创建实例：**(要使用new来实例化类)

~~~js
var xx = new name()
~~~



## 类构造函数 constructor

* constructor()方法是类的构造函数（默认方法），用于传递参数，返回实例对象，通过new命令生成对象实例时，自动调用该方法，类内部会自动给我们创建一个constructor()

~~~js
class Person {
    constructor(name) {
        this.name = name
    }
}

let p1 = new Person('shishi')
let p2 = new Person('lisi')
console.log(p1);//Person { name: 'shishi' }
console.log(p2);//Person { name: 'lisi' }
~~~

## 添加共有方法

直接写在类里，它的所有实例都会有这个方法，并且this指向对应的实例

~~~js
class Person {
    constructor(name) {
        this.name = name
    }
    say(msg){
        console.log(this.name + " : " + msg);
    }
}

let p1 = new Person('shishi')
let p2 = new Person('lisi')

p1.say('hello')//shishi : hello
p2.say('byeBye')//lisi : byeBye
~~~

## 类的继承

* 使用 extends 关键字来实现继承，子类会继承父类的属性和方法

~~~js
class Animal {
    constructor() {
      
    }
    sayHello() {
        console.log('hello');
    }
}

class Dog extends Animal{

}

let d1 = new Dog(1, 3)
d1.sayHello()//hello
~~~

* 使用 super 关键字来访问和调用对象父类上的函数，可以调用父类的构造函数，也可以调用父类的普通函数

~~~js
class Animal {
    constructor(a,b) {
        this.a = a
        this.b = b
    }
    sum() {
        console.log(this.a + this.b);
    }
}

class Dog extends Animal{
    constructor(a, b) {
        super(a, b)//调用了父类的构造函数
    }
}

let d1 = new Dog(1, 3)
d1.sum()//4
~~~

调用父类的普通函数

* 如果子类重写了父类的方法，会执行子类的方法，而不会找到父类上去
* 可以在重写的方法中调用(super.方法名)来执行父类的方法

~~~js
class Animal {
    constructor(a,b) {
        this.a = a
        this.b = b
    }
    sayHello() {
        console.log('hello Animal');
    }
    sum() {
        console.log(this.a + this.b);
    }
}

class Dog extends Animal{
    constructor(a, b) {
        super(a, b)//调用了父类的构造函数
    }
    sayHello(){
        super.sayHello()
        console.log('hello Dog');
    }
}

let d1 = new Dog(1, 3)
// d1.sum()//4
d1.sayHello()// hello Animal  hello Dog
~~~

super()在构造函数中必须放到子类this之前

~~~js
constructor(a, b) {
    super(a, b)
    this.a = a
    this.b = b
}
~~~



~~~js
class Animal {
    constructor(a,b) {
        this.a = a
        this.b = b
    }
    sayHello() {
        console.log('hello Animal');
    }
    sum() {
        console.log(this.a + this.b);
    }
}

class Dog extends Animal{
    constructor(a, b) {
        super(a, b)
        this.a = a
        this.b = b
    }
    sub() {
        console.log(this.a - this.b);
    }
    sayHello(){
        super.sayHello()
        console.log('hello Dog');
    }
}

let d1 = new Dog(1, 3)
d1.sum()//4
d1.sub()//-2
~~~

## 注意点：

* es6中的类没有变量提升，必须先定义类，再实例化对象
* 类里面的共有的属性和方法一定要加this使用
* 类里面的this指向问题;
  * constructor 里面的this指向的是实例化后的对象
  * 方法里的this指向它的调用者（大多数情况下是实例对象，但是也要看是谁调用的）

## 构造函数和原型模拟类

* es6之前，js中没有类的概念
* es6之前，对象是基于一种称为构造函数的特殊函数来定义对象和他们的特征的

~~~js
//1.利用 new Object() 创建对象
var obj1 = new Object()
//2.利用 对象字面量创建对象
var obj2 = {}
//3.利用构造函数创建对象
function Dog(name, age) {
    this.name = name
    this.age = age
    this.say = function () { 
        console.log('汪');
     }
}
var d1 = new Dog('ss',22)
d1.say()
~~~

new 在执行时候会做四件事

* 在内存中创建一个新的空对象
* 让this指向这个对象
* 执行构造函数里面的代码，给这个新对象添加属性和方法
* 返回这个新对象（所以构造函数里不需要return）

静态成员和实例成员

* 实例成员：构造函数内部通过this添加的成员，实例成员只能通过实例化的对象来访问（不能通过构造函数访问）
* 静态成员：在构造函数本身上添加的成员，只能通过构造函数访问

~~~js
function Dog(name, age) {
    this.name = name
    this.age = age
    this.say = function () { 
        console.log('汪');
     }
}
Dog.type = 'animal'
var d1 = new Dog('ss',22)
d1.say()//实例成员
console.log(Dog.type);//静态成员
~~~

prototype原型对象

* 一般会将构造函数里的方法放到原型上，否则创建实例浪费内存
* 定义在原型对象上的方法，可以让所有的实例都共享

~~~js
//一般会将构造函数里的方法放到原型上，否则创建实例浪费内存
function Dog(name) { 
    this.name = name
}
Dog.prototype.say = function () { 
     console.log(this.name + ": 汪");
}
var d1 = new Dog('ss')
d1.say()//ss: 汪
~~~

`__proto__`对象原型: 它指向我们的构造函数的原型对象

~~~js
function Dog(name) { 
    this.name = name
}
Dog.prototype.say = function () { 
     console.log(this.name + ": 汪");
}
var d1 = new Dog('ss')
d1.say()//ss: 汪
console.log(d1.__proto__ === Dog.prototype);//true
~~~

查找方法会**顺着**原型链 (`__proto__`)查找

constructor  构造函数

* 对象原型（`__proto__`）和构造函数（prototype）原型对象里面都有一个属性 constructor属性，constructor我们称为构造函数，因为它指回构造函数本身，它主要就是为了记录某个实例对象是被谁创建的

~~~js
console.log(d1.__proto__.constructor === Dog);//true
~~~

如果我们给prototype重新指定了一个对象（原本这个对象是默认创建好的空对象），我们就需要手动指定constructor的指向，让它指向新的原型对象

~~~js
Dog.prototype = {
    constructor: Dog,
    sayHello(){
        console.log('hello');
    }
}

var d1 = new Dog('ss')
d1.sayHello()//hello
console.log(Dog.prototype.constructor === Dog);//true
console.log(d1.__proto__.constructor === Dog);//true
~~~

但是我们要在prototype改了之后，再去创建实例，否则实例的原型指向改之前的



### 继承：

* es6之前并没有extends，我们可以通过构造函数+原型对象模拟实现继承，被称为组合继承

**借用构造函数继承父类型属性**

* 核心原理：通过call()把父类型的this指向子类型的this，这样就可以实现继承

~~~js
function Father(name, age){
    //this 指向父构造函数的对象实例
    this.name = name
    this.age = age
}

function Son (name, age) { 
    //this 指向子构造函数的对象实例
    Father.call(this, name, age)
    this.id = 4
}

var p = new Son('gg',33)
console.log(p);//Son { name: 'gg', age: 33, id: 4 }
~~~

**借用原型对象继承方法**

* 我们让子类的原型为 父类的一个实例，这样我们就能通过这个中间人来继承方法

~~~js
function Father(name, age){
    //this 指向父构造函数的对象实例
    this.name = name
    this.age = age
}
Father.prototype.money = function () { 
    console.log(1000);
}

function Son (name, age) { 
    //this 指向子构造函数的对象实例
    Father.call(this, name, age)
    this.id = 4
}
Son.prototype = new Father()
var p = new Son('gg',33)
console.log(p);
p.money()
console.log(Son.prototype.constructor);//[Function: Father]
~~~

* 但是发现constructor没有指向Son构造函数，所以我们还要将他修改回来

~~~js
Son.prototype.constructor = Son
~~~

~~~js
function Father(name, age){
    //this 指向父构造函数的对象实例
    this.name = name
    this.age = age
}
Father.prototype.money = function () { 
    console.log(1000);
}

function Son (name, age) { 
    //this 指向子构造函数的对象实例
    Father.call(this, name, age)
    this.id = 4
}
Son.prototype = new Father()
Son.prototype.constructor = Son
var p = new Son('gg',33)
console.log(p);
p.money()
console.log(Son.prototype.constructor);//[Function: Son]
~~~

注意：不能让子类的原型 = 父类的原型，这样两个类用的是同一个原型对象，改谁都会互相影响

## 类的本质

* es6的类的本质是函数
* 它与es5的构造函数+原型实现 都共有以下特点
  1. 构造函数有原型对象prototype
  2. 构造函数原型对象prototype里面有constructor指向构造函数本身
  3. 构造函数可以通过原型对象添加方法
  4. 构造函数创建的实例有 `__proto__`原型指向构造函数的原型对象

~~~js
class Dog{

}
Dog.prototype.name = 'dd'
let d = new Dog()
console.log(typeof Dog);//function
console.log(Dog.prototype);// { name: 'dd' }
console.log(Dog.prototype.constructor);//[class Dog]
console.log(d.name);//dd
console.log(d.__proto__);//{ name: 'dd' }
console.log(d.__proto__ === Dog.prototype);//true
~~~

* es6的类的绝大部分功能在es5中都可以做到，新的class写法就是一个语法糖，它的写法更符合我们面向对象的设计原则

# 二 es5中新增的方法

## 数组方法：

* 迭代（遍历）方法： forEach()、map()、filter()、some()、every();
* Array.forEach(function (value, index, array) {}): 遍历数组

~~~js
let arr = [1,2,3,4,5]
//forEach()
arr.forEach(function (value, index, array) { 
    console.log('value：'+value);
    console.log('index：'+index);
    console.log('array：'+array);
 })
~~~

~~~shell
value：1
index：0
array：1,2,3,4,5
value：2
index：1
array：1,2,3,4,5
value：3
index：2
array：1,2,3,4,5
value：4
index：3Arra
array：1,2,3,4,5
value：5
index：4
array：1,2,3,4,5
~~~

* Array.filter(function (value, index, array) { })
  * 会创建一个新数组，新数组中的元素是经过筛选出来的

~~~js
//filter
let arr2 = [1,-5,5, 7, 3, -4, -3, -7,3]
let arrfilter = arr2.filter(function (value, index, array) { 
  //筛选出正数
    let bool = value > 0
    return bool
})
console.log(arrfilter);//[ 1, 5, 7, 3, 3 ]
~~~

* some(function(value, index, array){})
  * 方法用于检测数组中的元素是否符合指定条件，返回布尔值
  * 找到第一个符合条件的就终止循环，返回true

~~~js
//some()
let arr3 = [1,2,3,4,5,6,7,-1,8,9]
let bool = arr3.some(function(value, index, array){
    return value < 0
})
console.log(bool);//true
~~~

* map():遍历的同时可以对每一个元素进行修改，返回的是一个新的数组

~~~js
//map()
let arr4 = [1,2,3,4,5,6]
let arrayMap = arr4.map(function(value,index,array){
    return value*2
})
console.log(arrayMap);//[ 2, 4, 6, 8, 10, 12 ]
~~~

* every(): 检测是否所有的元素都符合条件(与some()相对)

~~~js
//every
let arr5 = [1,2,3,4,5,6,-1]
let arrayEvery = arr5.every(function(value,index,array){
    return value>0
})
console.log(arrayEvery);//false
~~~

## 字符串方法

* trim(): 去除字符串两侧的空格（不会去除中间的空格）

~~~js
let str = '   hello     i  md  dfd         '
let newStr = str.trim()
console.log(newStr);
//hello     i  md  dfd
~~~

## 对象方法

* Object.keys(obj): 用于获取对象自身上的所有属性，效果类似 for...in，返回一个由**属性名**（没有值）组成的数组

~~~js
let obj = {
    id: 1,
    name: 'shishi',
    age: 33
}
let keys = Object.keys(obj)
console.log(keys);//[ 'id', 'name', 'age' ]
console.log(obj[keys[1]]);//shishi
~~~

* Object.defineProperty(obj, prop, descriptor)：定义新属性或修改原有的属性
  * obj：必需，目标对象
  * prop：必需，需定义或修改的属性的名字
  * descriptor：必需，目标属性所拥有的特性
    * 这个参数以对象形式书写
    * value：设置属性的值 默认undefined
    * writable：设置值是否可以重写，默认false
    * enumerable：目标属性是否可以被枚举，默认false
    * configurable：目标属性是否可以被删除或者是可以再次修改特性吗，默认false

~~~js
let obj = {
    id: 1,
    name: 'shishi',
    age: 33
}
//以前增加属性和修改属性
obj.msg = 'hello'
obj.age = 12
console.log(obj);//{ id: 1, name: 'shishi', age: 12, msg: 'hello' }
~~~

仅设置值，node环境运行控制台看不到msg属性，浏览器可以，但是该属性是灰色的，通过Object.keys是拿不到这个属性的

~~~js
Object.defineProperty(obj, 'msg', {
    value: 'hello !!!',

})
console.log(obj);
~~~

加上可枚举，都能正常看到，不设置重写权限，修改不了值

~~~js
Object.defineProperty(obj, 'msg', {
    value: 'hello !!!',
    enumerable: true
})
obj.msg = 'ggggggg'
console.log(obj);//{ id: 1, name: 'shishi', age: 33, msg: 'hello !!!' }
~~~

加上重写权限，可以修改该属性

~~~js
Object.defineProperty(obj, 'msg', {
    value: 'hello !!!',
    enumerable: true,
    writable: true
})
obj.msg = 'ggggggg'
console.log(obj);//{ id: 1, name: 'shishi', age: 33, msg: 'ggggggg' }
~~~

我们可以通过这个设置来修改原有的属性是否可以被修改

~~~js
let obj = {
    id: 1,
    name: 'shishi',
    age: 33
}
Object.defineProperty(obj, 'name', {
    writable: false
})
obj.name =' ggg'
console.log(obj);//{ id: 1, name: 'shishi', age: 33}
~~~

# 三 函数进阶

## 函数的定义和调用

**定义**

* 所有函数都是 Function的实例对象

* new Function("参数1","参数2"，"函数体")
  * 执行效率低，不常用

~~~js
//1. 自定义函数（命名函数）
function fn() {}
//2. 函数表达式（匿名函数）
let fn2 = function() {}
//3. 利用new关键字  new Function("参数1","参数2"，"函数体")
let fn3 = new Function("console.log(1,2,3)")
let fn4 = new Function("a","b","console.log(a+b)")
fn3()
fn4(4,5)
~~~

**调用**

六种函数：

* 普通函数 : fn()
* 对象的方法:  obj.fn()
* 构造函数: new Person()
* 绑定事件函数: btn.onclick()
* 定时器函数: setTimeout(),自己会调用
* 立即执行函数 :（functionBody）()  ： 它的this 和定时器的this都是指向window（调用者）

## 严格模式

* js提供了了严格模式（strict mode）
* 严格模式在IE10以上的版本的浏览器中才会被支持，旧版本会被忽略
* 严格模式对正常的的JavaScript语义做了一些更改：
  * 消除了JavaScript语法的一些不合理，不严谨的地方
  * 消除代码运行的一些不安全之处
  * 提高编译器效率，增加运行速度
  * 禁止了在ESMAScript的未来版本中可能会定义的一些语法，为新版本的JavaScript做好铺垫，比如一些保留字：class，enum，export，extends，import，super

### 开启模式

1. 为脚本开启严格模式

   * 为整个脚本文件开启严格模式，需要在所有语句之前放一个特定的语句“use strict”；或 （‘use strict’；）

   ~~~js
   'use strict';
   //下面的js代码就会按照严格模式来执行代码
   a = 10//因为开启了严格模式，这里会报错
   console.log(a)
   ~~~

2. 为函数单独开启严格模式

   * 要给某个函数开启严格模式，需要把 语句放在函数体所有语句之前

   ~~~js
   a = 10 
   console.log(a);
   
   function fn (){
       'use strict'
       let b = 10
       console.log(b)
   }
   
   fn()
   ~~~

   

### 严格模式的变化

1. 在正常模式中，如果一个变量没有声明就赋值，默认是全局变量。严格模式禁止这种做法
2. 严禁删除已经声明的变量

```js
'use strict'
let a = 10
console.log(a);
delete a // 报错：Delete of an unqualified identifier in strict mode.
```

3. 严格模式下全局作用域的this的不在指向window对象，而是undefined，所以构造函数不加new当普通函数调用也会报错，构造函数的this指向出错了，所以必须使用new关键字来调用构造函数，但是定时器的this还是指向window，没有受到影响
4. 函数变化：
   1. 函数不能有重名的参数
   2. 函数必须声明在顶层，新版本的JavaScript会引入“块级作用域”（ES6中已经引入了），不允许在非函数的代码块中声明函数，**比如if语句中不能声明，for语句中不能声明**

## 高阶函数

* 高阶函数是对其他函数进行操作的函数，它**接受函数作为参数**或将**函数作为返回值**输出

# 四 闭包

* 闭包（closure）指有权访问另一个函数作用域中变量的**函数**：一个作用域可以访问另外一个函数内部的局部变量

```js
//闭包（closure）指有权访问另一个函数作用域中变量的   函数
// fun 的函数作用域访问了另外一个函数fn里面的局部变量num
function fn() {
    let num = 10
    function fun() {
        console.log(num);
    }
    fun()
}
fn()
//fn 就是一个闭包函数
```

* 稍微修改一下就能是实现fn外部的作用域可以访问fn内部的局部变量

```js
function fn() {
    let num = 10
    function fun() {
        console.log(num);
    }
    return fun;
}
let f = fn()
f()
```

* 闭包的主要作用就是延申了变量的作用范围，他使得fn函数调用结束后，内部的作用域不会立即销毁，因为num变量等着f调用

# 五 深拷贝和浅拷贝

1. 浅拷贝只是拷贝一层，更深层次对象级别的只拷贝引用
2. 深拷贝拷贝多层，每一级的数据都会拷贝

## 浅拷贝：

```js
let obj = {
    id: 1,
    name: 'shishi',
    msg: {
        say: 'hh'
    }
}
let copy = {}
for(let item in obj){
    copy[item] = obj[item]
}
console.log(copy);//{ id: 1, name: 'shishi', msg: { say: 'hh' } }
copy.msg.say = '被改了'
console.log(obj);//{ id: 1, name: 'shishi', msg: { say: '被改了' } }
```

es6新增方法 实现浅拷贝：

```js
let copy2 = {}
Object.assign(copy2,obj)
console.log(copy2);
```

## 深拷贝：

思路：对复杂数据类型来说，用函数递归来做深拷贝

```js
//封装深拷贝函数
function deepCopy(target,obj){
    for (const key in obj) {
        //判断属性值是那种数据类型，是否需要递归拷贝
        let item = obj[key];
        if(item instanceof Array){
            //数组是复杂数据类型，进行递归赋值
            target[key] = []
            deepCopy(target[key],item)
        }else if(item instanceof Object){
            //数组放在前面判断是因为数组属于object
            target[key] = {}
            deepCopy(target[key],item)
        }else{
            //简单数据类型
            target[key] = item
        }
    }
}
let obj = {
    id: 1,
    name: 'shishi',
    msg: {
        say: 'hh'
    },
    foods: ['apple','banana']
}
let copy = {}
deepCopy(copy,obj)
console.log(copy);
```



# 六 正则表达式

* 用于匹配字符串中字符组合的模式，在JavaScript中，正则表达式是作为对象存在的

## 创建正则表达式

1. RegExp 类

   ```js
   let regexp = new RegExp(/12ab/)
   console.log(regexp);//    /12ab/
   ```

2. 字面量

   ```js
   let regexp2 = /34cd/
   console.log(regexp2);///34cd/
   ```

## 测试正则表达式

* test()正则表达式方法，用于检测字符串是否符合该规则，该对象会返回true或者false，其参数是测试字符串

  ```js
  let rg = /12ab/
  console.log(rg.test('12ab'));//true
  console.log(rg.test('12abffffff'));//true
  console.log(rg.test('124'));//false
  ```

## 特殊字符

* 正则表达式可以使用特殊字符来代表特殊的意义

### 边界符

| 边界符 | 说明       |
| ------ | ---------- |
| ^      | 以什么开头 |
| $      | 以什么结束 |

```js
let rg = /^ab/  //以ab开头
let rg2 = /ba$/ //以ba结束

console.log(rg.test('abc'));//true
console.log(rg.test('babc'));//false
console.log(rg2.test('baba'));//true
console.log(rg2.test('babc'));//false

let rg3 = /^abc$/  //精确匹配，只能是abc
console.log(rg3.test('abc'));//true
console.log(rg3.test('abcabcccc'));//false
```

### 字符类

| 字符类 | 说明                                                  |
| ------ | ----------------------------------------------------- |
| []     | 表示有一系列字符可供选择，只要中一个就行              |
| [-]    | [] 内部加 - 表示范围                                  |
| [^]    | [] 内部加 ^ 表示取反，区别于边界符（边界符^在[]外边） |

```js
let rg = /[abc]/  //abc任有一个就返回true
console.log(rg.test('fgbfd')); //true
console.log(rg.test('dgbaff')); //true

let rg2 = /[a-e]/
console.log(rg2.test('yjhn'));//false
console.log(rg2.test('ycn'));//true  c在a-e的范围里

let rg3 = /^[^0-9]$/ //表示不能是数字
console.log(rg3.test('4'));//false
console.log(rg3.test('a'));//true
```

* 一个常用组合: 只能是26个字符，大小写，和9个数字

```js
let rg3 = /^[a-zA-Z0-9]$/
```



