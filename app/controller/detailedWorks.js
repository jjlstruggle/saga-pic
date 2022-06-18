'use strict';
const Controller = require('egg').Controller;
class detailedWordController extends Controller {
    async getDetailedWorkController() {
        const ctx = this.ctx;
        const { goods_id } = ctx.params;
        const result = await ctx.service.detailedWorks.getDetailedWork(goods_id)
        console.log(result);
        ctx.status = 200;
        ctx.body = {
            code: 200,
            data: result,
            status: 'success'
        };
        ctx.status = 200;
        return result
    }
    async goodsNumberAddController() {
        const ctx = this.ctx;
        const { goods_id } = ctx.request.body
        await ctx.service.detailedWorks.goodsNumberAdd(goods_id)
        ctx.body = {
            code: 200,
            status: 'success'
        };
    }
    async goodsPriseAddController() {
        const ctx = this.ctx
        const { goods_id } = ctx.request.body
        await ctx.service.detailedWorks.goodsPriseAdd(goods_id)
        ctx.body = {
            code: 200,
            status: 'success'
        };
    }
}
module.exports = detailedWordController