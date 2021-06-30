'use strict';
const assert = require('assert');
const path = require('path');
const egg = require('egg');
const EGG_PATH = Symbol.for('egg#eggPath');
const EGG_LOADER = Symbol.for('egg#loader');
const config = require('./internals/config');

class ExtendWorkerLoader extends egg.AppWorkerLoader {
  load() {
    super.load();
    this._loadConstant();
  }

  loadRouter() {
    const paths = config.router || [];
    assert(Array.isArray(paths), `router 's path ${config.router} in framework config must be array,  but actual is ${typeof config.router}`);

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
    const paths = config.controller || [];

    assert(Array.isArray(paths), `controller 's path ${config.controller} in framework config must be array,  but actual is ${typeof config.controller}`);
    super.loadController(Object.assign({
      directory: [
        ...paths,
        path.resolve(process.cwd(), 'app/controller'),
      ],
      override: false,
    }, opt));
  }

  loadService(opt) {
    const paths = config.service || [];

    assert(Array.isArray(config.service), `service 's path ${config.service} in framework config must be array,  but actual is ${typeof config.service}`);
    super.loadService(Object.assign({
      directory: [
        ...paths,
        ...this.getLoadUnits().map(unit => path.join(unit.path, 'app/service')),
      ],
      override: false,
    }, opt));
  }

  // 获取extend文件路径
  getExtendFilePaths(name) {
    const paths = config.extend || [];

    assert(Array.isArray(paths), `extend 's path ${config.extend} in framework config must be array,  but actual is ${typeof config.extend}`);
    return [
      ...paths.map(p => path.join(p, name)),
      ...this.getLoadUnits().map(unit => path.join(unit.path, 'app/extend', name)),
    ];
  }

  loadMiddleware(opt) {
    const paths = config.middleware || [];

    assert(Array.isArray(paths), `middleware 's path ${config.middleware} in framework config must be array,  but actual is ${typeof config.middleware}`);
    super.loadMiddleware(Object.assign({
      directory: [
        ...paths,
        ...this.getLoadUnits().map(unit => path.join(unit.path, 'app/middleware')),
      ],
    }, opt));
  }

  _loadConstant() {
    const paths = config.constant || [];

    assert(Array.isArray(paths), `constant 's path ${config.constant} in framework config must be array,  but actual is ${typeof config.constant}`);
    this.loadToContext(paths, 'constant');
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
