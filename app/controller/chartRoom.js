'use strict';
const Controller = require('egg').Controller;
class chartRoomController extends Controller {
async postMes(){
    const { ctx } = this
 const {message_id,FromUserID,ToUserID,PostMessages}=ctx.request.body
 await ctx.service.chartRoom.postMes(message_id,FromUserID,ToUserID,PostMessages)
 let result=ctx.service.chartRoom.getAllMes(message_id)
 ctx.body = {
    code: 200,
    data: result,
    status: 'success'
};
}
async getAllMes(){
    const {message_id}=ctx.request.body
    let result=ctx.service.chartRoom.getAllMes(message_id)
    ctx.body = {
       code: 200,
       data: result,
       status: 'success'
   };
}
}
module.exports=chartRoomController