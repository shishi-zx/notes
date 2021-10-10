let regexp = new RegExp(/12ab/)
console.log(regexp);//    /12ab/

//2
let regexp2 = /34cd/
console.log(regexp2);///34cd/

let rg = /12ab/
console.log(rg.test('12ab'));//true
console.log(rg.test('12abffffff'));//true
console.log(rg.test('124'));//false