* 开发官网：https://developers.weixin.qq.com/miniprogram/dev/framework/
* 需要前端相关知识（html，css，js，vue/react）

# 1. 环境准备

## 1.1 注册账号

* 官网点击注册小程序：https://mp.weixin.qq.com/wxopen/waregister?action=step1
* 然后根据官网提示就行了

## 1.2 获取APPID

* 为了发布和得到开发更高级的功能，这一步是必须的
* 官网登录注册的小程序
* 然后点击左边菜单栏开发，然后再点击开发设置
* 保存下来自己小程序的这个AppID，==不要泄露出去，非常重要==

## 1.3 开发工具

* 上微信小程序官网下载开发工具，选择自己需要的版本工具（一般选择开发版）：https://developers.weixin.qq.com/miniprogram/dev/devtools/download.html
* 安装工具
* 当然这个工具的编码可能不习惯，我们可以搭配其他编辑器编写代码，然后用这个工具预览就行了

# 2. Hello World

* 打开我们的开发工具（需要扫码登录）
* 点击 中间页面的 + 来创建第一个小程序（左边菜单栏要选择小程序而不是其他东西）
* 然后选择目录等等
* 选择测试号填写AppID来做第一个helloworld，（测试号不能使用云服务功能）
* 然后选择自己的开发语言，点击确认就新建好一个项目了



# 3. 小程序的结构目录

* 有自己的视图层描述语言，文件后缀与常规web不同

| 结构 | web  | 微信小程序 |
| ---- | ---- | ---------- |
| 结构 | HTML | WXML       |
| 样式 | CSS  | WXSS       |
| 逻辑 | js   | js         |
| 配置 | -    | JSON       |

* 而且开发工具提供了类似VUE等mvvm框架的功能，让我们专注于数据与逻辑而不用关注数据传输和事件系统

## 目录结构

* 如果选择了TS作为开发语言，那么js->ts。并且项目根目录出现typings文件夹和一些ts的配置文件
* 如果选择了less模板，那么wxss->less

```js
|--pages  ——————————————————————————页面文件夹
	|--index————————————————————————首页
		|--index.js—————————————————首页的逻辑文件
		|--index.json———————————————首页的配置文件
		|--index.wxml———————————————首页的结构文件
		|--index.wxss———————————————首页的样式文件
	|--logs———————————————日志页面
		|--logs.js
		|--logs.json
		|--logs.wxml
		|--logs.wxss
|--utils———————————————第三方的工具js（可以删除）
	|--util.js
|--app.js———————————————项目的全局入口文件
|--app.json———————————————全局配置文件
|--app.wxss———————————————全局样式文件
|--project.config.json———————————————项目的配置文件（AppID）
|--sitemap.json———————————————微信索引配置文件（配置小程序及其页面是否允许被微信索引）
```

# 4.小程序的配置文件

* 官网：https://developers.weixin.qq.com/miniprogram/dev/framework/config.html

## 4.1 全局配置文件 app.json

### pages字段：

* 内容与文件结构中的pages内容一致
* 可以选择在这里添加内容来完成新页面内容的新建或者自己在文件结构中新建
  * 这么做的前提是用微信小程序的开发工具编辑而不是其他编辑器
* 这个字段下的第一个页面将作为小程序首页

### window字段：

* 定义小程序所有页面的顶部背景颜色，文字颜色等（全局默认窗口表现）
* 可以参照官方文档编写此字段
* 内容包含：导航样式，是否下拉刷新，下拉刷新样式，屏幕旋转等……

### tabbar字段：

* 可以通过该字段配置页面导航条（例如底部的导航条切换）
* list属性（数组）：配置哪些页面跳转，里面属性以对象形式配置
  * pagePath：配置哪些页面加入导航切换
  * text：配置对应的显示文字
  * iconPath：配置未被选中的图标
    * 一般我们将所有图标放到与page同级的目录中保存
  * selectedIconPath：配置被选中的图标
* 其他属性建议查看官网编写，可以配置边框，颜色等



## 4.2 页面配置文件 page.json

* 可以单独的为每一个文件配置单独的样式去覆盖掉全局样式
* 这个页面配置文件为每一个页面文件中的 .json文件

