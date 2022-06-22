'use strict';
const Service = require('egg').Service;

class HomeService extends Service {

    async getUserInfo(user_id) {
        const { app } = this
        const { mysql } = app
        const { user_name, user_avatar, createTime, nameAuth, user_age, user_num, use_desc, user_sex } = await mysql.get('user', { user_id })
        return {
            user_name, user_avatar, createTime, nameAuth, user_age, user_num, use_desc, user_sex, user_id
        }

    }




}

module.exports = HomeService;