'use strict';
const { nanoid } = require('nanoid')
const Service = require('egg').Service;
const sd = require('silly-datetime');
class chartMessageServer extends Service {
    async getChartMessageServer(coms_id) {
        const { app } = this
        const { mysql } = app
        const result = mysql.select('comment', {
            where: { coms_id }
        })
        return result
    }
    async postChartMessageServer(goodId, content, user_id) {
        const { app } = this
        const { mysql } = app
        const { coms_id } = await mysql.get('comments', {
            goods_id: goodId
        })
        const { user_avatar, user_name } = await mysql.get('user', {
            user_id
        })
        const com_id = nanoid()
        const com_createTime = sd.format(new Date(), 'YYYY-MM-DD HH:mm:ss');
        await mysql.insert('comment',
            {
                com_id,
                reply: 0,
                user_avatar,
                coms_id,
                com_content: content,
                com_createTime,
                user_name,
                reply_id: null,
                reply_name: null,
                user_id
            })

    }
    async postReplyMessageServer(reply_id, coms_id, content, user_id) {
        const { app } = this
        const { mysql } = app
        const { user_avatar, user_name } = await mysql.get('user', {
            user_id
        })
        const { user_name: reply_name } = await mysql.get('user', {
            user_id: reply_id
        })
        const com_id = nanoid()
        const com_createTime = sd.format(new Date(), 'YYYY-MM-DD HH:mm:ss');
        await mysql.insert('comment',
            {
                com_id,
                reply: 1,
                user_avatar,
                coms_id,
                com_content: content,
                com_createTime,
                user_name,
                reply_id,
                reply_name,
                user_id
            })
    }
}
module.exports = chartMessageServer