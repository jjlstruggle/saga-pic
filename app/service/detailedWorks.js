'use strict';
const { nanoid } = require('nanoid')
const Service = require('egg').Service;
class detailedWorkServer extends Service {
    async getIsClick(goods_id,user_id){
        const { app } = this
        const { mysql } = app
      let result =mysql.get('isClick',{
        goods_id,user_id
        })
        return result
    }
    async
    async getDetailedWork(goods_id) {
        const { app } = this
        const { mysql } = app
        const { user_id, goods_picture, goods_prise, goods_num, goods_createTime } = await mysql.get('goods', {
            goods_id
        })
        console.log("user_id",user_id);
        const {user_name, user_avatar} =await mysql.get('user', {user_id}  )
        const { coms_id } = await mysql.get('comments', {
            goods_id
        })

        const result = {
            user_name,
            user_avatar,
            goods_picture,
            goods_prise,
            goods_num,
            goods_createTime,
            coms_id
        }
        return result
    }
    async goodsNumberAdd(goods_id,myself_id) {
        const { app } = this
        const { mysql } = app
        const { coms_id, user_id, goods_tags, goods_picture, goods_prise, goods_num, goods_createTime, goods_desc } =await mysql.get('goods', {
            goods_id
        })
        const row = {
            user_id,
            goods_id,
            coms_id,
            goods_tags,
            goods_picture,
            goods_prise,
            goods_num: goods_num + 1,
            goods_createTime,
            goods_desc
        }
       const row1={
        user_id,
        goods_id,
        coms_id,
        goods_tags,
        goods_picture,
        goods_prise,
        goods_num: goods_num - 1,
        goods_createTime,
        goods_desc
       }
        const options = {
            where: {
                goods_id
            }
        };
        const {isClick}=await mysql.get('isClick',{
            goods_id,"user_id":myself_id
            })
        if(isClick===0){
            await mysql.update('goods', row, options);
            await mysql.update('isClick', {goods_id,"user_id":myself_id,isClick:1}, {where:{
                goods_id,"user_id":myself_id
            }});
        }
        else{
            await mysql.update('goods', row1, options);
            await mysql.update('isClick', {goods_id,"user_id":myself_id,isClick:0}, {where:{
                goods_id,"user_id":myself_id
            }});
        }
    }
    async goodsPriseAdd(goods_id) {
        const { app } = this
        const { mysql } = app
        const { coms_id, user_id, goods_tags, goods_picture, goods_prise, goods_num, goods_createTime, goods_desc } = await mysql.get('goods', {
            goods_id
        })
        const row = {
            user_id,
            goods_id,
            coms_id,
            goods_tags,
            goods_picture,
            goods_prise: goods_prise + 1,
            goods_num,
            goods_createTime,
            goods_desc
        }
        console.log(goods_prise);
        const options = {
            where: {
                goods_id
            }
        };
        await mysql.update('goods', row, options);
    }
}
module.exports = detailedWorkServer