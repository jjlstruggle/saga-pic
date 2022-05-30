'use strict';

const Controller = require('egg').Controller;

class HomeController extends Controller {
  async index() {
    const { ctx } = this;
    ctx.body = {
      code: 200,
      data: 'hello master',
      status: 'success'
    };
  }
}

module.exports = HomeController;
