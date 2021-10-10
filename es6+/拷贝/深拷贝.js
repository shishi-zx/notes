//封装深拷贝函数
function deepCopy(target,obj){
    for (const key in obj) {
        //判断属性值是那种数据类型，是否需要递归拷贝
        let item = obj[key];
        if(item instanceof Array){
            //数组是复杂数据类型，进行递归赋值
            target[key] = []
            deepCopy(target[key],item)
        }else if(item instanceof Object){
            //数组放在前面判断是因为数组属于object
            target[key] = {}
            deepCopy(target[key],item)
        }else{
            //简单数据类型
            target[key] = item
        }
    }
}
let obj = {
    id: 1,
    name: 'shishi',
    msg: {
        say: 'hh'
    },
    foods: ['apple','banana']
}
let copy = {}
deepCopy(copy,obj)
console.log(copy);