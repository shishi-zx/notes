class Dog{

}
Dog.prototype.name = 'dd'
let d = new Dog()
console.log(typeof Dog);//function
console.log(Dog.prototype);// { name: 'dd' }
console.log(Dog.prototype.constructor);//[class Dog]
console.log(d.name);//dd
console.log(d.__proto__);//{ name: 'dd' }
console.log(d.__proto__ === Dog.prototype);//true
