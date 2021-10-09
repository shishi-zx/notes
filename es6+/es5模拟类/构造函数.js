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
Dog.type = 'animal'
var d1 = new Dog('ss',22)
d1.say()//实例成员
console.log(Dog.type);//静态成员