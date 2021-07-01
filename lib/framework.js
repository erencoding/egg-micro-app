'use strict';
const path = require('path');
const egg = require('egg');
const EGG_PATH = Symbol.for('egg#eggPath');
const EGG_LOADER = Symbol.for('egg#loader');
const { getRouterEntry, getControllerEntry, getServiceEntry, getExtendEntry, getMiddlewareEntry, getConstantEntry } = require('./internals/entry');
class ExtendWorkerLoader extends egg.AppWorkerLoader {
  load() {
    super.load();
    this._loadConstant();
  }

  loadRouter() {
    const paths = getRouterEntry();

    if (Array.isArray(paths) && paths.length > 0) {
      paths.forEach(path => {
        this.loadFile(path);
      });
    }
    this.timing.start('Load Router');
    super.loadRouter();
    this.timing.end('Load Router');
  }

  loadController(opt) {
    super.loadController(Object.assign({
      directory: [
        ...getControllerEntry(),
        path.resolve(process.cwd(), 'app/controller'),
      ],
      override: false,
    }, opt));
  }

  loadService(opt) {
    super.loadService(Object.assign({
      directory: [
        ...getServiceEntry(),
        ...this.getLoadUnits().map(unit => path.join(unit.path, 'app/service')),
      ],
      override: false,
    }, opt));
  }

  // 获取extend文件路径
  getExtendFilePaths(name) {
    return [
      ...getExtendEntry().map(p => path.join(p, name)),
      ...this.getLoadUnits().map(unit => path.join(unit.path, 'app/extend', name)),
    ];
  }

  loadMiddleware(opt) {
    super.loadMiddleware(Object.assign({
      directory: [
        ...getMiddlewareEntry(),
        ...this.getLoadUnits().map(unit => path.join(unit.path, 'app/middleware')),
      ],
    }, opt));
  }

  _loadConstant() {

    this.loadToContext(getConstantEntry(), 'constant');
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
