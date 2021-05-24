'use strict';

const path = require('path');
const egg = require('egg');
const EGG_PATH = Symbol.for('egg#eggPath');
const EGG_LOADER = Symbol.for('egg#loader');


class ExtendWorkerLoader extends egg.AppWorkerLoader {
  constructor(opt) {
    super(opt);
    // 自定义初始化
    console.log('workerLoader 初始化');
  }

  loadConfig() {
    super.loadConfig();
    // 对 config 进行处理
  }

  load() {
    super.load();
    // 自定义加载其他目录
    // 或对已加载的文件进行处理
  }

  loadRouter() {
    super.loadRouter();
    const loadRouterPath = path.resolve(process.cwd(), './app/modules/home/router');
    this.loadFile(loadRouterPath);
  }

  loadController() {
    super.loadController({
      opt: path.resolve(process.cwd(), './app/modules/home/controller'),
    });
  }
}

class Application extends egg.Application {
  get [EGG_PATH]() {
    return path.dirname(__dirname);
  }

  get [EGG_LOADER]() {
    return ExtendWorkerLoader;
  }
}


module.exports = Object.assign(egg, {
  Application,
  AppWorkerLoader: ExtendWorkerLoader,
});