## 4.3 sitemap配置

* 小程序根目录下的 `sitemap.json` 文件用来配置小程序及其页面是否允许被微信索引



# 5 wxml标签与模板语法

 html与wxml的区别

| html | wxml      |                                        |
| ---- | --------- | -------------------------------------- |
| span | text      | 行内元素                               |
| div  | view      | 块级元素                               |
| a    | navigator | 在wxml中是块级，且用法有区别，请看文档 |

* 小程序的模板语法与vue和react的mvvm思想一致，模块化，生命周期
* 在你使用自动生成页面初始结构时候可以发现，许多中文注释，有vue基础可以自己动手编写了
* 如果用vscode编写代码的话，可以下载小程序开发助手插件
* 常见标签说明：https://developers.weixin.qq.com/miniprogram/dev/component

页面的数据结构

```js
Page({

    /**
     * 页面的初始数据
     */
    data: {

    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad() {

    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady() {

    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow() {

    },

    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide() {

    },

    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload() {

    },

    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh() {

    },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom() {

    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage() {

    }
})
```



## 5.1数据绑定

* 每个页面项目中

* 与vue的插值语法一样，在页面结构中使用 {{ }} 来使用变量

  * 数据变量放在js代码部分的data属性中

  * 在页面结构中使用 {{}} 来调用它

  * 如果想要给标签加属性为data里的变量时候，与vue略有不同（如果是自定义属性记得用data-开头来编写自定义属性）

    * 需要再嵌套一层双引号
    * 如果需要实现双向绑定，需要加上前缀 `model:`,不能像vue一样简写为 `:`，而且双引号不能有空格介于之间(容易导致bool类型的变量解析错误)

    ```js
    //js文件
    data: {
        msg: '这是第一个页面的信息',
        num:'444',
        a:1,
        b:2
    },
    ```

    ```html
    //wxml文件
    <view>插值语法: {{ msg }}: {{ num }}</view>
    <input type="text" model:value="{{num}}" />
    ```

## 5.2 运算

* 与vue一样，{{}}里面放的是表达式，也就是运算也可以

```html
<view>{{a+b}}</view>
<view>{{a==b}}</view>
```

## 5.3列表渲染

* 与vue一样可以进行列表渲染，但是用法不一样
* 同样的与vue一样我们需要一个key来优化性能

语法：

```html
wx:for="{{数组或者对象}}" wx:for-item="循环项的名称" wx:for-index="循环项的索引" wx:key = "唯一的值"
```

* 注意：如果不指定wx:for-item和wx:for-index，他会默认为item和index，所以如果两层循环的时候，注意重命名这两个属性

示例:数据 list已经存放在data中

```html
列表：
<view>
   <view wx:for="{{list}}" wx:for-item="item" wx:for-index="index" wx:key="item">{{item}}  顺序:{{index}}</view>
</view>
```

* 为什么key不建议用index的原因与vue相同，会导致某些场景下的问题
* 如果`wx:="*this*"` 表示你的数组为一个普通数组（也就是元素不是对象）

## 5.4条件渲染

* 类似与vue，只不过名字变了

```html
<view wx:if="{{length > 5}}"> 1 </view>
<view wx:elif="{{length > 2}}"> 2 </view>
<view wx:else> 3 </view>
```

## 5.5 block标签

* 它类似与vue中的template标签，只存在于代码编写时候，不会生成新的结构





# 6. 事件

## 6.1绑定事件

结构

```html
<view>值为：{{value}}</view>
<view>
    请输入： <input type="text" bindinput="handleInput" />
</view> 
```

逻辑

```js
Page({
    data: {
        value: 0
    },
    handleInput(e){
        console.log(e.detail.value);
        this.setData({
            value: e.detail.value
        })
    }
})
```

说明：

* 一般来说在元素上的值能在事件参数event上找到： `event.detail`上
* 特别注意的是 于vue不同的是，不能直接this.data来给数据赋值，要用this.setData(object)来赋值data里的数据
* 与vue不同的是，元素绑定事件时候不能传递参数，需要通过自定义属性传递参数,然后参数在 `event.currentTarget.dataset`对象中

