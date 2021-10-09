let o = {
    name: 'shishi'
}

function fn () { 
    console.log(this);
 }

 let fn2 = fn.bind(o)
 fn2()