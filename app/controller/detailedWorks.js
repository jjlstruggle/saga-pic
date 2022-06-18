'use strict';
const Controller = require('egg').Controller;
class detailedWordController extends Controller {

    async getDetailedWorkController() {
        const { ctx } = this
        const { goods_id,user_id } = ctx.query
        const result = await ctx.service.detailedWorks.getDetailedWork(goods_id)
        const isClick=await ctx.service.isClick.getIsClick(goods_id,user_id)
        console.log(isClick);
        result["isClick"]=isClick.isClick
        console.log(result);
        ctx.status = 200;
        ctx.body = {
            code: 200,
            data: result,
            status: 'success'
        };
        ctx.status = 200;
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