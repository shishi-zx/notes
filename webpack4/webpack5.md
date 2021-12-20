* 一种前端资源构建工具
* 一个静态模块打包器
* 前端的所有资源文件（.js/.json/.css/.img/less/...）都会作为模块处理
* 会根据模块的依赖关系进行静态分析，打包生成对应的静态资源（bundle）
* webpack4

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

* 执行`webpack ./src/index.js -o ./build/built.js  --mode=development`命令，发现build文件夹下生成了built.js文件
* 执行`webpack ./src/index.js -o ./build/built.js  --mode=production`命令，发现build文件夹下生成了built.js文件，而且它下面还有一个main文件，但是针对于开发环境来说，生产环境的代码是压缩的

* 这个时候在html中引入我们的打包后的main.js文件，发现可以运行了（之前如果包含es6的一些语法比如import是会报错的，但是打包后就不会了）
  * 生产环境和开发环境将ES6模块化编译为浏览器能够认识的模块化
* 但是注意的是，此时webpack 能处理js和json文件，不能处理css/img等其他资源

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

## 提却css文件为一个单独文件

* 之前使用 style-loader 是将 js中的css提取到它创建的style标签中，样式是存在js中
* 我们可以不使用style-loader，来讲css提却到一个单独文件中，然后 他将会在html中自动引用（link）
* 与之前不同在于，之前样式是放在js中的，现在成为了单独的css文件

* 首先我们需要安装一个插件： `npm i mini-css-extract-plugin -D`
* 然后在配置中引入，并在loader中替代 style-loader，并在 plugins中new实例
  * 创建实例的参数可以指定输出的文件

```js
const { resolve } = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')

// 用来将css单独提取为一个单独文件
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

module.exports = {
    entry: './src/js/index.js',
    output: {
        filename: 'js/built.js',
        path: resolve(__dirname, 'build')
    },
    module: {
        rules: [
            {
                test: /\.css$/,
                use: [
                    //'style-loader',  // 创建style标签，然后将样式放上去
                    MiniCssExtractPlugin.loader, // 取代style-loade ， 提取js中的css为单独文件
                    'css-loader'     // 将css文件整合到js文件中
                ]
            }
        ]
    },
   plugins: [
        new HtmlWebpackPlugin({
            template: './src/index.html'
        }),
        // 将 css 为单独文件
        new MiniCssExtractPlugin({
            filename: 'css/built.css', // 重命名，默认输出为 main.css
        })
    ],
    mode: 'development'
}
```

## css兼容性问题

* 处理 css的兼容性问题，我们需要装两个loader 
* `npm i postcss-loader postcss-preset-env -D`
* 然后修改css文件的loader配置

```js
{
    test: /\.css$/,
    use: [
        MiniCssExtractPlugin.loader, 
        'css-loader',
        /*
            css 兼容性处理： 使用postcss：安装 postcss-loader postcss-preset-env

            帮postcss找到package.json中的broswerslist里面的配置，通过配置加载指定的css兼容性样式
        */
        // 1. 直接使用默认配置
        //'postcss-loader',
        // 2 .修改配置，不适用默认，写成对象形式
        {
            loader: 'postcss-loader',
            options: {
                postcssOptions: {
                    plugins: [
                    [
                        // postcss 的插件, 可以在postcss官网查询
                        'postcss-preset-env',
                        {
                        // 其他选项
                        },
                    ],
                    ],
                },
            },
        },
    ]
}
```

* broswerslist配置

```js
...
"browserslist": {
    "development": [
      "last 1 chrome version",
      "last 1 firefox version"
    ],
    "productionb": [
      ">0.2%",
      "not dead",
      "not op_mini all"
    ]
}
...
```

* 但是如果我们要想让样式生效在 development环境下（开发环境下），需要修改一项配置，因为样式broswerslist默认是看生产模式的，（于webpack配置文件中的mode无关）
* 修改node环境变量： process.env.NODE_ENV = 'development'



