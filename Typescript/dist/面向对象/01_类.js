"use strict";
class Dog {
    constructor() {
        //实例属性，通过实例访问
        this.name = 'shishi';
        this.age = 10;
    }
    say() {
        console.log('汪');
    }
}
//类属性（静态属性），通过类访问
Dog.type = 'Dog';
const dog = new Dog();
console.log(dog.name);
//dog.name = "jj"//报错,只读属性
console.log(Dog.type);
