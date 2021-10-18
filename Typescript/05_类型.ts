//对于数组   类型[]； 表示什么类型的数组
let arr: string[]; // 表示是字符串的数组，只能是字符串
arr = ['1','ggag','hello']

//或者另一种方式来表示数组
let arr2: Array<number>
arr2 = [1,2,3,4,5,5,8]

//ts中扩展的类型
//元组，固定长度的数组
let arr3: [string, string, number]
arr3 = ['gg','hh', 45]

//枚举
// enum Gender{
//     Male = 0,
//     Female = 1
// }
//其实值已经并不重要了
enum Gender{
    Male,
    Female
}
let p : {name: string, gender: Gender}
p = {
    name: 'ss',
    gender: Gender.Male
}
if(p.gender === Gender.Female)console.log('hh');

// 于 和 & 连接符号
let o: string | number
let o2: string & number // 这种是没有意义的，不存在
let o3: {name: string}&{age:number}
o3 = {name: 'ff',age: 34}//这种有意义的


//给 string 起了别名
type myType = string
let m: myType
m = 'hh'

//类型的别名
type myType2 = 1|2|3|4
// let k: 1|2|3|4
// let l: 1|2|3|4
let k: myType2
let l: myType2