## 压缩css

* 使用一个插件： `npm i optimize-css-assets-webpack-plugin -D`
* 配置文件中引入并在plugins中new调用

```js
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
...
plugins: [

    ...
    // 压缩css
    new optimizeCssAssetsWebpackPlugin()
],
```

## 压缩js

* 只要将mode调整为production就行了
* 因为生产模式下自动压缩js代码

## 压缩html

* 在插件里打包html时传入两个参数就行
  * collapseWhitespace: 折叠空格
  * removeComments： 注释

```js
plugins: [
    new HtmlWebpackPlugin({
        template: './src/index.html',
        minify: {
            collapseWhitespace: true,
            removeComments: true
        }
    })
],
```

* **webpack5** 只要将mode改为生产模式也会自动压缩html代码

# 性能优化

webpack性能优化（两方面）
* 开发环境性能优化
  * 优化打包构建速度
    * HMR
  * 优化代码调试
    * source-map
* 生产环境性能优化
  * 优化打包构建速度
    * oneOf
    * babel缓存（优化js代码打包速度）
    * 多进程打包
  * 优化代码运行的性能
    * 缓存
    * tree shaking
    * code split
    * 懒加载/预加载
    * pwa
    * externals
    * dll

## HMR

* 模块热替换： hot module replacement
* 官网：https://webpack.docschina.org/guides/hot-module-replacement/

* 一个模块发生变化，只会重新打包这一个模块，而不用去打包所有模块
* 将提高**打包构建速度**
* 使用： devServer配置中加入 hot ：true

```js
devServer: {
    static: resolve(__dirname,'dist'),
    // HMR
    hot: true
}
```

* 这是修改样式文件是可以实现hmr的，因为style-loader以及一些解决css的loader实现了hmr
  * 样式文件： 可以使用HMR
  * js文件： 默认不使用HMR
  * html文件： 默认不使用HMR功能，同时会导致html文件不能热更新了
    * 热更新解决： 改入口，将index.html加进去 `entry: ['./src/js/index.js','./src/index.html']`

* html显然就一个文件，不需要做HMR功能
* js文件有很多，需要HMR功能
  * 必须修改js代码，添加支持HMR功能的代码
  * 只能处理非入口js文件
  * 在入口文件中加入监听

```js
if(module.hot){
    // 一旦module上有hot属性，说明开启了HMR功能，这时候我们需要让HMR功能代码生效
    module.hot.accept('./log.js', function () {
        // 该方法会监听 log.js 文件的变化，一旦发生并变化，其他文件默认不会重新打包构建
        // 会执行该回调
        console.log('log.js文件更新');
    })
}
```

* HMR也会有一些问题存在，以及有支持HMR的vue的loader，查看官网说明

## source-map

* 优化代码调试
* source-map:  提供源代码到构建后的代码映射的技术 （如果构建后代码出错了，通过映射可以追踪源代码错误）
* 使用：在配置文件中第一级配置下加入配置项

```js
devtool: 'source-map'
```

* 然后执行webpack指令，然后对应输出文件会有一个对应的`.map`文件生成

* 上面这种写法是基本配置，它还可以有以下参数
  * `[inline-|hidden-|eval-] [nosources-][cheap-[module-]]source-map`
* 具体含义
  * 内联形式比外部形式来说，代码构建速度更快，并且没有生成额外的.map文件
  * source-map：外部
  * inline-source-map：内联：会将内容放到对应的文件里（注释形式）
    * 只生成一个内联source-map
  * hidden-source-map：外部：
  * eval-source-map：内联：
    * 每一个文件都生成对应的source-map，都在 eval 函数中
  * nosources-source-map: 外部
  * cheap-source-map：外部
  * cheap-module-source-map：外部
