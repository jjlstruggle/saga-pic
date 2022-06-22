'use strict';

const Controller = require('egg').Controller;

class HomeController extends Controller {
  async getUserInfo() {
    const { ctx, service } = this;
    const user_id = ctx.request.query
    const data = await service.home.getUserInfo(user_id)
    ctx.body = {
      code: 200,
      data: data,
      status: 'success'
    };
  }
}

module.exports = HomeController;
