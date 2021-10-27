(()=>{

    /**
     * interface
     *  使用接口来定义一个类结构，规定一个类中该包含哪些属性和方法
     *  同时它可以当作类型声明去使用 （type 关键字），但是接口可以重复声明，会合并在一起
     *  与抽象类相似，但是接口中不能给实际值，全都是抽象属性和抽象方法
     */
    interface myInterface{
        name: string
        age: number
    }
    interface myInterface{
        gender: string
    }
    interface myInterface{
        say():void
    }

    //可以在定义类的时候，限制类的结构
    class Animal implements myInterface{
        name: string;
        age: number;
        gender: string;

        constructor(name: string,age:number,gender: string){
            this.name = name
            this.age = age
            this.gender = gender
        }
        say(): void {
            throw new Error("Method not implemented.");
        }
        
    }


})()