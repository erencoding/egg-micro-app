'use strict';

const path = require('path');
const egg = require('egg');
const EGG_PATH = Symbol.for('egg#eggPath');
const EGG_LOADER = Symbol.for('egg#loader');
const config = require('./internals/config');

class ExtendWorkerLoader extends egg.AppWorkerLoader {

  constructor(opt) {
    super(opt);
    // 自定义初始化
    console.log('workerLoader 初始化');
  }

  loadRouter() {
    super.loadRouter();
    const paths = config.router;

    if (!paths) return;

    if (Array.isArray(paths) && paths.length > 0) {
      paths.forEach(path => {
        this.loadFile(path);
      });
    }
  }

  loadController() {
    let paths = config.controller;

    if (!Array.isArray(paths)) {
      paths = [];
    }

    super.loadController({
      directory: [
        path.resolve(process.cwd(), 'app/controller'),
        ...paths,
      ],
      override: false,
    });
  }

  loadService(opt) {
    let paths = config.service;

    if (!Array.isArray(paths)) {
      paths = [];
    }

    const directory = [
      ...this.getLoadUnits().map(unit => path.join(unit.path, 'app/service')),
      ...paths,
    ];

    this.timing.start('Load Service');
    // 载入到 app.serviceClasses
    opt = Object.assign({
      call: true,
      caseStyle: 'lower',
      fieldClass: 'serviceClasses',
      override: false,
      directory,
    }, opt);
    const servicePaths = opt.directory;
    this.loadToContext(servicePaths, 'service', opt);
    this.timing.end('Load Service');
  }

  // 获取extend文件路径
  getExtendFilePaths(name) {
    const paths = config.extend;
    console.log('paths :>> ', paths);
    return [
      ...this.getLoadUnits().map(unit => path.join(unit.path, 'app/extend', name)),
      ...paths.map(p => path.join(p, name)),
    ];
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
