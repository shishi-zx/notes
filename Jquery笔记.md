# 1. Jquery简介

1. 为了方便的操作DOM
2. 优化了DOM操作，事件处理，动画设计和Ajax交互
3. write less，do more



# 2.Jquery基本使用

## 1.下载

官网：https://jquery.com

npm:  `npm i jquery`

## 2.简单使用

```html
<body>
<div id="box">hello world</div>
<script src="../../node_modules/jquery/dist/jquery.js"></script>
<script  type="text/javascript">
    $('#box').hide()
</script>
</body>
```

注意：第一个script标签用来引入jquery文件，写代码另起一个script标签

**同样的，与原生js一样，需要写在dom下面，或者写入口函数里**

```html
<body>

<script src="../../node_modules/jquery/dist/jquery.js"></script>
<script  type="text/javascript">
    $(document).ready( ()=>{
        $('#box').hide()
        console.log("等待dom加载完成才执行")
    })
</script>

<div id="box">hello world</div>

</body>
```

入口函数

```javascript
$(document).ready( ()=>{
        
})
//或者不使用箭头函数
$(document).ready( function (){
        
})
```

**简单写法**

```javascript
$(()=>{
    $('#box').hide()
    console.log("等待dom加载完成才执行")
})
//或者
		$(function (){
        $('#box').hide()
        console.log("等待dom加载完成才执行")
    })
```

注意：

* 这个入口函数不同于 原生js的load事件（load会等待外部的js文件，css文件，图片加载完才执行）
* 相当于原生js的DOMContentLoaded

## 3.jquery的顶级对象 $

### 1.$是jQuery的别称

```javascript
$(()=>{
   alert("hello")
})
```

与

```javascript
jQuery(()=>{
    alert('hello')
})
```

一样

### 2.$同时也是JQuery的顶级对象

```javascript
let box = $('div')
 alert("即将隐藏hhh")
 box.hide()
```

这个**box**变量是一个**jQuery**对象（这个对象有很多包装好的方法）



## 4.jQuery对象和DOM对象

* 用原生js获取到的对象就是**DOM**对象
* 用jquery方式获取的对象是**jQuery**对象（$将DOM元素进行了包装）
* 两个对象有各自的方法和属性，**jQuery**只能使用**jQuery**方法，**DOM**使用原生js的方法和属性

```javascript
let box1 = $(".box1")
console.log(box1)
let box2 = document.getElementsByClassName('box2')
console.log(box2)
```

输出

```shell
jQuery.fn.init [div.box1, prevObject: jQuery.fn.init(1)]
HTMLCollection [div.box2]
```



## 5.jQuery对象和DOM对象的转化

* jQuery只是封装了常用的方法和属性，有一些原生的属性和方法是没有封装的

* 因为**jQuery**容易获取，所以使用了**Jquery**来获取，但是使用时候又转化为**DOM**对象

### 1.DOM对象转换为jQuery对象

直接使用$符号来封装

`$(DOM对象)`

### 2.Jquery对象转换为DOM对象

jQuery对象是伪数组的形式

* $('div')[index] 
* 或者  $('div').get(index)



# 3.jQuery 常用API

## 1.jQuery选择器

### 1.jquery基础选择器

```
//里面直接写css选择器就行了
$("选择器")
```

| 名称       | 用法               | 描述                  |
| ---------- | ------------------ | --------------------- |
| ID选择器   | $("#id")           | 获取指定id的元素      |
| 全选择器   | $("*")             | 匹配所有元素          |
| 类选择器   | $(".class")        | 获取同一类class的元素 |
| 标签选择器 | $("div")           | 获取同一标签的元素    |
| 并集选择器 | $("div, li, span") | 获取多个元素          |
| 交集选择器 | $("li.box")        | 交集元素              |

### 2.jQuery层级选择器

| 名称       | 用法       | 描述             |
| ---------- | ---------- | ---------------- |
| 子代选择器 | $("ul>li") | 使用>表示子代    |
| 后代选择器 | $("li a")  | 使用空格表示后代 |

### 3.jQuery隐式迭代

