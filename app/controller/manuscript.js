'use strict';
const Controller = require('egg').Controller;
class manuscriptController extends Controller{
 async getManuscript(){
    const ctx = this.ctx;
    const result=await ctx.service.manuscript.getManuscript()
    return result
 }
 async publishManuscript(){
    const ctx = this.ctx;
    const {user_id,manu_des,manu_price}=ctx.body
    await ctx.service.manuscript.publishManuscript(user_id,manu_des,manu_price)
 }
}
module.exports=manuscriptController