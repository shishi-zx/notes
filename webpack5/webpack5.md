* 一种前端资源构建工具
* 一个静态模块打包器
* 前端的所有资源文件（.js/.json/.css/.img/less/...）都会作为模块处理
* 会根据模块的依赖关系进行静态分析，打包生成对应的静态资源（bundle）

# 五个核心概念

## 1. Entry

* 入口：指示 webpack 以哪个文件为入口点开始打包，分析构建内部依赖图



## 2. Output

* 输出：指示 Webpack 打包后的资源bundles 输出到哪里去，以及如何命名



## 3. Loader

* 加载器：让 webpack 能够去处理非 js 文件（webpack 自身只认识js）



## 4. Plugins

* 插件：可以用于执行范围更广的任务。插件的范围包括：从打包优化和压缩，一直到重新定义环境中的变量等



## 5. Mode

* 模式指示 Webpack 使用相应模式的配置

| 选项        | 描述                                                         | 特点                       |
| ----------- | ------------------------------------------------------------ | -------------------------- |
| development | 会将 process.env.NODE_ENV 的值设为 development<br />启用 NamedChunksPlugin 和 NamedModulesPlugin | 能让代码本地调试运行的环境 |
| production  | 会将 process.env.NODE_ENV 的值设为 production<br />启用 FlagDependencyUsagePlugin，FlagIncludeChunksPlugin，ModuleConcatenationPlugin，NoEmitOnErrorsPlugin，OccurrenceOrderPlugin，SideEffectsFlagPlugin和UglifyJsPlugin | 能让代码优化上线运行的环境 |

# 使用Webpack

* 安装

```bash
npm i webpack webpack-cli  -g
```

* 然后本地安装，添加到开发依赖中

```bash
npm i webpack webpack-cli  -D
```

## 简单使用

* 我们首先创建好项目文件，然后在项目文件中创建src文件夹，build文件夹，src下创建index.js作为入口文件

index.js文件: 

```js
/*
    index.js: webpack 入口起点文件

    1. 运行指令：
        开发环境： webpack ./src/index.js -o ./build/built.js  --mode=development
        : webpack 会以 ./src.index.js 为入口文件开始打包，打包后输出到 ./build/built.js
        整体打包环境，是开发环境

        生产环境：webpack ./src/index.js -o ./build/built.js  --mode=production
            : webpack 会以 ./src.index.js 为入口文件开始打包，打包后输出到 ./build/built.js
            整体打包环境，是生产环境
 */

function sum(x,y) {
    return x + y
}

console.log(sum(3, 5));
```

* 执行`webpack ./src/index.js -o ./build/built.js  --mode=development`命令，发现build文件夹下生成了built.js文件，而且它下面还有一个main文件
* 执行`webpack ./src/index.js -o ./build/built.js  --mode=production`命令，发现build文件夹下生成了built.js文件，而且它下面还有一个main文件，但是针对于开发环境来说，生产环境的代码是压缩的

* 这个时候在html中引入我们的打包后的main.js文件，发现可以运行了（之前如果包含es6的一些语法比如import是会报错的，但是打包后就不会了）
  * 生产环境和开发环境将ES6模块化编译为浏览器能够认识的模块化
* 但是注意的是，webpack 能处理js和json文件，不能处理css/img等其他资源

```js
// webpack打包失败
import './index.css'
```

## 打包样式资源

* 首先我们需要在项目下创建webpack的配置文件
* webpack.config.js
* 使用commonjs语法（因为所有的构建工具都是基于node环境运行的）

```js
/*
    webpack.config.js  webpack 的配置文件

    使用 commonjs 语法规范
*/

// resolve 是用来拼接绝对路径的方法
const { resolve} = require('path')

module.exports = {
    // webpack 的配置

    // 入口起点
    entry: './src/index.js',

    // 输出
    output: {
        // 输出文件名
        filename: 'built.js',

        // 输出路径
        // __dirname 表示当前文件的目录绝对路径
        path: resolve(__dirname, 'build')
    },

    // loader
    module: {
        rules: [
            // 详细 loader的配置
            {
                // test 是正则匹配，匹配哪些文件要做处理
                test: /\.css$/,
                // use 是指定使用哪些 loader 处理
                use: [
                    //use数组中的loader执行顺序：从右到左，从下到上，一次执行
                    // 创建一个style标签，将 js中的css样式资源插入进去，添加到 页面（head）中生效
                    'style-loader',
                    // 将 css文件变成commonjs模块加载到js中，里面内容是样式字符串
                    'css-loader'
                ]
            }
        ]
    },

    //plugins 的配置
    plugins: [
        // 详细插件的配置
    ],

    // 模式
    mode: 'development'
    // mode: 'production'
}
```

* 因为我们需要打包index.js中引入的css样式文件，所以我们需要将loader配置编写规则
* 一定要注意顺序

```js
// loader
module: {
    rules: [
        // 详细 loader的配置
        {
            // test 是正则匹配，匹配哪些文件要做处理
            test: /\.css$/,
            // use 是指定使用哪些 loader 处理
            use: [
                //use数组中的loader执行顺序：从右到左，从下到上，一次执行
                // 创建一个style标签，将 js中的css样式资源插入进去，添加到 页面（head）中生效
                'style-loader',
                // 将 css文件变成commonjs模块加载到js中，里面内容是样式字符串
                'css-loader'
            ]
        }
    ]
},
```

