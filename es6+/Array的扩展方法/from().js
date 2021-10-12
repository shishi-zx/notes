let arrayLike = {
    "0": "luffy",
    "1": "monkey",
    "2": "black",
    "length": 3
}
console.log(arrayLike);//{ '0': 'luffy', '1': 'monkey', '2': 'black', length: 3 } 是一个对象
let arr = Array.from(arrayLike)
console.log(arr);//[ 'luffy', 'monkey', 'black' ]  是一个数组

let arr2 = Array.from(arrayLike, (item)=>item += ' hh')
console.log(arr2);//[ 'luffy hh', 'monkey hh', 'black hh' ]