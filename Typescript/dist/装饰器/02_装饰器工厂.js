"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var A;
(function (A) {
    function myLog(params) {
        // return 的这个函数的参数就是类本身
        return function (target) {
            console.log(target);
            console.log(params);
            target.prototype.msg = params;
        };
    }
    let Dog = class Dog {
        constructor() {
        }
        getName() {
        }
    };
    Dog = __decorate([
        myLog('ha ha ha')
    ], Dog);
    // 执行此文件控制台会输出
    //[class Dog]
    //ha ha ha
    let d = new Dog();
    console.log(d.msg); // ha ha ha
})(A || (A = {}));
