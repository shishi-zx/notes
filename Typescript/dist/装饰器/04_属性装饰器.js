"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var A;
(function (A) {
    // 定义一个属性装饰器
    function myValue(params) {
        return function (target, attr) {
            console.log(target); // {}   注意执行此文件就会打印这两行，不需要 new 实例，因为在类里 使用 @的时候就当作函数执行过这一段代码了
            console.log(attr); // msg
            target[attr] = params;
        };
    }
    class Dog {
        constructor() {
        }
    }
    __decorate([
        myValue('hello')
    ], Dog.prototype, "msg", void 0);
    let d = new Dog();
    console.log(d.msg); // hello
})(A || (A = {}));
