"use strict";
(() => {
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
})();
