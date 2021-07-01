'use strict';

const { merge } = require('webpack-merge');
const path = require('path');
const chalk = require('chalk');
const isTypescript = require('../internals/isTypescript');
const { isProd } = require('../internals/env');

const config = {}; // 预留默认配置
const ext = isTypescript() && !isProd() ? '.ts' : '.js';
let customConfig = {};
try {
  customConfig = require(path.resolve(process.cwd(), `./config/framework.config${ext}`));
  customConfig = customConfig.default || customConfig;
  // 生产模式去除ts文件
  if (isProd()) {
    Object.keys(customConfig).forEach(key => {
      if (Array.isArray(customConfig[key])) {
        customConfig[key] = customConfig[key].filter(path => !/(.ts|.tsx)$/.test(path));
      }
    });
  }
} catch (e) {
  console.error(e);
  if (JSON.stringify(e).indexOf('Cannot find module') !== -1) {
    console.log(chalk.red(`Error: egg-micro-app 's configuration ${chalk.yellow('framework.config.js(.ts)')} is required, please create it in ${chalk.yellow('config/')}.`));
  }
}

module.exports = merge(config, customConfig);
