let arr = [
    {
        id: 1,
        name: 'shishi'
    },
    {
        id: 2,
        name: 'luffy'
    },
    {
        id: 3,
        name: 'monn'
    }
]
let index = arr.findIndex((item) => {
    return item.name == 'luffy'
})
console.log(index);//1