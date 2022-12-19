
# mbox
> 简单、可扩展的状态管理
> https://cn.mobx.js.org/

![MobX unidirectional flow](https://cn.mobx.js.org/flow.png)

# 核心概念

## 可观察的状态（observable state）
通过 @observable 装饰器来给类属性添加注解
* 属性可以是对象或者数组
```ts
import { observable } from "mobx";

class demo01 {
	@observable title = 'hello';
	@observable timer = 0;
}
```

## 计算值（computed values）
可以定义在相关数据发生变化时自动更新的值
```ts
import { observable, computed } from 'mobx';
import { observer } from 'mobx-react';

const t = new class Temperature {
  @observable unit = "C";
  @observable temperatureCelsius = 25;

  @computed get temperatureKelvin() {
    return this.temperatureCelsius * (9 / 5) + 32
  }

  @computed get temperatureFahrenheit() {
    return this.temperatureCelsius + 273.15
  }

  @computed get temperature() {
    switch (this.unit) {
      case "K": return this.temperatureKelvin + "ºK"
      case "F": return this.temperatureFahrenheit + "ºF"
      case "C": return this.temperatureCelsius + "ºC"
    }
  }
}
```

<!--stackedit_data:
eyJoaXN0b3J5IjpbOTQxMzAzMzMsMTE0NjkyMTI5LDM1NzUxNz
k4MSw5NjI2NTI2NTNdfQ==
-->