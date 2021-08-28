# 1. Vue.js是什么?
	1). 一位华裔前Google工程师(尤雨溪)开发的前端js库
	2). 作用: 动态构建用户界面
	3). 特点:
		* 遵循MVVM模式
		* 编码简洁, 体积小, 运行效率高, 移动/PC端开发
		* 它本身只关注UI, 可以轻松引入vue插件和其它第三库开发项目
	4). 与其它框架的关联:
		* 借鉴angular的模板和数据绑定技术
		* 借鉴react的组件化和虚拟DOM技术
	5). vue包含一系列的扩展插件(库):
		* vue-cli: vue脚手架
		* vue-resource(axios): ajax请求
		* vue-router: 路由
		* vuex: 状态管理
		* vue-lazyload: 图片懒加载
		* vue-scroller: 页面滑动相关
		* mint-ui: 基于vue的组件库(移动端)
		* element-ui: 基于vue的组件库(PC端)

# 2. 基本使用
	1). 引入vue.js
	2). 创建Vue实例对象(vm), 指定选项(配置)对象
		el : 指定dom标签容器的选择器
		data : 指定初始化状态数据的对象/函数(返回一个对象)
	3). 在页面模板中使用{{}}或vue指令

# 3. Vue对象的选项
## 1). el
	指定dom标签容器的选择器
	Vue就会管理对应的标签及其子标签

## 2). data
	对象或函数类型
	指定初始化状态属性数据的对象
	vm也会自动拥有data中所有属性
	页面中可以直接访问使用
	数据代理: 由vm对象来代理对data中所有属性的操作(读/写)
## 3). methods
	包含多个方法的对象
	供页面中的事件指令来绑定回调
	回调函数默认有event参数, 但也可以指定自己的参数
	所有的方法由vue对象来调用, 访问data中的属性直接使用this.xxx

## 4). computed
	包含多个方法的对象
	对状态属性进行计算返回一个新的数据, 供页面获取显示
	一般情况下是相当于是一个只读的属性
	利用set/get方法来实现属性数据的计算读取, 同时监视属性数据的变化
	如何给对象定义get/set属性
		在创建对象时指定: get name () {return xxx} / set name (value) {}
	  	对象创建之后指定: Object.defineProperty(obj, age, {get(){}, set(value){}})

## 5). watch
	包含多个属性监视的对象
	分为一般监视和深度监视
	    xxx: function(value){}
		xxx : {
			deep : true,
			handler : fun(value)
		}
	另一种添加监视方式: vm.$watch('xxx', function(value){})

# 4. 过渡动画
	利用vue去操控css的transition/animation动画
	模板: 使用<transition name='xxx'>包含带动画的标签
	css样式
		.fade-enter-active: 进入过程, 指定进入的transition
		.fade-leave-active: 离开过程, 指定离开的transition
		.xxx-enter, .xxx-leave-to: 指定隐藏的样式
	编码例子
	    .xxx-enter-active, .xxx-leave-active {
	      transition: opacity .5s
	    }
	    .xxx-enter, .xxx-leave-to {
	      opacity: 0
	    }
	    
	    <transition name="xxx">
	      <p v-if="show">hello</p>
	    </transition>

# 5. 生命周期
	vm/组件对象
	生命周期图
	主要的生命周期函数(钩子)
		created() / mounted(): 启动异步任务(启动定时器,发送ajax请求, 绑定监听)
		beforeDestroy(): 做一些收尾的工作

# 6. 自定义过滤器
## 1). 理解
	对需要显示的数据进行格式化后再显示

## 2). 编码
	1). 定义过滤器
		Vue.filter(filterName, function(value[,arg1,arg2,...]){
		  // 进行一定的数据处理
		  return newValue
		})
	2). 使用过滤器
		<div>{{myData | filterName}}</div>
		<div>{{myData | filterName(arg)}}</div>

