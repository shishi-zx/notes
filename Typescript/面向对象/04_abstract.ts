(()=>{
    // abstract 抽象类
    //可以添加抽象方法
    abstract class Animal{
        name: string
        age: number

        constructor(name:string,age:number){
            this.name = name
            this.age = age
        }

        abstract say(): void
    }

    class Dog extends Animal{
        constructor(name:string,age:number){
            super(name,age)
        }
        say(){
            console.log(this.name,": wang !");
            
        }
    }
    class Cat extends Animal{
        constructor(name:string,age:number){
            super(name,age)
        }
        say(){
            console.log(this.name,": miao !");
            
        }
    }
})()