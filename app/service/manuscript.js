'use strict';
const { nanoid } = require('nanoid')
const sd = require('silly-datetime');
const Service = require('egg').Service;
class manuscriptServer extends Service {
    async getManuscript() {
        const { app } = this
        const { mysql } = app
        const result = await mysql.select('manuscript')
        return await Promise.all(result.map(async (res) => {
            const user_id = res.out_id
            const { user_avatar, user_name } = await mysql.get('user', {
                user_id
            })
            res.user_avatar = user_avatar
            res.user_name = user_name
            return res
        }))
    }
    async publishManuscript(user_id, manu_desc, manu_price, manu_title) {
        const { app } = this
        const { mysql } = app
        const manu_id = nanoid()
        const com_createTime = sd.format(new Date(), 'YYYY-MM-DD HH:mm:ss');
        const { user_avatar, user_name } = await mysql.get('user', {
            user_id
        })
        await mysql.insert('manuscript', {
            manu_id,
            in_id: null,
            out_id: user_id,
            manu_desc,
            manu_price,
            manu_date: com_createTime,
            manu_title,
        })
        return {
            user_avatar, user_name
        }
    }
}
module.exports = manuscriptServer