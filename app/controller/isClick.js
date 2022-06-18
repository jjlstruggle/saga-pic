'use strict';
const Controller = require('egg').Controller;
class isClickController extends Controller{
    async getIsClick(){
        const { ctx} = this; 
        const {goods_id,user_id}=ctx.request.body
      let result =await ctx.service.isClick.getIsClick(goods_id,user_id)
        ctx.body = {
            code: 200,
            data: result.isClick,
            status: 'success'
        };
    }
}
module.exports=isClickController