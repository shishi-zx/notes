let arr1 = [1,2,3]
let arr2 = [3,4,5]
let narr = [...arr1,...arr2]
console.log(narr);//[ 1, 2, 3, 3, 4, 5 ]

//或者
arr1.push(...arr2)
console.log(arr1);//[ 1, 2, 3, 3, 4, 5 ]