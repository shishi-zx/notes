"use strict";
(() => {
    //可以在定义类的时候，限制类的结构
    class Animal {
        constructor(name, age, gender) {
            this.name = name;
            this.age = age;
            this.gender = gender;
        }
        say() {
            throw new Error("Method not implemented.");
        }
    }
})();