* 使用： 当你在运行devserver时编写代码，就能在控制台定位到错误代码的来源在源代码中的位置，而不会在构建后代码的位置了
  * 各种参数下的情况
  * source-map：能够提示错误代码的准确信息和源代码的错误位置
  * inline-source-map：能够提示错误代码的准确信息和源代码的错误位置
  * hidden-source-map：能够提示错误代码的准确信息，但是不能追踪源代码位置
  * eval-source-map：能够提示错误代码的准确信息和源代码的错误位置，每个文件多了一个hash值而已，方便调试
  * nosources-source-map：能够提示错误代码的准确信息和源代码的错误位置，但是没有任何源代码的信息，浏览器控制台是追踪不到的
  * cheap-source-map：能够提示错误代码的信息和源代码的错误位置（但是只能精确到行，不知道是具体哪一段代码）
  * cheap-module-source-map：能够提示错误代码的信息和源代码的错误位置（但是只能精确到行，不知道是具体哪一段代码），module会将loader的source map加入

* 如何选择？

  * 开发环境：速度快，调试友好
    * 速度快（eval>inline>cheap>...）
      * eval-cheap-source-map > eval-source-map
    * 调式友好(排序从上到下)
      * source-map
      * cheap-moudle-source-map
      * cheap-source-map
    * 根据以上可中和一个结果： eval-source-map  |  eval-cheap-module-source-map
    * vue 和 react 的脚手架就默认使用 eval-source-map

  * 生产环境：源代码要不要隐藏？调试要不要更友好？
    * 内联会让代码体积变大，生产环境不使用内联
    * nosource-source-map： 全部隐藏
    * hidden-source-map： 只隐藏代码，会提示构建后的代码错误信息
    *  推出一般结论： source-map | cheap-module-sopurce-map

## oneOf

* 生产环境的优化，优化代码构建速度
* 优化loader的处理
  * 一般来说，所有配置的loader都会被过一遍，但是我们只需要例如（switch break的效果）
* 使用 oneOf 选项将在一个文件只会命中其中一条loader规则的loader放到同一个数组中，来实现优化
  * 注意：里面不能有两个loader是处理同一种文件
  * 所以如果想要其他loader一起同时匹配，需要将loader放到外面，与 **{ oneOf }** 同级

```js
rules: [
    {
        //以下loader只会命中一个
        oneOf: [
            {
                test: /\.css$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    'css-loader',
                    {
                        //还需要在package.json中定义browserslist
                        loader: 'postcss-loader',
                        options: {
                            postcssOptions: {
                                plugins: [
                                [
                                    'postcss-preset-env'
                                ],
                                ],
                            },
                        },
                    },
                ]
            },
            {
                test: /\.less$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    'css-loader',
                    {
                        //还需要在package.json中定义browserslist
                        loader: 'postcss-loader',
                        options: {
                            postcssOptions: {
                                plugins: [
                                [
                                    'postcss-preset-env'
                                ],
                                ],
                            },
                        },
                    },
                    'less-loader'
                ]
            },
            {
                test: /\.html$/,
                //这个是处理html的img图片的（负责引入img，从而能被url-loader打包处理）
                loader: 'html-loader'
            }
        ]
    }
]
```





## 缓存

* 生产环境优化

* 官网：https://webpack.docschina.org/guides/caching/。 ：（如果我们在部署新版本时不更改资源的文件名，浏览器可能会认为它没有被更新，就会使用它的缓存版本）

* 那么我们怎么解决这种缓存问题呢：

  * 让构建后的文件的名字更改，那么浏览器访问时候就不会使用缓存版本了

