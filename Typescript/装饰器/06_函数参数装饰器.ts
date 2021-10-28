namespace A{

    // 定义一个方法属性装饰器
    function myFnParams(params:any){
        return function(target:any,paramsName:string,paramsIndex:number){
            console.log(target);// {}
            console.log(paramsName);// getData
            console.log(paramsIndex);//1
            console.log(params);// agexx
        }
    }
    class Dog{
        public msg: string | undefined

        constructor(){
        }
        //getData(name:string, age:number){
        getData(name:string,@myFnParams('agexx') age:number){
        }
    }
}