# 7. vue内置指令
	v-text/v-html: 指定标签体
		* v-text : 当作纯文本
		* v-html : 将value作为html标签来解析
	v-if v-else v-show: 显示/隐藏元素
		* v-if : 如果vlaue为true, 当前标签会输出在页面中
		* v-else : 与v-if一起使用, 如果value为false, 将当前标签输出到页面中
		* v-show: 就会在标签中添加display样式, 如果vlaue为true, display=block, 否则是none
	v-for : 遍历
		* 遍历数组 : v-for="(person, index) in persons"   
		* 遍历对象 : v-for="value in person"   $key
	v-on : 绑定事件监听
		* v-on:事件名, 可以缩写为: @事件名
		* 监视具体的按键: @keyup.keyCode   @keyup.enter
		* 停止事件的冒泡和阻止事件默认行为: @click.stop   @click.prevent
		* 隐含对象: $event
	v-bind : 强制绑定解析表达式  
		* html标签属性是不支持表达式的, 就可以使用v-bind
		* 可以缩写为:  :id='name'
		* :class
		  * :class="a"
			* :class="{classA : isA, classB : isB}"
			* :class="[classA, classB]"
		* :style
			:style="{color : color}"
	v-model
		* 双向数据绑定
		* 自动收集用户输入数据
	ref : 标识某个标签
		* ref='xxx'
		* 读取得到标签对象: this.$refs.xxx

# 8. 自定义指令
## 1). 注册全局指令
    Vue.directive('my-directive', function(el, binding){
      el.innerHTML = binding.value.toUpperCase()
    })

## 2). 注册局部指令
    directives : {
      'my-directive' : function(el, binding) {
          el.innerHTML = binding.value.toUpperCase()
      }
    }

## 3). 使用指令
    <div v-my-directive='xxx'>



# 9.vue/cli



## 1. vue脚手架
    用来创建vue项目的工具包
    创建项目:
        npm install -g vue-cli
        vue init webpack VueDemo
    开发环境运行:
        cd VueDemo
        npm install
        npm run dev
    生产环境打包发布
        npm run build
        npm install -g serve
        serve dist
        http://localhost:5000

## 2. eslint
    用来做项目编码规范检查的工具
    基本原理: 定义了很多规则, 检查项目的代码一旦发现违背了某个规则就输出相应的提示信息
    有相应的配置, 可定制检查

## 3. 组件化编程
    vue文件包含3个部分
        <template>
          <div></div>
        </template>
        <script>
            export default {
    		  props: []/{}
              data(){},
    		  computed: {}
              methods: {},
    		  
    		  watch: {}
    		  filters: {}
    		  directives: {}
    		  components: {}
            }
        </script>
        <style>
        </style>
    组件化编码的基本流程
    	1). 拆分界面, 抽取组件
    	2). 编写静态组件
    	3). 编写动态组件
        	初始化数据, 动态显示初始化界面
        	实现与用户交互功能
    组件通信的5种方式
    	props
    	vue的自定义事件
    	pubsub第三方库
    	slot
    	vuex(后面单独讲)
    props:
        父子组件间通信的基本方式
        属性值的2大类型: 
            一般: 父组件-->子组件
            函数: 子组件-->父组件
    	隔层组件间传递: 必须逐层传递(麻烦)
    	兄弟组件间: 必须借助父组件(麻烦)
    vue自定义事件
        子组件与父组件的通信方式
        用来取代function props
        不适合隔层组件和兄弟组件间的通信
    pubsub第三方库(消息订阅与发布)
        适合于任何关系的组件间通信
    slot
        通信是带数据的标签
        注意: 标签是在父组件中解析
    vuex
        多组件共享状态(数据的管理)
        组件间的关系也没有限制
        功能比pubsub强大, 更适用于vue项目

## 4. ajax
    相关库:
        vue-resource: vue插件, 多用于vue1.x
        axios: 第三方库, 多用于vue2.x
    vue-resource使用
        // 引入模块
        import VueResource from 'vue-resource'
        // 使用插件
        Vue.use(VueResource)
        
        // 通过vue/组件对象发送ajax请求
        this.$http.get('/someUrl').then((response) => {
          // success callback
          console.log(response.data) //返回结果数据
        }, (response) => {
          // error callback
          console.log(response.statusText) //错误信息
        })
    axios使用
        // 引入模块
        import axios from 'axios'
        
        // 发送ajax请求
        axios.get(url)
          .then(response => {
            console.log(response.data) // 得到返回结果数据
          })
          .catch(error => {
        	console.log(error.message)
          })

