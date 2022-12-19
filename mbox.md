
# mbox
> 简单、可扩展的状态管理
> https://cn.mobx.js.org/

![MobX unidirectional flow](https://cn.mobx.js.org/flow.png)

# 核心概念

## 可观察的状态（observable state）
通过 @observable 装饰器来给类属性添加注解
```
class demo01 {
	@observable title = 'hello';
	@observable timer = 0;
}
```
<!--stackedit_data:
eyJoaXN0b3J5IjpbMTEyMjUyMjkxMCwzNTc1MTc5ODEsOTYyNj
UyNjUzXX0=
-->