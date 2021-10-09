//一般会将构造函数里的方法放到原型上，否则创建实例浪费内存
function Dog(name) { 
    this.name = name
}
Dog.prototype.say = function () { 
     console.log(this.name + ": 汪");
}

// d1.say()//ss: 汪
// console.log(d1.__proto__ === Dog.prototype);//true
// console.log(d1.__proto__.constructor === Dog);//true

Dog.prototype = {
    constructor: Dog,
    sayHello(){
        console.log('hello');
    }
}

var d1 = new Dog('ss')
d1.sayHello()//找不到
console.log(Dog.prototype.constructor === Dog);//true
console.log(d1.__proto__.constructor === Dog);//true