```html
<div class="box1">1</div>
<div class="box2">2</div>
<div class="box3">3</div>
<script src="../../node_modules/jquery/dist/jquery.js"></script>
<script>
  //让 1，2，3，4颜色为红色
    $("div").css('color','red')
</script>
```

虽然这里匹配到了四个元素，但是不用去我们去写for循环来依此更改每一个元素的样式，jQuery对象会遍历内部的DOM元素（用伪数组的形式存储）的过程就是隐式迭代

### 4.筛选选择器

| 语法       | 用法          | 描述                                                      |
| ---------- | ------------- | --------------------------------------------------------- |
| :first     | $("li:first") | 获取第一个li元素                                          |
| :last      | $("li:last")  | 获取最后一个                                              |
| :eq(index) | $("li:eq(3)") | **获取到的li元素中**，选择index索引的元素（index从0开始） |
| :odd       | $("li:odd")   | **获取到的li元素中**，选择index索引为奇数的元素           |
| :even      | $("li:even")  | **获取到的li元素中**，选择index索引为偶数的元素           |

```html
<ul>
    <li>1</li>
    <li>2</li>
    <li>3</li>
    <li>4</li>
</ul>
<ul>
    <li>11</li>
    <li>22</li>
    <li>33</li>
    <li>44</li>
</ul>
<script src="../../node_modules/jquery/dist/jquery.js"></script>
<script>
    $("li:eq(6)").css('color','red')
</script>
```

结果是 33 变为了红色

### 5.jQuery筛选方法

* 注意这是方法函数

| 语法               | 用法                       | 说明                                     |
| ------------------ | -------------------------- | ---------------------------------------- |
| parent()           | $("li").parent();          | 查找父亲                                 |
| children(selector) | $("ul").children("li");    | 等同于$("ul>li")                         |
| find(selector)     | $("ul").find("li");        | 等同于$("ul  li")                        |
| siblings(selector) | $(".box1").siblings("li"); | 查找兄弟节点，不包含自己                 |
| nextAll([expr])    | $(".box1").nextAll();      | 查找当前元素之后的所有兄弟元素           |
| prevtAll([expr])   | $(".box3").prevtAll();     | 查找当前元素之前的所有兄弟元素           |
| hasClass(class)    | $("div").hasClass("box");  | 检查当前的元素是否含有某个类，返回布尔值 |
| eq(index)          | $("li").eq(2);             | 等同于$("li:eq(2)")                      |

```html
<ul>
    <li class="box1">1</li>
    <li class="box2">2</li>
    <li class="box3">3</li>
    <li class="box4">4</li>
</ul>
<script src="../../node_modules/jquery/dist/jquery.js"></script>
<script>
    $("li").parent().css("background","#bfa")
    $(".box2").nextAll().css("color","red")
    $(".box2").prevAll().css("color","blue")
    $(".box2").siblings().css("font-size","30px")
</script>
```



## 2.jQuery样式操作

### 1.操作css方法

jQuery可以使用css方法来操作简单样式；也可以操作类，修改多个样式

* 参数只写属性名，返回属性值

```javascript
let bg = $('div').css('background')
console.log(bg)
//rgb(187, 255, 170) none repeat scroll 0% 0% / auto padding-box border-box
```

* 参数是  ‘属性名’，‘属性值’  是设置对应属性，属性名必须加引号，值是数字时候可以不加引号和单位

```javascript
$('div').css('width','700px')
//或者
$('div').css('width',700)
```

* 参数可以是对象形式，方便设置多组样式。属性名和属性值用冒号隔开，**属性可以不加引号**

```javascript
$('div').css({
    width: 300,
    height: 400,
    backgroundColor: 'red'
})
//注意复合属性要采用驼峰命名法，background-color  要写成backgroundColor
```

### 2.设置类样式方法

首先写好样式类

```css
.light{
    box-shadow: 0 0 50px 20px pink;
}
```

然后在代码里添加这个类到元素上

```javascript
$('div').addClass('light')
```

或者移除类

```javascript
$('div').removeClass('light')
```

或者更 切换类（有则移除，无则添加）

```javascript
$('div').click(()=>{
    $('div').toggleClass('light')
})
```

**注意：**

