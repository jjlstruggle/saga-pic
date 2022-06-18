'use strict';
const { nanoid } = require('nanoid')
const Service = require('egg').Service;
class detailedWorkServer extends Service {

    async getDetailedWork(goods_id) {
        const { app } = this
        const { mysql } = app
        const { user_id, goods_picture, goods_prise, goods_num, goods_createTime } = mysql.get('goods', {
            goods_id
        })

        const { coms_id } = mysql.get('comments', {
            goods_id
        })
        const { user_name, user_avatar } = mysql.get('user', { user_id })
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
    async goodsNumberAdd(goods_id) {
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
            goods_prise,
            goods_num: goods_num + 1,
            goods_createTime,
            goods_desc
        }

        const options = {
            where: {
                goods_id
            }
        };
        await mysql.update('goods', row, options);
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