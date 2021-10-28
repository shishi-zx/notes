namespace A{

    function myLog(params:any){
        console.log(params);
        return class extends params{
            msg:string = '被改了'
        }
    }

    @myLog
    class Dog{
        public msg: string | undefined
        constructor(){
            this.msg = '我是原来的'
        }
    }

    let d = new Dog()
    console.log(d.msg);// 被改了
    
}