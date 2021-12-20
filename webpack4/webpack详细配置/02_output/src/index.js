console.log('index.js');

import('./test')
.then(( { default: test} ) => {
    console.log(test(1,9));
})