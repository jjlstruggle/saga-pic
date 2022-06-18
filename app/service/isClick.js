'use strict';

const Service = require('egg').Service;
class isClick extends Service{

    async getIsClick(goods_id,user_id){
        const { app } = this
        const { mysql } = app
      let result =mysql.get('isClick',{
        goods_id,user_id
        })
        return result
    }
}
module.exports=isClick