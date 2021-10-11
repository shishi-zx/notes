let str = 'shishi_shuke'
//字符串替换
let nstr = str.replace('shishi','beita')
console.log(nstr);//beita_shuke

//正则替换
let nstr2 = str.replace(/(shi){2}/,'luffy')
console.log(nstr2);//luffy_shuke

//  g,i
let nstr3 = str.replace(/(shi)/,'luffy')
let nstr4 = str.replace(/(shi)/g,'luffy')
console.log(nstr3);//luffyshi_shuke
console.log(nstr4);//luffyluffy_shuke
