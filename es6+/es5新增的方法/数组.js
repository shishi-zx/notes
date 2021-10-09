let arr = [1,2,3,4,5]
//forEach()
arr.forEach(function (value, index, array) { 
    console.log('value：'+value);
    console.log('index：'+index);
    console.log('array：'+array);
})

//filter
let arr2 = [1,-5,5, 7, 3, -4, -3, -7,3]
let arrfilter = arr2.filter(function (value, index, array) { 
    let bool = value > 0
    return bool
})
console.log(arrfilter);//[ 1, 5, 7, 3, 3 ]

//some()
let arr3 = [1,2,3,4,5,6,7,-1,8,9]
let bool = arr3.some(function(value, index, array){
    return value < 0
})
console.log(bool);//true

//map()
let arr4 = [1,2,3,4,5,6]
let arrayMap = arr4.map(function(value,index,array){
    return value*2
})
console.log(arrayMap);//[ 2, 4, 6, 8, 10, 12 ]

//every
let arr5 = [1,2,3,4,5,6,-1]
let arrayEvery = arr5.every(function(value,index,array){
    return value>0
})
console.log(arrayEvery);//false