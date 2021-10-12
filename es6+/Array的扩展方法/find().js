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
let p = arr.find((item) => {
    return item.id == 1
})
console.log(p);//{ id: 1, name: 'shishi' }