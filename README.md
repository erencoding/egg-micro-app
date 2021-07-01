# egg-framework-extend
By expanding the Egg project directory, the Egg micro application is realized
<img src="https://store-g1.seewo.com/seewoedu_pub_6334eb4993f4474ba5845c2b3c855119" width="700"  align="bottom" />  
English | [简体中文](./README-zh_CN.md)
## Install
```
npm i egg-framework-extend --save
```
## Example
#### Micro application
According to different business modules, split the original `app` into several `microApp` in egg.
```
- app
  - microApp1
  - microApp2
  - microApp3
    - controller
    - service
    - router.js
```
Access the NPM package in package.json
```
{
  "name": "your-project",
  ...
  "egg": {
    "framework": "egg-framework-extend"
  },
  ...
}
```
In the config folder in the egg directory, create a new file framework.config.js(framework.config.ts if you use TypeScript).
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
#### Micro application nesting
If the module becomes more and more bloated, you can split it up.
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

## Usage
Configuration config description
| property | type | description |  
| ------ | ------ | ------ |  
| app | string[] | Defines the absolute path of the micro application |  
| router | string[] | Customize the absolute path to the Router file |  
| controller | string[] | Customize the absolute path to the Controller file |  
| service | string[] | Customize the absolute path to the Service file |
| extend | string[] | Customize the absolute path to the extend file |
| constant | string[] | Customize the absolute path to the constant file |  

## License
[MIT](./LICENSE)