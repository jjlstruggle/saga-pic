'use strict';
const { nanoid } = require('nanoid')
const sd = require('silly-datetime');
const Service = require('egg').Service;
class manuscriptServer extends Service{
    async getManuscript(){
        const {app}=this
        const {mysql}=app
        const result=mysql.get('manuscript')
        return result
    }
    async publishManuscript(user_id,manu_desc,manu_price){
        const {app}=this
        const {mysql}=app
        const manu_id=nanoid()
        const com_createTime = sd.format(new Date(), 'YYYY-MM-DD HH:mm:ss');
        mysql.insert('manuscript',{
            manu_id,
            in_id:null,
            out_id:user_id,
            manu_desc,
            manu_price,
            manu_date:com_createTime
        })
    }
}
module.exports=manuscriptServer