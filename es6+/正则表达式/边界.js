let rg = /^ab/  //以ab开头
let rg2 = /ba$/ //以ba结束

console.log(rg.test('abc'));//true
console.log(rg.test('babc'));//false
console.log(rg2.test('baba'));//true
console.log(rg2.test('babc'));//false

let rg3 = /^abc$/  //精确匹配，只能是abc
console.log(rg3.test('abc'));//true
console.log(rg3.test('abcabcccc'));//false