# egg-micro-app
通过拓展egg项目目录，拆分egg巨型应用，实现服务模块化。
因为egg的目录约束特性，默认只有一个app，app会随着软件迭代愈发庞大。这个工具可以通过配置扩展更多的app，让开发者把巨石应用拆分成多个微应用。
<img src="https://store-g1.seewo.com/seewoedu_pub_6334eb4993f4474ba5845c2b3c855119" width="700"  align="bottom" />    


[English](./README.md) | 简体中文
## 安装
```
npm i egg-micro-app --save
```
## 举例
### 微应用
根据业务中不同模块，将egg中原有的`app`应用拆分为多个`microApp`微应用
```
- app
  - microApp1
  - microApp2
  - microApp3
    - controller
    - service
    - router.js
```
在package.json中接入npm包
```
{
  "name": "your-project",
  ...
  "egg": {
    "framework": "egg-micro-app"
  },
  ...
}
```
在egg目录下的config文件夹中，新建文件framework.config.js(若使用typescript为framework.config.ts)
```
// framework.config.js
const path = require('path');

module.exports = {
  app: [
    path.join(process.cwd(), 'app/microApp1'),
    path.join(process.cwd(), 'app/microApp2'),
    path.join(process.cwd(), 'app/microApp3'),
  ],
};
```
### 微应用嵌套
如果模块变得越来越臃肿，可以将模块进行拆分
```
- app
  - microApp
    - subMicroApp1
    - subMicroApp2
```
```
// framework.config.js
const path = require('path');

module.exports = {
  app: [
    path.join(process.cwd(), 'app/microApp/subMicroApp1'),
    path.join(process.cwd(), 'app/microApp/subMicroApp2'),
  ],
};
```

## 使用
配置config说明
| 属性 | 类型 | 说明 |  
| ------ | ------ | ------ |  
| app | string[] | 定义微应用的绝对路径 |  
| router | string[] | 自定义router文件的绝对路径 |  
| controller | string[] | 自定义controller目录的绝对路径 |  
| service | string[] | 自定义service目录的绝对路径 |
| extend | string[] | 自定义extend目录的绝对路径 |
| constant | string[] | 自定义constant目录的绝对路径，即常量的目录 |  

## License
[MIT](./LICENSE)
