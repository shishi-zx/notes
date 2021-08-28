# less 基础

**是css的扩展语言，预处理器，为了方便编写css代码和维护**

**在原来的css基础上加上了一些程序性语言**

常见的CSS预处理器：Sass、Less、Stylus



## Less使用

新建后缀名为less的文件，在这个文件中就可以less语句

**但是并不是可以直接引用的**，页面只能引入css文件，所以需要将less文件编译为css文件，webstorm选择创建less样式文件，会自动生成相对应的css文件，vscode下载相应插件（easy less）也能实现此效果

**==！！！一定要引入编译后的css文件，而不是less文件==**

### Less变量

经常用来设置颜色和数值

```css
@变量名: 值
```

* 必须有@为前缀
* 不能包含特殊字符
* 不能以数字开头
* 大小写敏感

示例

```less
@back_pink: pink;
@font14:14px;

body{
  background: @back_pink;
  font-size: @font14;
}
```

### less嵌套

样式可以嵌套写，子元素可以直接写在父元素里

示例：

```html
<div class="box1">
    <div class="box2"></div>
</div>
```

```less
@back_pink: pink;
@back_red: red;

.box1{
  width: 400px;
  height: 400px;
  background: @back_pink;

  .box2{
    width: 200px;
    height: 200px;
    background: @back_red;
  }
}
```

可以看编译后的css文件是这样的

```css
.box1 {
  width: 400px;
  height: 400px;
  background: pink;
}
.box1 .box2 {
  width: 200px;
  height: 200px;
  background: red;
}
```

其他的选择器情况：**交集、伪类、伪元素选择器**

* 内层选择器的前面没有 & 符号，则它被解析为父选择器的后代
* 如果有 & 符号，它就被解析为父元素自身或父元素的伪类

示例：

```less
@back_pink: pink;
@back_red: red;

.box1{
  width: 400px;
  height: 400px;
  background: @back_pink;
  &:hover{
    background: #77e5cf;
  }

  .box2{
    width: 200px;
    height: 200px;
    background: @back_red;
  }
}
```

给 在.box1中给自身添加鼠标移入样式

编译后的css文件

```css
.box1 {
  width: 400px;
  height: 400px;
  background: pink;
}
.box1:hover {
  background: #77e5cf;
}
.box1 .box2 {
  width: 200px;
  height: 200px;
  background: red;
}
```

### less运算

任何数字、颜色或者变量都可以参与运算。less提供了 **+、-、* 、/** 的算数运算

示例：

```less
@border: 5px + 5;
div{
  width: 200px - 20;//注意这里一定要加空格
  height: (200px / 2);//除法必须加括号，否则无效
  border: @border solid pink;
  background: #666 - #222;
}
```

编译后的css文件

```css
div {
  width: 180px;
  height: 100px;
  border: 10px solid pink;
  background: #444444;
}
```

注意点：

* 运算符两边必须加空格
* 除法必须加括号括起来
* 两个数参与运算，如果只有一个数有单位，则以他为准
* 如果两个数都有单位且不一样，则最后的结果以第一个为准

