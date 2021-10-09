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