'use strict';

const { merge } = require('webpack-merge');
const path = require('path');
const chalk = require('chalk');

const config = {}; // 预留默认配置

let customConfig = {};
try {
  customConfig = require(path.resolve(process.cwd(), './config/framework.config.ts'));
} catch (e) {
  console.error(e);
  if (JSON.stringify(e).indexOf('Cannot find module') !== -1) {
    console.log(chalk.red(`Error: egg-framework-extend 's configuration ${chalk.yellow('framework.config.js(.ts)')} is required, please create it in ${chalk.yellow('config/')}.`));
  }
}

module.exports = merge(config, customConfig);
