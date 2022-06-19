'use strict';
const { nanoid } = require('nanoid');
const sd = require('silly-datetime');
const Service = require('egg').Service;
class chartRoomService extends Service{
async postMes(message_id,FromUserID,ToUserID,PostMessages){
    const {app}=this
    const {mysql}=app
    const Time = sd.format(new Date(), 'YYYY-MM-DD HH:mm:ss');
    const {user_name,user_avatar}=await mysql.get('user',{
        FromUserID
    })
    const toUser=await mysql.get('user',{ToUserID}) 
    mysql.insert('message',{
        message_id,FromUserID,FromUserID,PostMessages,Time,status:0,FromUserName:user_name,FromUserUrl:user_avatar,ToUserName:toUser.user_name,ToUserUrl:toUser.user_avatar

    })
}
async getAllMes(message_id){
    const {app}=this
    const {mysql}=app
    const result=await mysql.select('message',{message_id})
    return result
}
}
module.exports=chartRoomService