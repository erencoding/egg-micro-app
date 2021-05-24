'use strict';

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
    const paths = config.router;

    if (Array.isArray(paths) && paths.length > 0) {
      paths.forEach(path => {
        this.loadFile(path);
      });
    }
    this.timing.start('Load Router');
    super.loadRouter();
    this.timing.end('Load Router');
  }

  loadController() {
    let paths = config.controller;

    if (!Array.isArray(paths)) paths = [];

    super.loadController({
      directory: [
        ...paths,
        path.resolve(process.cwd(), 'app/controller'),
      ],
      override: false,
    });
  }

  loadService(opt) {
    let paths = config.service;

    if (!Array.isArray(paths)) paths = [];

    const directory = [
      ...paths,
      ...this.getLoadUnits().map(unit => path.join(unit.path, 'app/service')),
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
    let paths = config.extend;

    if (!Array.isArray(paths)) paths = [];
    return [
      ...paths.map(p => path.join(p, name)),
      ...this.getLoadUnits().map(unit => path.join(unit.path, 'app/extend', name)),
    ];
  }

  _loadConstant() {
    const paths = config.constant;
    if (!paths) return;
    this.timing.start('Load Constant');
    this.loadToContext(paths, 'constant');
    this.timing.end('Load Constant');
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
