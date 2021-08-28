## 在使用vue.cli开发时候怎么跨域ajax请求数据

**在`config/index.js`**中配置下列参数

```javascript
proxyTable: {
      '/api' : {//匹配所有以 '/api'开头的请求路径
        target: 'http://localhost:5000',//代理目标的基础路径
        changeOrigin: true,//支持跨域
        pathRewrite: {//重写路径：去掉路径开头的'/api/'
          '^/api': ''
        }
      }
    },
```

记住重新运行vue.cli项目，因为这里修改了配置