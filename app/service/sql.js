'use strict';
const Service = require('egg').Service;
const dayjs = require('dayjs')

class ToolService extends Service {

    async deleteMapPath(id) {
        const { app } = this
        const { mysql } = app
        const result = await mysql.delete('picturemap', {
            id,
        })
        return result
    }

    async pictureMap(id, url) {
        const { app } = this
        const { mysql } = app
        const result = await mysql.insert('picturemap', {
            id,
            url,
            createAt: dayjs().unix(),
            deleteAt: null
        })
        return result
    }
    async getPictureMap() {
        const { mysql } = this.app
        const res = await mysql.select('picturemap')
        console.log(res);
        return res
    }

}

module.exports = ToolService;