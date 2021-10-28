namespace A{

    // 定义一个方法属性装饰器
    function myFn(params:any){
       return function(target:any,methodsName:string,desc:any){
          console.log(target);// {}
          console.log(methodsName);// getData
          console.log(desc); //{
                            //     value: [Function: getData],
                            //     writable: true,
                            //     enumerable: false,
                            //     configurable: true
                            //   }

          target['name'] = 'shishi'
          
          // 可以修改被装饰的方法
          // 1.先保存当前方法
          let old = desc.value

          // 2.如果要替换方法的话就这样写,没有第三步
          desc.value = function(...args:any[]){
                args = args.map((i)=>{
                    return String(i)
                })

                console.log(args);

                // 3. 如果只是想修改的话，调用一下原来的方法
                old.apply(this,args)
                
          }

       }
    }
    class Dog{
        public msg: string | undefined

        constructor(){
        }

        @myFn('gggg')
        getData(){
            console.log('如果只是替换的话看不到我');
            
        }
    }

    let d:any = new Dog()
    console.log(d.name);//shishi
    d.getData(12,'34','gg',45)// [ '12', '34', 'gg', '45' ]  //如果只是替换的话看不到我
    
    
}