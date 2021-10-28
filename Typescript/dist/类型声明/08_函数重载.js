"use strict";
(() => {
    // function add(a:number):number
    // function add(a:number,b:number):number
    // function add(a:string):string
    function add(a, b) {
        if (typeof a === 'string') {
            return a + '#';
        }
        else {
            if (!b)
                return a * 10;
            return a + b;
        }
    }
    console.log(add(2)); //20
    console.log(add(2, 3)); //5
    console.log(add('shishi')); //shishi
})();
