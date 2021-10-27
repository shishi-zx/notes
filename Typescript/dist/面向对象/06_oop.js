"use strict";
(() => {
    class Person {
        constructor(name, age) {
            this.name = name;
            this.age = age;
        }
        // getName(){
        //     return this.name
        // }
        // getAge(){
        //     return this.age
        // }
        // setName(name: string){
        //     this.name = name
        // }
        // setAge(age:number){
        //     if(age<0)return
        //     this.age = age
        // }
        //但是 不能和属性重名， 也就是不能写小写 name，外部可以直接 通过 .获取到 （p.Name）
        get Name() {
            return this.name;
        }
        set Name(name) {
            this.name = name;
        }
        get Age() {
            return this.age;
        }
        set Age(age) {
            if (age < 0)
                return;
            this.age = age;
        }
    }
    const p1 = new Person('shishi', 23);
    //console.log(p1.name);//ts 报错
    // console.log(p1.getName());
    // p1.setName('gg')
    // console.log(p1.getName());
    //对应第二种写法
    console.log(p1.Name);
    p1.Name = 'gg';
    console.log(p1.Name);
    // 可以直接将属性定义在构造函数中，而不用在类的头部单独写了
    class Dog {
        constructor(name, age) {
            this.name = name;
            this.age = age;
        }
    }
    // 等价于
    // class Dog{
    //     public name: string
    //     private age: number
    //     constructor(name:string,age:number){
    //         this.name = name
    //         this.age = age
    //     }
    // }
    let d = new Dog('ff', 23);
    console.log(d.name);
})();
