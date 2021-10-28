"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var A;
(function (A) {
    // 定义一个方法属性装饰器
    function myFn(params) {
        return function (target, methodsName, desc) {
            console.log(target); // {}
            console.log(methodsName); // getData
            console.log(desc); //{
            //     value: [Function: getData],
            //     writable: true,
            //     enumerable: false,
            //     configurable: true
            //   }
            target['name'] = 'shishi';
            // 可以修改被装饰的方法
            // 1.先保存当前方法
            let old = desc.value;
            // 2.如果要替换方法的话就这样写,没有第三步
            desc.value = function (...args) {
                args = args.map((i) => {
                    return String(i);
                });
                console.log(args);
                // 3. 如果只是想修改的话，调用一下原来的方法
                old.apply(this, args);
            };
        };
    }
    class Dog {
        constructor() {
        }
        getData() {
            console.log('如果只是替换的话看不到我');
        }
    }
    __decorate([
        myFn('gggg')
    ], Dog.prototype, "getData", null);
    let d = new Dog();
    console.log(d.name); //shishi
    d.getData(12, '34', 'gg', 45); // [ '12', '34', 'gg', '45' ]  //如果只是替换的话看不到我
})(A || (A = {}));
