let rg = /[abc]/  //abc任有一个就返回true
console.log(rg.test('fgbfd')); //true
console.log(rg.test('dgbaff')); //true

let rg2 = /[a-e]/
console.log(rg2.test('yjhn'));//false
console.log(rg2.test('ycn'));//true

let rg3 = /^[^0-9]$/ //表示不能是数字

console.log(rg3.test('4'));//false
console.log(rg3.test('a'));//true