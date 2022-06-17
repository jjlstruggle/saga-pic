'use strict';
const Controller = require('egg').Controller;
class detailedWordController extends Controller{
    async getDetailedWorkController(){
        const ctx = this.ctx;
        const {goods_id} = ctx.params;
        const result=await ctx.service.detailedWords.getDetailedWork(goods_id)
        return result
    }
    async goodsNumberAddController(){
        const ctx = this.ctx;
        const {goods_id}=ctx.body
        await ctx.service.detailedWords.goodsNumberAdd(goods_id)
    }
    async goodsPriseAddController(){
        const ctx=this.ctx
        const {goods_id}=ctx.body
        await ctx.service.detailedWords.goodsPriseAdd(goods_id)
    }
}
module.exports=detailedWordController