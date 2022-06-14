'use strict';
const Service = require('egg').Service;
class AuthService extends Service{
    async getAuth(id){
        const { app } = this
        const { mysql } = app
        const result = await mysql.get('authentication', {
            user_id:id,
        })
        return result
    }
    async postAuth({user_id,user_realName,user_idCard,nameAuth}){
        const { app } = this
        const { mysql } = app
        const row = {
            user_id: user_id,
            user_realName: user_realName,
            user_idCard: user_idCard,    
            nameAuth: nameAuth
          };
        const result = await mysql.update('authentication', row)
        const updateSuccess = result.affectedRows === 1;
        console.log(updateSuccess);
        return result
    }
}
module.exports=AuthService