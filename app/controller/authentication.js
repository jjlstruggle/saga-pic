'use strict';
const Controller = require('egg').Controller;

class AuthController extends Controller{
    async authName(){
        const { ctx} = this; 
        const row=ctx.request.body
       await ctx.service.auth.postAuth(row)
       ctx.body = {
        code: 200,
        data: part,
        status: 'success'
    };
    }
    async getAuth(){
        const ctx = this.ctx;
    const userId = ctx.params.id;
    const user = await ctx.service.auth.getAuth(userId)
    ctx.body = user;
    }
}
module.exports=AuthController