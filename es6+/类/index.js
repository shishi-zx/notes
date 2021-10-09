//使用 class 创建一个类
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