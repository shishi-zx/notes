//let s = new Set();
let s = new Set([1,2,3,3,4,4,4,5]);
console.log(s);//Set(5) { 1, 2, 3, 4, 5 }
console.log(s.size);//5

//数组去重
let arr = [1,2,3,3,3,3,3,3,4]
let arr2 = [...(new Set(arr))]
console.log(arr2);//[ 1, 2, 3, 4 ]

s.forEach((item,i,s) =>{
    console.log(item,i,s);
})
// 1 1 Set(5) { 1, 2, 3, 4, 5 }
// 2 2 Set(5) { 1, 2, 3, 4, 5 }
// 3 3 Set(5) { 1, 2, 3, 4, 5 }
// 4 4 Set(5) { 1, 2, 3, 4, 5 }
// 5 5 Set(5) { 1, 2, 3, 4, 5 }