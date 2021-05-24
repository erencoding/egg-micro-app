'use strict';

/** 生产模式 */
exports.isProd = () => {
  return process.env.NODE_ENV === 'production' || process.env.EGG_SERVER_ENV === 'prod';
};