* 在原生js中的className会覆盖原先的类名
* jQuery里面的类操作只是对指定类进行操作，不影响原先的类名。

## 3.jQuery效果

jQuery里封装了一些常见的动画效果

* 显示隐藏
  * show()
  * hide()
  * toggle()
* 滑动
  * slideDown()
  * slideUp()
  * slideToggle()
* 淡入淡出
  * fadeIn()
  * fadeOut()
  * fadeToggle()
  * fadeTo()
* 自定义动画
  * animate()

### 1. 显示隐藏效果

语法：

```
show([speed,[easing],[fn]])
```

参数：

* 省略全部参数，无动画效果，直接显示出来。
* speed：（“slow”，“normal”，“fast”）或者具体数值（ms）
* easing： 可选参数默认 “swing”，可用参数“linear”
* fn： 可选参数，在动画执行完成时候调用的函数，每个元素执行一次

hide()与切换toggle()同上使用

```html
<div>box</div>
<button>效果1</button>
<button>效果2</button>
<button>效果3</button>
<script src="../../node_modules/jquery/dist/jquery.js"></script>
<script>
    let box = $('div')
    let btn01 = $('button:eq(0)')
    let btn02 = $('button:eq(1)')
    let btn03 = $('button:eq(2)')
    btn01.click(()=>{
        // box.show(500,function (){
        //     alert("1")
        // })
        box.toggle(500,()=>{
            console.log('切换成功')
        })
    })

</script>
```

### 2.滑动效果

语法：

```
slideToggle([speed,[easing],[fn]])
```

参数：

* 省略全部参数，无动画效果，直接显示出来。
* speed：（“slow”，“normal”，“fast”）或者具体数值（ms）
* easing： 可选参数默认 “swing”，可用参数“linear”
* fn： 可选参数，在动画执行完成时候调用的函数，每个元素执行一次

```html
<div>box</div>
<button>效果1</button>
<button>效果2</button>
<button>效果3</button>
<script src="../../node_modules/jquery/dist/jquery.js"></script>
<script>
    let box = $('div')
    let btn01 = $('button:eq(0)')
    let btn02 = $('button:eq(1)')
    let btn03 = $('button:eq(2)')
    btn01.click(()=>{
        // box.show(500,function (){
        //     alert("1")
        // })
        box.toggle(500,()=>{
            console.log('切换成功')
        })
    })
  btn02.click(()=>{
        box.slideToggle(500,()=>{
            console.log('滑动切换成功')
        })
    })

</script>
```

### 3.淡入淡出效果

语法：

```
fadeToggle([speed,[easing],[fn]])
```

参数：

* 省略全部参数，无动画效果，直接显示出来。
* speed：（“slow”，“normal”，“fast”）或者具体数值（ms）
* easing： 可选参数默认 “swing”，可用参数“linear”
* fn： 可选参数，在动画执行完成时候调用的函数，每个元素执行一次

与之前两个效果不同的是 fadeTo()方法，来调整到指定的不透明度

语法：

```
fadeTo([speed,opacity,[easing],[fn]])
```

参数：

* 省略全部参数，无动画效果，直接显示出来。
* speed：（“slow”，“normal”，“fast”）或者具体数值（ms）在这方法里必须写
* opacity:  必要参数，取值0~1
* easing： 可选参数默认 “swing”，可用参数“linear”
* fn： 可选参数，在动画执行完成时候调用的函数，每个元素执行一次

```javascript
btn03.click(()=>{
    box.stop().fadeTo(1500,.5,()=>{
        console.log('淡入淡出切换成功')
    })
})
```

### 4.自定义动画animate

语法：

```
animate(params,[speed],[easing],[fn])
```

参数：

* params：（必要参数）想要修改的样式的属性，以对象形式传递。属性名可以不用带引号，如果是复合属性则需要采取驼峰命名
* speed：（“slow”，“normal”，“fast”）或者具体数值（ms）
* easing： 可选参数默认 “swing”，可用参数“linear”
* fn： 可选参数，在动画执行完成时候调用的函数，每个元素执行一次



### 5.动画队列及其停止排队方法

#### 1. 动画或者效果队列

