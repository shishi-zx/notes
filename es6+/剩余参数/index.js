// let sum = function(n1,n2,...args){
//     console.log(n1,n2);
//     console.log(args);
// }

// sum(1,2,3,4,5,6)//1 2
//                 //[ 3, 4, 5, 6 ]
// sum(1,2)//1 2
//         //[]

let sum = (...args) => {
    let n = 0
    
    args.forEach((item)=>{
        n += item
    })
    return n
}
console.log(sum(1,2,3,4));

let arr = ['luffy','zuoluo','black']
let [p1,...p2] = arr
console.log(p1);// luffy
console.log(p2);// ['zuoluo','black']