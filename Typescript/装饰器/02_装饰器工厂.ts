namespace A{

    function myLog(params:string){


        // return 的这个函数的参数就是类本身
        return function(target:any){
            console.log(target);
            console.log(params);

            target.prototype.msg = params
        
        }
    }

    @myLog('ha ha ha')
    class Dog{
        constructor(){

        }
        getName(){

        }
    }

    // 执行此文件控制台会输出
    //[class Dog]
    //ha ha ha

    let d:any = new Dog()
    console.log(d.msg);// ha ha ha
    

}