动画或者效果一旦触发就会执行，如果多次触发，就会造成多个动画或者效果排队执行。

#### 2.停止排队

stop()方法

* stop()方法用于停止动画和效果

* stop()方法写在动画前和后是不一样的效果

  * 写在前表示停止当前进行的动画然后执行后面跟着的动画
  * 写在表示连同写的动画全都停止

  ```javascript
  box.stop().slideToggle(500,()=>{
      console.log('滑动切换成功')
  })
  ```

## 4.jQuery属性操作

### 4.1 设置或获取元素的固有属性值 prop()

1. 获取属性值语法 `prop("属性")`

```html
<a href="http://www.baidu.com" title="baidu">百度</a>

    <script src="../node_modules/jquery/dist/jquery.js"></script>
    <script>
        console.log($('a').prop('href'));
//输出  http://www.baidu.com/
    </script>
```

2. 设置属性语法 `prop('属性','属性值')`

```javascript
$('a').prop('title','newTitle')
console.log($('a').prop('title'));
//输出newTitle
```

### 4.2 设置或获取元素的自定义属性值 attr()

* 类似原生的getAttribute()
* 类似于原生的setAttribute()

```html
<div index='0' class="box">1111</div>

    <script src="../node_modules/jquery/dist/jquery.js"></script>
    <script>
        
        console.log($('.box').prop('index'));// undefined
        console.log($('.box').attr('index'));// 0

        $('.box').prop('index','4')
        console.log($('.box').prop('index'));//4
    </script>
```

### 4.3数据缓存data()

* data()方法可以在指定的元素上存取数据，==并不会修改DOM元素结构==。一旦页面刷新，之前存放的数据将被移除。
* data('username','admin')   向元素添加数据
* data('username'))  向元素取数据

```html
<section>
        333
    </section>

    <script src="../node_modules/jquery/dist/jquery.js"></script>
    <script>
        $('section').data('username','admin')
        console.log($('section').data('username'));//admin
    </script>
```

* 同时还可以读取HTML5自定义属性 data-index,得到的数据是数字型

```html
<section data-index='3'>
        333
    </section>

/// 输出数字3，注意这里没有写data- 开头
console.log($('section').data('index'));
```

## 5.jQuery内容文本值

### 1. 普遍元素内容html()（相当于原生innerHTML）

~~~javascript
html() //获取元素的内容
~~~

~~~javascript
html("内容") //设置元素的内容
~~~

~~~html
<div class="box">
        <span>内容</span>
    </div>

    <script src="../node_modules/jquery/dist/jquery.js"></script>
    <script>
        console.log($(".box").html());// <span>内容</span>

        $(".box").html("<span>新内容</span>")
        console.log($(".box").html());//<span>新内容</span>
    </script>
~~~

### 2.普遍元素文本内容text()（相当于原生innerText）

~~~javascript
console.log($(".box").text());//新内容
        $(".box").text("新新新的文本")
        console.log($(".box").text());//新新新的文本
        console.log($(".box").html());//新新新的文本
~~~

### 3.表单的值val()（相当于原生value）

~~~html
<input type="text" value="哈哈哈哈">
console.log($('input').val());//哈哈哈哈
$('input').val('略略略')
console.log($('input').val());//略略略
~~~

## 6.jQuery元素操作

### 6.1遍历元素

==jQuery隐式迭代是对同一类元素做了同样的操作，如果想要给同一类元素做不同操作，就需要用到遍历==

语法一：jquery对象的**each**()方法

```javascript
$("div").each(function(index,domEle){
        xxx;
        })
```

1. each()方法遍历匹配的每一个元素，主要用DOM处理
2. 里面的回调函数有两个参数：index是每一个元素的索引，domELe是每一个**DOM元素对象**（不是jquery对象）
3. 所以要想使用jquery方法，需要给这个dom元素转换为jquery对象$(domEle)



语法二：$的工具方法  .each()

~~~javascript
$.each(object, function(index,element) {xxx; })
~~~

1. $.each()方法可以用于遍历**任何**对象。主要用于数据处理，比如数组，对象
2. 里面的函数有两个参数：index索引，element遍历内容

### 6.2创建元素

