"use strict";
class People {
    constructor(name, age) {
        this.name = name;
        this.age = age;
        console.log(this);
    }
    say() {
        console.log('hi, I`m ' + this.name);
    }
}
let p1 = new People('luffy', 13);
let p2 = new People('zero', 15);
let p3 = new People('black', 39);
console.log(p1);
console.log(p2);
console.log(p3);
p1.say();
p2.say();
p3.say();
p3.say.call(p2);
