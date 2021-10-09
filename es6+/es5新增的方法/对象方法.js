let obj = {
    id: 1,
    name: 'shishi',
    age: 33
}
// let keys = Object.keys(obj)
// console.log(keys);//[ 'id', 'name', 'age' ]
// console.log(obj[keys[1]]);//shishi

//以前增加属性和修改属性
// obj.msg = 'hello'
// obj.age = 12
// console.log(obj);//{ id: 1, name: 'shishi', age: 12, msg: 'hello' }

Object.defineProperty(obj, 'msg', {
    value: 'hello !!!',
    enumerable: true,
    writable: true
})
// obj.msg = 'ggggggg'
// console.log(obj);

Object.defineProperty(obj, 'name', {
    writable: false
})
obj.name =' ggg'
console.log(obj);