语法：

~~~javascript
$('<li></li>');
//动态的创建了一个<li>标签
~~~

### 6.3添加元素

1. 内部添加

~~~javascript
element.append("内容")
~~~

2. 外部添加

~~~javascript
element.after("内容")//把内容放入目标元素后面
~~~

~~~javascript
element.before("内容")//把内容放入目标元素前面
~~~

~~~html
<ul>
        <li>000</li>
    </ul>
    <div class="box">box0</div>
    <script src="../node_modules/jquery/dist/jquery.js"></script>
    <script>
        //创建元素
        let li = $('<li>111</li>')
        let li2 = $('<li>-1-1-1</li>')
        let div1 = $("<div>box1</div>")
        let div2 = $("<div>box-1</div>")
        //添加元素----内部添加
        $('ul').append(li)//（会放在原来已有元素的后面）
        $('ul').prepend(li2)//（会放在原来已有元素的前面）
        //添加元素----外部添加
        $('.box').after(div1)
        $('.box').before(div2)
        
    </script>
~~~



### 6.4删除元素

1.   element.remove()   删除匹配的元素本身

~~~html
<span>会被删除</span>
alert('!')
$('span').remove()
~~~

2. element.empty()   删除匹配的元素集合中所有的子节点

~~~html
<ol class="remove">
        <li>*****</li>
        <li>*****</li>
        <li>*****</li>
        <li><a href="#">444444</a></li>
    </ol>

 $('ol').empty()
~~~

3. element.html("") 使用html()方法使用空串替换掉内容，等于清空删除（注意空串要写，不然是获取内容）

# 4.jQuery事件

## 4.1jQuery事件注册

**单个事件注册**

语法：

~~~javascript
element.事件(function(){})
~~~

~~~javascript
$('div').click(function(){xxx})
~~~

* 其他事件和原生的基本一致
  * 比如mouseover，mouseout，blur，focus，change，keydown，keyup，resize，scroll等

~~~javascript
 $('div').click(function(){
    $(this).css('background','pink')
})
$('div').mouseover(function(){
   $(this).css("background",'blue')
})
~~~



## 4.2 事件处理

### 4.2.1 事件处理on()绑定事件

on()方法在匹配元素上绑定一个或者多个事件的事件处理函数

语法：

~~~javascript
element.on(events,[selector],fn)
~~~

* events: 一个或者多个用空格分隔的事件类型，如“**click**”或者“**keydown**”
* selector：元素的子元素选择器
* fn：回调函数

```javascript
$('div').on({
	click: function(){

    $(this).css('background','pink')

  },

  mouseover: function(){

    $(this).css("background",'blue')

  },

  mouseleave: function(){

    $(this).css("background",'yellow')

  }

})
```

如果多个事件触发相同的处理

~~~javascript
 $('div').on("mouseenter mouseleave",function(){
            $(this).toggleClass('toggle')
        })
~~~

### 4.2.2事件委托

on()方法：

* 可以事件委派操作，（事件委派就是：把原来加给子元素上的事件绑定在父元素上，把事件委派给父元素）
* 之前版本有bind(),live(),delegate()等方法来处理事件绑定或者委派，新版本启用on()

~~~html
<ul>
        <li>1</li>
        <li>2</li>
        <li>3</li>
        <li>4</li>
        <li>5</li>
    </ul>
    <script src="../node_modules/jquery/dist/jquery.js"></script>
    <script>
        $(function(){
            $('ul').on('click','li',function(){
                console.log(this);
            })
        })
    </script>
~~~

### 4.2.3动态创建元素绑定事件

* 动态创建的元素，click()不能绑定事件，on()可以动态的给“**未来**”生成的元素绑定事件

这样是不能让新创建的1这个li也触发事件的，除非将事件绑定写在添加语句之后

~~~html
<ul>
        <li>0</li>
    </ul>

    <script src="../node_modules/jquery/dist/jquery.js"></script>
    <script>
        $(function(){
            $("ul>li").click(function(){
                console.log(this);
            })
            let li1 = $('<li>1</li>')
            $('ul').append(li1)
        })
    </script>
~~~

但是使用on()方法委派可以实现

