namespace A{

    // 定义一个属性装饰器
    function myValue(params:any){
       return function(target:any,attr:string){
           console.log(target);// {}   注意执行此文件就会打印这两行，不需要 new 实例，因为在类里 使用 @的时候就当作函数执行过这一段代码了
           console.log(attr);// msg

           target[attr] = params
           
       }
    }
    class Dog{

        @myValue('hello')
        public msg: string | undefined

        constructor(){
        }
    }

    let d = new Dog()
    console.log(d.msg);// hello
    
}