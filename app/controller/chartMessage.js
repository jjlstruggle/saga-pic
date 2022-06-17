'use strict';
const Controller = require('egg').Controller;
class chartMessageController extends Controller {
    async getChartMessageController(){
        const ctx = this.ctx;
        const {goods_id} = ctx.params;
        const result=await ctx.service.chartMessage.getChartMessageServer(goods_id)
        return result
    }
    async postChartMessageController(){
        const ctx = this.ctx;
        const row=ctx.request.body
        const {goods_id,content}=row
        await ctx.service.chartMessage.postChartMessageServer(goods_id,content)
    }
    async postReplyMessageController(){
        const ctx = this.ctx;
        const row=ctx.request.body
        const {reply_id,coms_id,content,user_id,com_id}=row
        await ctx.service.chartMessage.postReplyMessageServer(reply_id,coms_id,content,user_id,com_id)
    }
}
module.exports=chartMessageController