* 然后记得下载包，这里用到了style-loader和css-loader（以及 webpack-cli包）

```bash
npm i css-loader style-loader -D
```

* 然后执行 webpack 命令就可以运行了webpack了

* 然后该js文件引入到页面中后，样式就可以生效了

* 如果同时也引入了less文件，那么修改loader配置,并且注意下载需要的包

```js
 // loader
module: {
    rules: [
        // 详细 loader的配置
        {
            // test 是正则匹配，匹配哪些文件要做处理
            test: /\.css$/,
            // use 是指定使用哪些 loader 处理
            use: [
                //use数组中的loader执行顺序：从右到左，从下到上，一次执行
                // 创建一个style标签，将 js中的css样式资源插入进去，添加到 页面（head）中生效
                'style-loader',
                // 将 css文件变成commonjs模块加载到js中，里面内容是样式字符串
                'css-loader'
            ]
        },
        {
            test: /\.less$/,
            use: [
                'style-loader',
                'css-loader',
                // 需要下载 less 和 less-loader
                'less-loader'
            ]
        }
    ]
},
```

## 打包html资源

* 需要下载 html-webpack-plugin 包

```bash
 npm i html-webpack-plugin -D
```

* 然后编写配置文件
* 注意plugin需要引入，不同于loader

```js
/*
    loader: 需要下载，然后使用
    plugin： 需要下载， 然后引入，然后使用
*/
const {resolve} = require('path')
//引入插件
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
    entry: './src/index.js',
    output: {
        filename: 'built.js',
        path: resolve(__dirname,'bulid')
    },
    module: {
        rules: [

        ]
    },
    plugins: [
        // 直接new 调用就行了
        new HtmlWebpackPlugin
    ],
    mode: 'development'
}
```

* 然后指定 webpack命令

* 发现bulid文件夹下多了一个index.html文件,它默认引入 built.js文件

  * 会引入打包输出的所有资源（JS/CSS）

* 但是这样默认是没有结构的

  * 所以我们需要在修改刚刚的选项

  ```js
  plugins: [
      // 直接new 调用就行了
      new HtmlWebpackPlugin({
          template: './src/index.html'
      })
  ],
  ```

* template 会复制对应的html文件，然后自动引入需要的资源

## 打包图片资源

* webpack5 默认配置就是有引入图片的（也就是注释掉的代码在5中默认了），下面的都是webpack5之前的操作
* 如果在css文件中引入了图片，则我们需要加loader规则来打包图片

```js
module: {
        rules: [
            {
                test: /\.css$/,
                use: [
                    'style-loader',
                    'css-loader'
                ]
            },
            // {
            //     // 处理图片资源
            //     test: /\.(jpg|png|jpeg|)$/,
            //     //只使用一个loader可以直接写,多个用 use
            //     // 要下载两个包，url-loader  file-loader
            //     loader: 'url-loader',
            //     options: {
            //         //当图片大小小于 8kb ，就会被base64处理（图片内容会变成字符串保存）
            //         // base64： 减少请求数量，但是图片体积会增大导致请求速度变慢
            //         // 根据资源而定
            //         limit: 8 * 1024,

            //         //而且url-loader默认使用es6的语法，import导入规则，html-loader是commonjs规则，会出问题
            //         //所以要关闭es6模块化
            //         esModule: false
            //     }
            // },
        ]
    },
```

* 上面这种方法是默认处理不了 html 中引入的图片的（包括webpack5）
* 所以如果在html中引入了图片，还需要加loader，下载html-loader
* html-loader 是用来处理html中引入的图片

```js
 {
    test: /\.html$/,
    //这个是处理html的img图片的（负责引入img，从而能被url-loader打包处理）
    loader: 'html-loader'
}
```

* 对于options配置，除了limit之外，还可以给输出的文件重命名
  * name: '[hash:10].[ext]'
  * 表示hash值取十位，ext表示保持原来文件的扩展名

## 打包其他资源

* 如果使用了其他的库的资源，比如第三方字体图标文件，（.ttf/.svg/.woff/...）

```js
 module: {
    rules: [
        {
            test: /\.css$/,
            use: ['style-loader,css-loader']
        },
        //打包其他资源（除了 html，css，js）
        {
            //排除 css/js/html资源
            exclude: /\.(css|js|html|)$/,
            loader: 'file-loader'
        }
    ]
},
```

## devServer

* 为了避免一直手动打包来更新代码，devServe提供了热更新

* 注释掉的代码表示webpack5之前是这样写

* 与五大核心同级的配置

```js
// 开发服务器 devServer： 自动编译打包，自动打开浏览器，自动刷新浏览器
// 特点： 只会在内存中编译打包，不会有任何输出
// 启动命令： npx webpack-dev-server ,需要安装这个包
// webpack5 的启动命令为 webpack server（用以前的也行）
devServer: {
    // contentBase: resolve(__dirname,'build'),
    static: resolve(__dirname,'build'),
    // 启动gzip压缩，让编译运行的更快
    compress: true,
    // 指定运行的端口号
    port: 3000,

    //自动打开浏览器
    open: true
}
```

* 注意webpack5默认有配置，运行在8080下，直接命令也能打开
* 这个是在内存中编译的，就算没有bulid文件夹，也能执行，而且不会生成文件，只有打包webpack命令才会真正打包