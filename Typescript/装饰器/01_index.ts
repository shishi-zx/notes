namespace A{

    // 定义装饰器
    function myLog(parmas:any){

        console.log(parmas);// parmas 就是当前类

        parmas.prototype.msg = 'ha ha'//给当前类扩展一个属性
        

    }

    //使用装饰器
    @myLog
    class Person{
        constructor(){

        }

        getData(){

        }
    }

    let p1:any = new Person()
    console.log(p1.msg);// ha ha
    
}