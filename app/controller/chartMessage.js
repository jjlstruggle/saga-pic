'use strict';
const Controller = require('egg').Controller;
class chartMessageController extends Controller {
    async getChartMessage() {
        const ctx = this.ctx;
        const { goods_id } = ctx.query;
        const result = await ctx.service.chartMessage.getChartMessageServer(goods_id)
        console.log(result);
        ctx.body = {
            code: 200,
            data: result,
            status: 'success'
        };
        ctx.status = 200;
        return result
    }
    async postChartMessage() {
        const ctx = this.ctx;
        const row = ctx.request.body
        const { goods_id, content } = row
        await ctx.service.chartMessage.postChartMessageServer(goods_id, content)
        ctx.status = 200;
        ctx.body = {
            code: 200,
            status: 'success'
        };
    }
    async postReplyMessage() {
        const ctx = this.ctx;
        const row = ctx.request.body
        const { reply_id, coms_id, content, user_id, com_id } = row
        await ctx.service.chartMessage.postReplyMessageServer(reply_id, coms_id, content, user_id, com_id)
        ctx.status = 200;
        ctx.body = {
            code: 200,
            status: 'success'
        };
    }
}
module.exports = chartMessageController