* 第一种方法：文件名上带上hash值

  * 1.hash:  在配置文件中指定输出的文件名中带有hash值，保证文件名与缓存版本不一致，让浏览器读取最新文件

  ```js
  // 在输出的js文件名中带入 10位hash值 
  output: {
      filename: 'js/built.[hash:10].js',
      path: resolve(__dirname, 'dist')
  },
  ```

  ```js
  // 在输出的css文件中带入10位hash值
  plugins: [
      new MiniCssExtractPlugin({
          filename: 'css/built.[hash:10].css'
      }),
      ...
  ],
  ```

  * 但是以上这一个方法存在一个问题，因为js文件和css文件共享的都是webpack打包时候创建的hash值，只改其中一个重新打包后，所有的hash都跟着变了，这显然不是我们所期望的，这让没有变化的资源文件的缓存失效了
  * 2 .chunkhash（将hash换为chunkhash）：根据chunk生成的hash值，如果打包来源于同一个chunk，那么hash值一样
    * 同样存在问题： js和css的hash值还是一样的（如果css文件是在js中引入的，那么他们同属于一个chunk）
  * 3 . contenthash：根据文件的内容生成hash值，不同文件hash值一定不一样

## Tree shaking

官网：https://webpack.docschina.org/guides/tree-shaking/

* 去除无用代码，减少代码体积
* 前提
  * 必须使用ES6模块化
  * 开启production环境
* 只要做到以上两步，webpack打包时候自动tree shaking

* 如果在package.json中配置`"sideEffects": false`所有代码都没有副作用 （都可以进行tree shaking）
  * 会导致：可能会把 css / @babel/polyfill（副作用）文件干掉
  * 解决： `"sideEffects": ["*.css"]`,不对css文件进行tree shaking



## code split

官网：https://webpack.docschina.org/guides/code-splitting/

* 代码分割

1. 通过多入口拆分文件

```js
// entry: './src/js/index.js', // 单入口
entry: {
    // 多入口： 有一个入口，最终输出就有一个bundle
    main: './src/js/index.js',
    test: './src/js/test.js'
},
output: {
    filename: 'js/[name].[contenthash].js',
    path: resolve(__dirname,'dist')
},
```

* 这种设置为多入口后，就不需要在index.js文件中引入test.js文件了

* 显然这种方式不太灵活

2. 使用webpack提供的配置项

```js
 // 可以将 node_modules中的代码单独打包成一个chunk最终输出
// 会将多入口chunk中公共的文件单独打包成一个chunk（前提是这个文件不是太小），防止重复
optimization: {
    splitChunks: {
        chunks: 'all'
    }
},
```

* 主要功能是：
  * 会将第三方的库和自己的库分割开来
  * 如果配合上多入口配置的话，例如： index和test.js文件中都引入了jquery的话，不会让两个chunk中都注入jquery代码，而是将jquery单独打包成一个chunk公用

* 但是显然多入口（多页面应用）还是不如单入口（单页面应用）灵活

3. 在入口文件index.js文件中代码控制
   * 使用es10的动态import方法引入，返回一个promise对象

```js
/**
 * 通过js代码，让某个文件被单独打包成一个chunk
 */
// es10的语法
import('./test')
.then((res)=>{
    console.log(res)
    res.fn1
    res.fn2
})
.catch((err)=>{
    console.log(err)
})
```

* 成功拿到的res是test.js的module对象

* 但是这样会导致test输出的文件名是一个递增的id number,所以我们需要指定名字不变

```js
import(/* webpackChunkName: 'test' */'./test')
```

* 当然promise可以配上async、await的语法

```js
async function loadTest(){
    let {fn1 ,fn2} = await import(/* webpackChunkName: 'test' */'./test')
    log(fn1())
    log(fn2())
}
loadTest()
```



## 懒加载

官网：https://webpack.docschina.org/guides/lazy-loading/

* 指 js 代码的懒加载
* 基于代码分离
* 指在某些异步任务中去加载其他js模块的代码
* 例如这样就是一种懒加载

```js
document.getElementById('btn').onclick = function(){
    import(/* webpackChunkName: 'test' */'./test')
    .then(( {add } ) => {
        console.log(add(2,4));
    })
}
```





## 预加载

官网：https://webpack.docschina.org/guides/code-splitting/#prefetchingpreloading-modules

* 也是基于代码分离
* 开启指定的webpack的内置指令`webpackPrefetch: true `
* prefetch: 会在使用之前，提前加载js文件