```html
<view>
    计算结果： {{num}}
    <button bindtap="handleTap" data-operation="{{1}}"> +1 </button>
    <button bindtap="handleTap" data-operation="{{-1}}"> -1 </button>
</view>
```

```js
data: {
        ...
        num: 0
    },
    ...
    handleTap(e){
        let n = e.currentTarget.dataset.operation
        console.log(e);
        this.setData({
            num: this.data.num + n
        })
    }
```



# 7.样式

## 7.1 尺寸单位 rpx

* rpx（responsive pixel）: 可以根据屏幕宽度进行自适应。规定屏幕宽为750rpx。如在 iPhone6 上，屏幕宽度为375px，共有750个物理像素，则750rpx = 375px = 750物理像素，1rpx = 0.5px = 1物理像素。

* 规定所有手机的屏幕的宽度为 750 rpx

## 7.2 样式导入

* 使用`@import`语句可以导入外联样式表，`@import`后跟需要导入的外联样式表的相对路径，用`;`表示语句结束。

```css
// 外部的样式文件，不是页面本身的样式文件
.box{
    width: 200rpx;
    height: 200rpx;
    background: red;
}
```

```css
// 在内部页面的样式文件中引入，相对路径，分号
@import "../../style/test.wxss";
```



# 8. button的开放能力

