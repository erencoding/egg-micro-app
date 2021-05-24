'use strict';

const { merge } = require('lodash');
const fs = require('fs');
const path = require('path');

const config = {}; // 预留默认配置

const customConfig = fs.readFileSync(path.resolve(process.cwd(), 'framework.config.js'));

module.exports = merge(config, customConfig);
