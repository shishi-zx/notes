# HTML5

## 一 骨架标签

```html
<!doctype html>
<html lang="zh">
<head>
    <meta charset="UTF-8">
    <meta name="viewport"
          content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Document</title>
</head>
<body>

</body>
</html>
```

### 1. 基本骨架标签

`<!DOCTYPE>` **文档类型声明**，作用就是告诉浏览器使用哪种HTML版本来显示网页。

* 不是一个html的标签，他就是文档类型的声明标签
* 该声明应处于文档最前面的位置，处于`<html>`标签之前

```html
<!DOCTYPE html>  声明为 html5 的版本
```



`lang`语言种类

* en 定义语言为英语
* zh-CN 定义语言为中文
* 并不会影响网页的编写，只是定义该网页为哪种语言类型的网页
* 该属性对浏览器和搜索引擎还是有作用的，比如英文浏览器打开可能会提示你翻译



`<meta charset="UTF-8">` 使用该属性来规定HTML文档应该使用哪种字符编码，这里使用utf-8

常用的有：**GB2312**, **BIG5**, **GBK**, **UTF-8**(也被称为**万国码**)

### 2. 移动端相关的标签

**meta 视口标签**

```html
<meta name="viewport"
      content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">
```

|       属性        |                           解释说明                           |
| :---------------: | :----------------------------------------------------------: |
|     **width**     | 宽度设置的是**viewport**宽度，可以设置**device-width**（设备宽度）特殊值 |
| **initial-scale** |                   初始缩放比，大于0的数字                    |
| **maximum-scale** |                   最大缩放比，大于0的数字                    |
| **minimum-scale** |                   最小缩放比，大于0的数字                    |
| **user-scalable** |            用户是否可以缩放，yes 或者 no（1 或0）            |

