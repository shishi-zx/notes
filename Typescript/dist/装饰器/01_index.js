"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var A;
(function (A) {
    // 定义装饰器
    function myLog(parmas) {
        console.log(parmas); // parmas 就是当前类
        parmas.prototype.msg = 'ha ha'; //给当前类扩展一个属性
    }
    //使用装饰器
    let Person = class Person {
        constructor() {
        }
        getData() {
        }
    };
    Person = __decorate([
        myLog
    ], Person);
    let p1 = new Person();
    console.log(p1.msg); // ha ha
})(A || (A = {}));