```js
import(/* webpackChunkName: 'test' ,webpackPrefetch: true */'./test')
.then(( {add } ) => {
    console.log(add(2,4));
})
```

* 对比三种加载方式
  * 正常加载：可以认为是并行加载，同一时间在加载规定的http文件数量的文件
  * 懒加载：当文件需要时候才加载
  * 预加载：等其他资源加载完毕，浏览器空闲时候才偷偷加载这资源，兼容性差

## pwa渐进式网络开发应用程序

* 离线可访问
* 官网：https://webpack.docschina.org/guides/progressive-web-application/
* 安装插件：`npm i workbox-webpack-plugin -D`
* 配置文件中引入：

```js
const WorkboxWebpackPlugin = require('workbox-webpack-plugin')
```

* 直接在插件配置中new调用并写配置

```js
new WorkboxWebpackPlugin.GenerateSW({
    // 1 帮助serviceworker快速启动
    // 2 删除旧的 servicework

    
    clientsClaim: true,
    skipWaiting: true
    
    // 会生成一个servicework的配置文件
})
```

* 然后在入口文件（index.js）中注册servicework并做兼容性处理
  * 兼容性处理： 判断navigator上有没有这个属性
  * 有的话做注册
  * ‘service-work.js’就是它的配置文件，会在构建后的资源中生成（不是我们自己创建的）

```js
// 1 注册 servicework
// 2 处理兼容性问题
if('servicework' in navigator) {
    window.addEventListener('load',() => {
        navigator.serviceWorker.register('./service-wprker.js')
        .then(() => {
            console.log('servicework 注册成功');
        })
        .catch(() => {
            console.log('servicework 注册失败');
        })
    })
}
```

* 注意如果开启了eslint的话，它可能不认识某些全局变量（window、navigator...），需要在eslint的配置中修改（在package.json中修改）
* 然后执行打包命令webpack，就会发现构建后的代码中多了 service-work.js 文件
* 注意：servicework代码必须运行在服务器上
* 然后可以运行一下dist目录（打包后的资源目录），然后浏览器打开，运行一次，断网后发现，可以达到效果





## 多进程打包

提升打包速度

* 只有工作消耗时间较长，才需要（因为进程启动和通信都需要时间开销）
  * 所以一般用于js打包，Babel和eslint，一般和Babel
  * 用法就是一个loader，放在use中第一个
  * 可以在options中配置分配的cpu核数，默认为 总数-1

* `npm i thread-loader -D`



## externals

* 打包时候，如果我们想通过 cdn链接应用其他资源，比如jquery，而不是将jquery源码打包进去
* 但是当我们做了忽略后，我们需要在html中手动引进来
* 微软的一个提供的jquery的链接：

```js
<script src="http://ajax.aspnetcdn.com/ajax/jQuery/jquery-1.8.0.js"></script>
```

* 在配置文件中做忽略配置

```js
externals: {
    // 忽略库名 ：在npm中的包名
    jQuery: 'jQuery'
}
```



## dll

* 可以将第三方库打包在一起，然后用的时候直接引用就行了
* 优化第三方库重复打包的问题
* 与external的区别
  * externals是直接不打包，通过cdn链接引入
  * dll是单独自己先打包好资源，让html自动引入



1. 首先我们许需要新建一个配置文件 ，名称任意 （webpack.dll.js）

2. 编写内容

   1. 并且我们需要指定我们的运行命令运行这个配置文件: 

      ```bash
      webpack --config webpack.dll.js
      ```

