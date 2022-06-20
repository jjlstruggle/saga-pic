'use strict';
const { nanoid } = require('nanoid')
const Service = require('egg').Service;
class detailedWorkServer extends Service {

    async createCareList(user_id) {
        const { app } = this
        const { mysql } = app
        try {
            await mysql.insert('care', {
                user_id, list: null
            })
        } catch (e) {
            console.log(e);
        }
    }

    async addCareList(user_id, target) {
        const { app } = this
        const { mysql } = app
        const list = await mysql.get('care', { user_id })
        if (!list) {
            await mysql.update('care', { user_id, list: target }, { where: { user_id } })
        } else {
            await mysql.update('care', { user_id, list: list + "," + target }, { where: { user_id } })
        }
    }

    async getCareList(user_id) {
        const { app } = this
        const { mysql } = app
        const list = await mysql.get('care', { user_id })
        let idArray = list.split(',')
        const res = await mysql.select('user')
        let u = []
        res.forEach(item => {
            if (idArray.includes(item.user_id)) {
                let index = idArray.indexOf(item.user_id)
                u.push({ user_id: item.user_id, user_name: item.user_name, user_avatar: item.user_avatar })
                idArray.splice(index, 1)
            }
        })
        return u
    }

    async createClick(goods_id, user_id) {
        const { app } = this
        const { mysql } = app
        try {
            await mysql.insert('isClick', {
                goods_id, user_id, isClick: 0
            })
        } catch (e) {
            console.log(e);
        }
    }
    async getIsClick(goods_id, user_id) {
        const { app } = this
        const { mysql } = app
        let result = await mysql.get('isClick', {
            goods_id, user_id
        })
        return result
    }


    async getDetailedWork(goods_id) {
        const { app } = this
        const { mysql } = app
        const { user_id, goods_picture, goods_prise, goods_num, goods_createTime } = await mysql.get('goods', {
            goods_id
        })

        const { user_name, user_avatar } = await mysql.get('user', { user_id })
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
            coms_id, user_id
        }
        return result
    }
    async goodsNumberAdd(goods_id) {


        const { app } = this
        const { mysql } = app
        const options = {
            where: {
                goods_id
            }
        };
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
        await mysql.update('goods', row, options);

    }

    async goodsPriseAdd(goods_id, myself_id) {
        const { app } = this
        const { mysql } = app
        const options = {
            where: {
                goods_id
            }
        };
        const { coms_id, user_id, goods_tags, goods_picture, goods_prise, goods_num, goods_createTime, goods_desc } = await mysql.get('goods', {
            goods_id
        })
        const row = {
            user_id,
            goods_id,
            coms_id,
            goods_tags,
            goods_picture,
            goods_prise: (goods_prise || 0) + 1,
            goods_num,
            goods_createTime,
            goods_desc,
        }
        let row1 = {
            user_id,
            goods_id,
            coms_id,
            goods_tags,
            goods_picture,
            goods_prise: (goods_prise || 0) - 1,
            goods_num,
            goods_createTime,
            goods_desc,
        }
        const { isClick } = await mysql.get('isClick', {
            user_id: myself_id, goods_id
        })
        if (isClick === 0) {
            await mysql.update('goods', row, options);
            await mysql.update('isClick', { goods_id, "user_id": myself_id, isClick: 1 }, {
                where: {
                    goods_id, "user_id": myself_id
                }
            });
            let result = mysql.get('goods', { goods_id })
            return result
        }
        else {
            await mysql.update('goods', row1, options);
            await mysql.update('isClick', { goods_id, "user_id": myself_id, isClick: 0 }, {
                where: {
                    goods_id, "user_id": myself_id
                }
            });
            let result = mysql.get('goods', { goods_id })
            return result
        }
    }
}
module.exports = detailedWorkServer