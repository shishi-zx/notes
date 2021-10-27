(function () {
    var a;
    a = 10;
    console.log(a);
    //a = 'gg' 会报错  但是编译一定会成功
    var str = 'hh';
    var bool = false;
    function sum(a, b) {
        return a + b;
    }
    console.log(sum(12, 89)); //如果传字符串 ‘23’会报错,如果参数传的不够或者多了也会报错
})();
