'use strict';
const Service = require('egg').Service;

class AboutService extends Service {
  async index() {
    this.ctx.body = 'hello appB';
  }
}

module.exports = AboutService;
