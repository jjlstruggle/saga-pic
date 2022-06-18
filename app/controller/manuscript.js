'use strict';
const Controller = require('egg').Controller;
class manuscriptController extends Controller{
 async getManuscript(){
    const ctx = this.ctx;
    const result=await ctx.service.manuscript.getManuscript()
    ctx.body = {
      code: 200,
      data: result,
      status: 'success'
    };
    ctx.status = 200;
    return result
 }
 async publishManuscript(){
    const ctx = this.ctx;
    const {user_id,manu_desc,manu_price,manu_title}=ctx.request.body
    await ctx.service.manuscript.publishManuscript(user_id,manu_desc,manu_price,manu_title)
    ctx.body = {
      code: 200,
      status: 'success'
    };
    ctx.status = 200;
 }
}
module.exports=manuscriptController