| open-type：string | 说明                                                         |                                                              |
| ----------------- | ------------------------------------------------------------ | ------------------------------------------------------------ |
| contact           | 打开客服会话，如果用户在会话中点击消息卡片后返回小程序，可以从 bindcontact 回调中获得具体信息，[具体说明](https://developers.weixin.qq.com/miniprogram/dev/framework/open-ability/customer-message/customer-message.html) （*小程序插件中不能使用*） | [1.1.0](https://developers.weixin.qq.com/miniprogram/dev/framework/compatibility.html) |
| share             | 触发用户转发，使用前建议先阅读[使用指引](https://developers.weixin.qq.com/miniprogram/dev/framework/open-ability/share.html#使用指引) | [1.2.0](https://developers.weixin.qq.com/miniprogram/dev/framework/compatibility.html) |
| getPhoneNumber    | 获取用户手机号，可以从bindgetphonenumber回调中获取到用户信息，[具体说明](https://developers.weixin.qq.com/miniprogram/dev/framework/open-ability/getPhoneNumber.html) （*小程序插件中不能使用*） | [1.2.0](https://developers.weixin.qq.com/miniprogram/dev/framework/compatibility.html) |
| getUserInfo       | 获取用户信息，可以从bindgetuserinfo回调中获取到用户信息 （*小程序插件中不能使用*） | [1.3.0](https://developers.weixin.qq.com/miniprogram/dev/framework/compatibility.html) |
| launchApp         | 打开APP，可以通过app-parameter属性设定向APP传的参数[具体说明](https://developers.weixin.qq.com/miniprogram/dev/framework/open-ability/launchApp.html) | [1.9.5](https://developers.weixin.qq.com/miniprogram/dev/framework/compatibility.html) |
| openSetting       | 打开授权设置页                                               | [2.0.7](https://developers.weixin.qq.com/miniprogram/dev/framework/compatibility.html) |
| feedback          | 打开“意见反馈”页面，用户可提交反馈内容并上传[日志](https://developers.weixin.qq.com/miniprogram/dev/api/base/debug/wx.getLogManager.html)，开发者可以登录[小程序管理后台](https://mp.weixin.qq.com/)后进入左侧菜单“客服反馈”页面获取到反馈内容 | [2.1.0](https://developers.weixin.qq.com/miniprogram/dev/framework/compatibility.html) |
| chooseAvatar      | 获取用户头像，可以从bindchooseavatar回调中获取到头像信息     |                                                              |

```html
<button open-type="concat">concat</button>
<button open-type="share">share</button>
<button open-type="getPhoneNumber">getPhoneNumber</button>
```



# 9. 自定义组件

* 从小程序基础库版本 [1.6.3](https://developers.weixin.qq.com/miniprogram/dev/framework/compatibility.html) 开始，小程序支持简洁的组件化编程。所有自定义组件相关特性都需要基础库版本 [1.6.3](https://developers.weixin.qq.com/miniprogram/dev/framework/compatibility.html)或更高。

  开发者可以将页面内的功能模块抽象成自定义组件，以便在不同的页面中重复使用；也可以将复杂的页面拆分成多个低耦合的模块，有助于代码维护。自定义组件在使用时与基础组件非常相似

* 整个流程与vue的组件化思想差不多一致

## 9.1创建自定义组件

* 可以在微信开发者工具鼠标右键新建组件

* 类似于页面，一个自定义组件由 `json` `wxml` `wxss` `js` 4个文件组成。要编写一个自定义组件，首先需要在 `json`文件中进行自定义组件声明（将 `component` 字段设为 `true` 可将这一组文件设为自定义组件）：

```json
{
  "component": true
}
```

* 生成文件后可以发现js文件中不再是Page对象了，而是Component 对象了

```js
// components/myHeaders/myHeaders.js
Component({
    /**
     * 组件的属性列表
     */
    properties: {

    },

    /**
     * 组件的初始数据
     */
    data: {

    },

    /**
     * 组件的方法列表
     */
    methods: {

    }
})

```

## 9.2 声明组件

* 如果要在页面中使用组件自定义组件，需要在需要使用的页面的 json文件中声明

```json
{
  "usingComponents": {
    "myHeaders": "../../components/myHeaders/myHeaders"
  }
}
```

## 9.3 使用组件

* 在页面的结构文件中像使用标签一样使用就行了

```html
<myHeaders></myHeaders>
```

## 9.4 父组件向子组件传递数据

* 通过标签属性的方式传递
* 与vue的组件间（父向子）通信prop（这里为properties）
* properties里接受的数据与data里的数据用法一样

父组件中：

```js
Page({
    data: {
        str: 'hello sub'
    }
})
```

```html
<view>我是父组件：我想传递的数据: {{str}}</view>
<myHeaders param1="{{str}}" param2="123456"></myHeaders>
```

子组件中：

```js
// components/myHeaders/myHeaders.js
Component({
    /**
     * 组件的属性列表
     */
    properties: {
        param1:{
            type: String,
            value: "hh",//这里表示默认值
        },
        param2:{
            type: Number,
            value: 0
        }
    }
})

```

```html
<view>我是子组件：我收到的数据：{{param1}} , {{param2}}</view>
```

## 9.5 子组件向父组件传递数据

* 子组件向父组件传递数据需要使用事件的方式（==类似==vue）

1. 子组件中通过 `this.triggerEvent("方法名","参数（对象形式）")`来触发父组件中给子组件绑定的回调函数

   ```js
   /**
    * 组件的方法列表
    */
   methods: {
       clickEvent(){
           this.triggerEvent("ToFat",{hhh:'gghhh'})
       }
   }
   ```

2. 父组件再使用子组件时候将回调函数传递给子组件

   * 需要注意的是，属性名字要如下：
   * 也就是刚刚在子组件里  `this.triggerEvent("方法名","参数（对象形式）")`里的方法名是ToFat，但是这里传递的时候要加上 bind

   ```html
   <!-- 当自定义组件触发“myevent”事件时，调用“onMyEvent”方法 -->
   <component-tag-name bindToFat="ToFatEvent" />
   <!-- 或者可以写成 -->
   <component-tag-name bind:ToFat="ToFatEvent" />
   ```

3. 这样在子组件中触发时候，就会调用父组件的ToFatEvent方法，父组件中的ToFatEvent为

```js
ToFatEvent(e){
    console.log(e);
    console.log(e.detail.hhh);
}
```

* 子组件的 `this.triggerEvent("方法名","参数（对象形式）")`传递过来的参数对象就是这里的 e.detail （注意这里指定的同一个对象，也就是相当于这是一个浅拷贝，特别注意）

## 9.6 slot插槽

* 与 vue 同，可以使用 slot插槽

子组件

```html
<view>
    这里是slot插槽
    <slot></slot>
</view>
```

父组件

```html
<myHeaders >
    <view>
        这是给子组件slot显示的内容
    </view>
</myHeaders>
```

