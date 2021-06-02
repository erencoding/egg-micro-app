# @seewoedu/egg-framework-extend
## Introduction
实现了egg目录的扩展。
## Install
```
npm i @seewoedu/egg-framework-extend --registry=https://artifactory.gz.cvte.cn/artifactory/api/npm/cvte-npm-registry
```
## Example
例如，在egg默认目录结果下，为模块home定制专属目录
```
- app
  - controller
  - service
  - extend
  - router.js
- home
  - controller
  - service
  - extend
  - router.js
```
1. 在package.json中接入npm包
```
{
  "name": "your-project",
  "version": "1.0.0",
  "egg": {
    "framework": "@seewoedu/egg-framework-extend"
  },
}
```
2. 在egg目录下的config配置文件夹中，新建文件framework.config.js(若使用typescript则后缀为.ts)
```
// framework.config.js
import path = require('path');

export default {
  router: [path.join(process.cwd(), 'home/router.js')],
  controller: [path.join(process.cwd(), 'home/controller')],
  service: [path.join(process.cwd(), 'home/service')],
  extend: [path.join(process.cwd(), 'home/extend')],
};
```
## Usage
配置
在framework.config.js导出对象，对象包含下列属性
| 属性 | 类型 | 说明 |  
| ------ | ------ | ------ |  
| router | string[] | router文件的绝对路径 |  
| controller | string[] | controller目录的绝对路径 |  
| service | string[] | service目录的绝对路径 |  
| extend | string[] | extend目录的绝对路径 |  
| constant | string[] | constant目录的绝对路径，即常量的目录 |  

## Test
```
// 待开发
```
 

 

 

 

 

