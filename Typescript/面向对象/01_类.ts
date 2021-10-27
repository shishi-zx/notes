class Dog {

    //实例属性，通过实例访问
    readonly name: string = 'shishi'
    age: number = 10

    //类属性（静态属性），通过类访问
    static readonly type: string = 'Dog'

    say(){
        console.log('汪');
    }
}

const dog = new Dog()

console.log(dog.name);
//dog.name = "jj"//报错,只读属性
console.log(Dog.type);