~~~javascript
$('ul').on("click","li",function(){
                console.log(this);
            })
            let li1 = $('<li>1</li>')
            $('ul').append(li1)
~~~

### 4.2.4事件处理off()解绑事件

off()方法可以移除通过on()方法添加的事件处理程序。

~~~javascript
$('div').on("click",function(){
            alert(111)
        })
        $('div').off("click")
~~~

* 如果off()方法不给参数，则移除添加的全部事件
* 如果有参数，则解除参数对应的事件

* 如果有第二个参数，则是解除事件委派

~~~javascript
 $('ul').on('click','li',function(){
                console.log(this);
            })
            $("ul").off("click","li")
~~~

### 4.2.5 one()方法绑定一次性事件

* 使用方法与on()方法一致，但是只能触发一次

~~~javascript
$('div').one("click",function(){
            console.log(this);
        })
~~~

### 4.2.6 自动触发事件trigger()

* 有些事件希望自动触发，比如轮播图自动播放功能跟点击右侧按钮一致，可以利用定时器自动触发右侧按钮点击事件，不用等鼠标点击再触发

1. 第一种简写简写形式

~~~javascript
element.click()
~~~

2. 第二种自动触发模式

~~~javascript
element.trigger("type")
~~~

3. 第三种自动触发模式（它不会触发元素的默认行为）

~~~javascript
$('div').on("click",function(){
   alert(1)
})
//自动触发事件
// $('div').click()
//$('div').trigger("click")
$('div').triggerHandler('click')
~~~

## 4.3 事件对象

* 事件被触发，就会有事件对象的产生。

```javascript
element.on(events,[selector],function(event){})
```

控制台打印出来event

~~~shell
jQuery.Event {originalEvent: MouseEvent, type: "click", isDefaultPrevented: ƒ, target: div, currentTarget: div, …}
altKey: false
bubbles: true
button: (...)
buttons: (...)
cancelable: (...)
changedTouches: (...)
char: (...)
charCode: (...)
clientX: (...)
clientY: (...)
code: (...)
ctrlKey: (...)
currentTarget: div
data: undefined
delegateTarget: div
detail: (...)
eventPhase: (...)
handleObj: {type: "click", origType: "click", data: undefined, handler: ƒ, guid: 1, …}
isDefaultPrevented: ƒ returnFalse()
jQuery36001524079594603871: true
key: (...)
keyCode: (...)
metaKey: (...)
offsetX: (...)
offsetY: (...)
originalEvent: MouseEvent {isTrusted: true, screenX: 21, screenY: 92, clientX: 21, clientY: 19, …}
pageX: (...)
pageY: (...)
pointerId: (...)
pointerType: (...)
relatedTarget: null
screenX: (...)
screenY: (...)
shiftKey: (...)
target: div
targetTouches: (...)
timeStamp: 3977.574999909848
toElement: (...)
touches: (...)
type: "click"
view: (...)
which: (...)
__proto__: Object
~~~

* 阻止默认行为： event.preventDefault(),或者return false
* 阻止冒泡：event.stopPropagation()

# 5jQuery其他方法

## 5.1jQuery对象拷贝

如果想要把某个对象拷贝（合并）给另一个对象使用，可以使用 $.extend()方法

语法：

~~~javascript
$.extend([deep],target,object1,[objectN])
~~~

* deep：如果设为true为深拷贝，默认为false，浅拷贝
* target：要拷贝的目标对象
* object1：待拷贝的第一个对象的对象
* objectN：待拷贝到第N个对象的对象
* 浅拷贝是把被拷贝的对象复杂数据类型中的地址拷贝给目标对象，修改目标对象会影响到被拷贝对象

~~~javascript
let targetObj = {
            num: 1,
            name: 'gg'
        }
        let obj = {
            name: 'shishi',
            age: 20
        }
        $.extend(targetObj,obj)
        console.log(targetObj);
//输出
{num: 1, name: "shishi", age: 20}
~~~

* 如果原对象里有数据
  * 相同属性： 会被覆盖
  * 不同属性： 会被合并保留

深拷贝与浅拷贝