```js
/**
 * 使用dll技术，对某些库（第三方库：jquery，vue）进行单独打包
 *      当你运行 webpack时，默认查找 webpack.config.js 配置文件
 *      但是我们需要运行 webpack.dll.js 文件
 *          --> :  webpack --config webpack.dll.js
 */
const {resolve} = require('path')
const webpack = require('webpack')
module.exports = {
    entry: {
        // 最终打包生成的【name】--> jquery
        // ['jquery'] --> 要打包的库是jquery
        jquery: ['jquery']
    },
    output: {
        filename: '[name].js',
        path: resolve(__dirname,'dll'),
        library: '[name]_[hash]', //打包的库向外暴露出去的内容叫什么名字
    },
    plugins: [
        // 打包生成一个 manifest.json文件 --> 提供和jquery映射
        new webpack.DllPlugin({
            name: '[name]_[hash]',//映射库的暴露的内容名称
            path: resolve(__dirname,'dll/manifest.json')// 输出文件路径
        })
    ],
    mode: 'production'
}
```

3. 运行命令后，就可以看见生成了dll文件夹，资源就放在里面，用到的时候直接引用就行

4. 修改 webpack.config.js配置

   1. 引入webpack
   2. new 调用 ,在参数里指定 manifest映射

   ```js
   // 引入webpack
   const webpack = require('webpack')
   ...
   plugins: [
           new HtmlWebpackPlugin({
               template: './src/index.html'
           }),
           // 告诉webpack哪些库不参与打包，同时使用时的名称也得改
           new webpack.DllReferencePlugin({
               manifest: resolve(__dirname,'dll/manifest.json')
           })
       ],
   ```

5. 然后执行打包命令 ： `webpack`

6. 这样就发现index.js中的引入的jquery就不会打包了

7. 没打包就没有，所以我们这时候还没完，需要一个插件

   1. `npm i add-asset-html-webpack-plugin -D`

8. 引入并使用

```js
//
const AddAssetHtmlWebpackPlugin = require('add-asset-html-webpack-plugin')
...
 // 将某个文件打包输出出去，并在html中自动引入这个资源
new AddAssetHtmlWebpackPlugin({
    filepath: resolve(__dirname,'dll/jquery.js')
})
```

9. webpack.DllReferencePlugin告诉webpack哪个文件不用打包，而AddAssetHtmlWebpackPlugin就是告诉webpack将某个文件打包输出出去，并在html中自动引入这个资源
   1. 我们让webpack不打包index.js中引入的jquery，然后让webpack将dll文件夹下的jquery输出到dist文件夹下，让html自动引入

* 步骤比较繁多
  * 编写webpack.dll.js配置文件来打包库文件并使用指定命令运行此配置文件
  * 编写webpack.config.js指定哪些库不用打包，然后并做dll下的文件的bundle输出和html中自动引入（不使用插件手动引入也可）





# 详细配置

官网： https://webpack.docschina.org/configuration/

## entry

* 入口起点
* 三种形式
  1. string
  2. array
  3. object
* 注意：
  * 单入口形式应该在index文件中引入其他js文件
  * 多入口形式不在index中引入其他js文件
* string：` './src/index.js', `(单入口)
  *  打包形成一个chunk，输出一个bundle文件
  * 此时这个chunk文件默认名称为main.js (如果我们不指定而使用[name].js)

```js
...
entry: './src/index.js',
 output: {
    filename: '[name].js',
    path: resolve(__dirname, 'dist')
},
...
```

* array: `['./src/index.js','./src/count.js'],（多入口）`
  * 所有入口文件最终只会形成一个chunk，输出出去只有一个bundle文件
  * 作用就是在HMR功能中让html热更新生效（将html作为入口文件添加到数组里）
* object： key-value，多入口
  * key：bundle名称
  * value：对应的入口文件
  * value可以是一个数组，就是对应的第二种array方式，这表示将这一个数组里的入口文件都打包到这个key下（在dll中常用这种入口形式）

```js
...
entry: {
    index: './src/index.js',
    count: './src/count.js'
},
...
```



## output

* filename: 指定文件名称和目录
* path: 指定文件目录（将来所有资源输出的公共目录）
* publicPath:  所有资源引入公共路径前缀 --> 'imgs/a.png' --> '/imgs/a.png'
  * 一般用于生产环境
  * 就是引入文件资源时候有没有公共前缀，如果配置该项为 ` '/'`的话，会在引入资源的时候加入/前缀
  *  `/img/a.png`会在当前服务器根目录下找
  * `img/a.png`会在当前文件夹目录下找

