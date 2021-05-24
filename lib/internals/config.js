'use strict';

const { merge } = require('lodash');
const path = require('path');
const chalk = require('chalk');

const config = {}; // 预留默认配置

let customConfig = {};
try {
  customConfig = require(path.resolve(process.cwd(), './config/framework.config.js'));
} catch (e) {
  console.log(chalk.red(`egg-framework-extend is required in the configuration file ${chalk.yellow('framework.config.js')}, please create it in ${chalk.yellow('config/')}`));
}

module.exports = merge(config, customConfig);
