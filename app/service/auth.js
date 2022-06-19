'use strict';
const Service = require('egg').Service;
class AuthService extends Service {
    async getAuth(id) {
        const { app } = this
        const { mysql } = app
        const result = await mysql.get('authentication', {
            user_id: id,
        })
        return result
    }
    async postAuth({ user_id, user_realName, user_idCard }) {
        const { app } = this
        const { mysql } = app
        const row = {
            user_id,
            user_realName,
            user_idCard,
        };
        const result = await mysql.update('authentication', row, {
            where: {
                user_id,
            }
        })
        return result
    }
}
module.exports = AuthService