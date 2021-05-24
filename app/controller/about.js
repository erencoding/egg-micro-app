'use strict';

const egg = require('egg');

class AboutController extends egg.Controller {
  async index() {
    const { ctx } = this;
    ctx.body = 'about';
  }
}
module.exports = AboutController;
