'use strict';
const { nanoid } = require('nanoid')
const sd = require('silly-datetime');
const Service = require('egg').Service;
class messageServer extends Service{
   async getAllMessageHistory(message_id){
    const {app}=this
    const {mysql}=app
    const result=mysql.select('message',{
        message_id
    })
    return result
   }
}