## 5. vue-router
    vue用来实现SPA的插件
    使用vue-router
        1. 创建路由器: router/index.js
          new VueRouter({
            routes: [
              { // 一般路由
                path: '/about',
                component: about
              },
              { // 自动跳转路由
                path: '/', 
                redirect: '/about'
              }
            ]
          })
        2. 注册路由器: main.js
           import router from './router'
           	new Vue({
           		router
           	})
        3. 使用路由组件标签:
           	<router-link to="/xxx">Go to XXX</router-link>
           	<router-view></router-view>
    编写路由的3步
        1. 定义路由组件    
        2. 映射路由
        3. 编写路由2个标签
    嵌套路由
        children: [
            {
              path: '/home/news',
              component: news
            },
            {
              path: 'message',
              component: message
            }
         ]
    向路由组件传递数据
        params: <router-link to="/home/news/abc/123">
        props: <router-view msg='abc'>
    缓存路由组件
        <keep-alive>
          <router-view></router-view>
        </keep-alive>
    路由的编程式导航
    	this.$router.push(path): 相当于点击路由链接(可以返回到当前路由界面)
    	this.$router.replace(path): 用新路由替换当前路由(不可以返回到当前路由界面)
    	this.$router.back(): 请求(返回)上一个记录路由
# 10.vuex

## 1. vuex是什么

	github站点: https://github.com/vuejs/vuex
	在线文档: https://vuex.vuejs.org/zh-cn/
	简单来说: 对应用中组件的状态进行集中式的管理(读/写)

## 2. 状态自管理应用

	state: 驱动应用的数据源
	view: 以声明方式将state映射到视图
	actions: 响应在view上的用户输入导致的状态变化(包含n个更新状态的方法)
![单向数据流](https://vuex.vuejs.org/zh-cn/images/flow.png)

 ## 3. 多组件共享状态的问题

	多个视图依赖于同一状态
	来自不同视图的行为需要变更同一状态
	以前的解决办法
		* 将数据以及操作数据的行为都定义在父组件
		* 将数据以及操作数据的行为传递给需要的各个子组件(有可能需要多级传递)
	vuex就是用来解决这个问题的
![vuex结构](https://vuex.vuejs.org/zh-cn/images/vuex.png)

[img](fasdfasd)

## 4. vuex的核心概念

### 1). state

	vuex管理的状态对象
	它应该是唯一的
	const state = {
		xxx: initValue
	}
### 2). mutations

	包含多个直接更新state的方法(回调函数)的对象
	谁来触发: action中的commit('mutation名称')
	只能包含同步的代码, 不能写异步代码
	const mutations = {
		yyy (state, data) { 
			// 更新state的某个属性
		}
	}
### 3). actions

	包含多个事件回调函数的对象
	通过执行: commit()来触发mutation的调用, 间接更新state
	谁来触发: 组件中: $store.dispatch('action名称')  // 'zzz'
	可以包含异步代码(定时器, ajax)
	const actions = {
		zzz ({commit, state}, data1) {
			commit('yyy', data2)
		}
	}
### 4). getters

	包含多个计算属性(get)的对象
	谁来读取: 组件中: $store.getters.xxx
	const getters = {
		mmm (state) {
			return ...
		}
	}
### 5). modules

	包含多个module
	一个module是一个store的配置对象
	与一个组件(包含有共享数据)对应

### 6). 向外暴露store对象

	export default new Vuex.Store({
		state,
		mutations,
		actions,
		getters
	})

### 7). 组件中:

	import {mapGetters, mapActions} from 'vuex'
	export default {
		computed: mapGetters(['mmm'])
		methods: mapActions(['zzz'])
	}
	
	{{mmm}} @click="zzz(data)"

### 8). 映射store

	import store from './store'
	new Vue({
		store
	})

### 9). store对象

	1.所有用vuex管理的组件中都多了一个属性$store, 它就是一个store对象
	2.属性:
	  state: 注册的state对象
	  getters: 注册的getters对象
	3.方法:
	  dispatch(actionName, data): 分发action 

## 5. 将vuex引到项目中

### 1). 下载: npm install vuex --save

### 2). 使用vuex

	1.store.js
		import Vuex from 'vuex'
		export default new Vuex.Store({
			state,
			mutations,
			actions,
			getters,
			modules
		})
	2.main.js
		import store from './store.js'
		new Vue({
			store
		})