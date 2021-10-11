let reg = /a*/
console.log(reg.test(''));//true
console.log(reg.test('aaaa'));//true

let reg2 = /a+/
console.log(reg2.test(''));//false
console.log(reg2.test('aaaa'));//true

let reg3 = /a?/
console.log(reg3.test(''));//true
console.log(reg3.test('a'));//true
console.log(reg3.test('aaaa'));//true

let reg4 = /^a{2}$/
console.log(reg4.test(''));//false
console.log(reg4.test('aa'));//true
console.log(reg4.test('aaaa'));//false  不加$限制则为true
console.log(reg4.test('a'));//false

let reg5 = /^a{2,}$/
console.log(reg5.test(''));//false
console.log(reg5.test('aa'));//true
console.log(reg5.test('aaaa'));//true  
console.log(reg5.test('a'));//false

let reg6 = /^a{2,5}$/
console.log(reg6.test('aa'));//true
console.log(reg6.test('aaaaaaaa'));//false  不加$限制则为true
console.log(reg6.test('aaaa'));//true

let reg7 = /^[a-zA-Z0-9]{6}$/  //输入六位有大小写和数字组成的密码
console.log(reg7.test('asd*12'));//false
console.log(reg7.test('aHd324'));//true
console.log(reg7.test('asd324s'));//false