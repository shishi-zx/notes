"use strict";
(() => {
    // abstract 抽象类
    //可以添加抽象方法
    class Animal {
        constructor(name, age) {
            this.name = name;
            this.age = age;
        }
    }
    class Dog extends Animal {
        constructor(name, age) {
            super(name, age);
        }
        say() {
            console.log(this.name, ": wang !");
        }
    }
    class Cat extends Animal {
        constructor(name, age) {
            super(name, age);
        }
        say() {
            console.log(this.name, ": miao !");
        }
    }
})();
