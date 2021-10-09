/**
 * 类的继承
 * extends
 */
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
d1.sub()
// d1.sayHello()// hello Animal  hello Dog
