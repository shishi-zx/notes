//浅拷贝
let obj = {
    id: 1,
    name: 'shishi',
    msg: {
        say: 'hh'
    }
}
let copy = {}
for(let item in obj){
    copy[item] = obj[item]
}
console.log(copy);//{ id: 1, name: 'shishi', msg: { say: 'hh' } }
copy.msg.say = '被改了'
console.log(obj);//{ id: 1, name: 'shishi', msg: { say: '被改了' } }

let copy2 = {}
Object.assign(copy2,obj)
console.log(copy2);