~~~javascript
let obj1 = {
            name: 'shishi',
            msg: {
                num: 1,
            }
        }
let t1 = {}, t2 = {}
$.extend( t1, obj1)
$.extend(true, t2, obj1)
obj1.msg.num = 2
obj1.name = "hh"
console.log('t1:',t1);//num变为2，name不变
console.log('t2',t2);//num变为1，name不变
~~~

## 5.2 jQuery多库共存

jQuery使用$符号作为标识符，如果其他的js库也用$符号作为标识符一起使用会引起冲突

为了让jQuery和其他的js库不存在冲突，可以同时存在，就叫做多库共存

jQuery解决方案：

1. 统一将里面的$符号改为jQuery，`jQuery('div')`
2. jQuery变量规定新的名称： $.noConflict()  `var newName = $.noConflict()`

~~~javascript
 let newName = $.noConflict()
newName.each(newName('div'), function (i,e) { 
      console.log(i,e);
})
~~~

## 5.3jQuery插件

jQuery功能比较有限，主要用于DOM操作，如果想要更复杂的特效效果，可以借助于jQuery插件完成。

* **在使用jQuery插件之前一定要先引入jQuery文件**

jQuery插件常用网站

* jQuery插件库： http://www.jq22.com
* jQuery之家： http://www.htmleaf.com    (免费！！！)

# 6.jQuery尺寸和位置操作

## 6.1jQuery尺寸操作

| 语法                                 | 用法                                                  |
| ------------------------------------ | ----------------------------------------------------- |
| width() / height()                   | 取得匹配元素的宽度和高度值，只计算width  /  height    |
| innerWidth() / innerHeight()         | 取得匹配元素的宽度和高度值，包含padding               |
| outerWidth() / outerHeight()         | 取得匹配元素的宽度和高度值，包含padding,border        |
| outerWidth(true) / outerHeight(true) | 取得匹配元素的宽度和高度值，包含padding,border,margin |

~~~html
<style>
        div{
            height: 100px;
            width: 100px;

            padding: 50px;

            border: 20px solid black;

            margin: 50px;

            background-color: cornflowerblue;
        }
    </style>
</head>
<body>
    <div></div>
    <script src="../node_modules/jquery/dist/jquery.js"></script>
    <script>
        let box = $('div')
        console.log('width():',box.width());
        console.log('innerWidth():',box.innerWidth());
        console.log('outerWidth():',box.outerWidth());
        console.log('outerWidth(true):',box.outerWidth(true));
    </script>
</body>
~~~

~~~shell
//输出
width(): 100
innerWidth(): 200
outerWidth(): 240
outerWidth(true): 340
~~~

## 6.2 jQuery位置

位置主要有三个：**offset(),  position(), scrollTop()/scrollLeft()**

* 注意这三个方法返回的是带数据的对象
* 不给参数则为获取，给了参数则为设置
* position()方法只能获取不能设置

### 

* offset()方法设置或返回被选元素相对于**文档** 的偏移坐标，跟父级没有关系
* position()方法设置或返回被选元素相对于父亲元素的偏移坐标，如果父亲（向上寻找）没有定位以文档为准

~~~html
<div class="outer">
        <div class="inner"></div>
    </div>
    <script src="../node_modules/jquery/dist/jquery.js"></script>
    <script>
        console.log($('.inner').offset());//{top: 150, left: 158}
        $('.inner').offset({
            top: 0,
            left: 0
        })
        console.log($('.inner').offset());//{top: 0, left: 0}
        console.log($('.inner').position());//{top: -50, left: -58}
    </script>
~~~

* scrollTop()方法设置或返回被选元素被卷去的头部

~~~html
<div class="back">回到顶部</div>
    <div class="box">内容</div>
    <script src="../node_modules/jquery/dist/jquery.js"></script>
    <script>
        $(window).scroll(function () { 
            console.log($(document).scrollTop());
            $('.back').offset({top: $(document).scrollTop()+100})})

         $('.back').on('click',function(){
           
            // $(document).scrollTop(0)

            //建议这样做，有动画效果
           //只有元素对象才有动画属性，不能是document文档
            $('html,body').animate({scrollTop: 0})
         })
    </script>
~~~

