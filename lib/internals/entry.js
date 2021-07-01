'use strict';

const config = require('./config');
const assert = require('assert');
const isTypescript = require('./isTypescript');

function getAppPath() {
  const appPaths = config.app;
  if (appPaths !== undefined) {
    assert(Array.isArray(appPaths), `app 's path ${appPaths} in framework config must be array,  but actual is ${typeof appPaths}`);
  }
  return appPaths;
}

function getUnitPathFromAppPath(unitName) {
  const appPaths = getAppPath();
  if (!appPaths) {
    return [];
  }
  return appPaths.map(path => `${path}/${unitName}`);
}

function getRouterEntry() {
  const paths = config.router || [];
  assert(Array.isArray(paths), `router 's path ${config.router} in framework config must be array,  but actual is ${typeof config.router}`);
  return [
    ...getUnitPathFromAppPath(`router${isTypescript() ? '.ts' : '.js'}`),
    ...paths,
  ];
}

function getControllerEntry() {
  const paths = config.controller || [];
  assert(Array.isArray(paths), `controller 's path ${config.controller} in framework config must be array,  but actual is ${typeof config.controller}`);
  return [
    ...getUnitPathFromAppPath('controller'),
    ...paths,
  ];
}

function getServiceEntry() {
  const paths = config.service || [];
  assert(Array.isArray(paths), `service 's path ${config.service} in framework config must be array,  but actual is ${typeof config.service}`);
  return [
    ...getUnitPathFromAppPath('service'),
    ...paths,
  ];
}

function getExtendEntry() {
  const paths = config.extend || [];
  assert(Array.isArray(paths), `extend 's path ${config.extend} in framework config must be array,  but actual is ${typeof config.extend}`);
  return [
    ...getUnitPathFromAppPath('extend'),
    ...paths,
  ];
}

function getMiddlewareEntry() {
  const paths = config.middleware || [];
  assert(Array.isArray(paths), `middleware 's path ${config.middleware} in framework config must be array,  but actual is ${typeof config.middleware}`);
  return [
    ...getUnitPathFromAppPath('middleware'),
    ...paths,
  ];
}

function getConstantEntry() {
  const paths = config.constant || [];
  assert(Array.isArray(paths), `constant 's path ${config.constant} in framework config must be array,  but actual is ${typeof config.constant}`);
  return [
    ...getUnitPathFromAppPath('constant'),
    ...paths,
  ];
}

module.exports = {
  getAppPath,
  getRouterEntry,
  getControllerEntry,
  getServiceEntry,
  getExtendEntry,
  getMiddlewareEntry,
  getConstantEntry,
};
