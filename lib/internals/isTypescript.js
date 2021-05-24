'use strict';

/** 开发模式是否为typescript模式 */
const { get } = require('lodash');
const fs = require('fs');
const path = require('path');

module.exports = () => {
  const file = fs.readFileSync(path.resolve(process.cwd(), 'package.json'), {
    encoding: 'utf-8',
  });
  const pkg = JSON.parse(file);
  return get(pkg, 'egg.typescript', false);
};