* chunkFilename:  非入口chunk的名称

  * 入口chunk就是entry指定的入口

  * 非入口（额外）chunk

    * 通过import语法引入的文件（import语法会将引入的文件单独作为一个chunk）

    ```js
    // index.js文件
    console.log('index.js');
    
    import('./test')
    .then(( { default: test} ) => {
        console.log(test(1,9));
    })
    // { default：test} 解构赋值，因为test文件使用 export default test 默认暴露，而default是个关键字，所以我们在解构赋值时候重命名为test
    ```

    * 通过optimization将node_module中的文件分割成的单独chunk

* library: 指定向外暴露的变量名

  * 如果 `library: '[name]_libbbb'`,那么会在构建后的main.js文件中发现，他将 `var main_libbb = 你的代码内容`就是将代码向外暴露出去，变量名为指定的这个指

* libraryTarget：他会将向外暴露（也就是library指定的变量）添加到目标属性上

  * 比如：

    ```js
    library: '[name]_libbbb',
    libraryTarget: 'window'
    ```

  * 会发现main.js文件中将它添加到了window上` window.main_libbbb = __webpack_exports__;`

  * 一般来说

    * libraryTarget: 'window' ： 浏览器端全局
    * libraryTarget: 'global'： node环境下全局
    * libraryTarget: 'commonjs'： 会以commonjs方式向外暴露
      * 包括其他的暴露规则（amd等）

  * 一般这两配置结合dll来用才用得到

## module

* rules下
  * 多个loader用use包含
  * 单个loader直接用loader指定
    * 可以通过options指定具体配置选项
  * exclude：不检查指定目录和文件
  * include：只检查指定目录和文件
  * enforce：指定loader的执行顺序（默认从下往上）
    * pre：优先执行
    * post：延后执行
    * 不写：就是中间执行，默认执行
  * oneOf：其中包含的配置只会同时生效一个，想并用与它同级

```js
module: {
    rules: [
        //loader
        {
            test: /\.css/,
            //多个loader用use包裹
            use:[
                'style-loader',
                'css-loader'
            ]
        },
        // {
        //     test: /\.js/,
        //     // 单个loader
        //     exclude: /node_modules/,
        //     // includes: resolve(__dirname,'src'),
        //     enforce: 'pre',
        //     loader: 'eslint-loader'
        // }
    ]
},
```



## resolve

* 解析模块的规则

* alias对象，能配置路径别名，写代码需要引入文件时候，可以用这个别名代替路径

  * ```js
    resolve: {
        //配置解析模块路径别名, 在js代码引文件时候，代替路径
        alias: {
            $css: resolve(__dirname,'./src/css')
        }
    }
    ```

  * 让后在js代码中引文件时候

  * ```js
    import '$css/index.css'
    alert('hello')
    ```

  * 可以配置多个

* extensions数组：配置省略文件路径的后缀，默认值是 `['.js','.json']`

  * 也就是可以省略文件后缀

  * ```js
    resolve: {
        //配置解析模块路径别名, 在js代码引文件时候，代替路径
        alias: {
            $css: resolve(__dirname,'./src/css')
        },
        extensions: ['.js','.json','.css']
    }
    ```

  * 然后index.js中

  * ```js
    import '$css/index'
    ```

  * 他会优先使用.js去补充，没有对应文件就 补充.json，没有就找 .css，发现有就引入该文件，一直匹配不到就报错

* modules数组：告诉webpack解析模块是去找哪个目录默认为 `modules: ['node_modules']`

  * 会在当前目录找node_modules，找不到就往外翻一层目录找，直到找到

  * 所以我们可以直接告诉它在哪一层目录，让他直接去找

  * ```js
    modules: [reslove(__dirname,'../../node_modules'),'node_modules']
    ```

