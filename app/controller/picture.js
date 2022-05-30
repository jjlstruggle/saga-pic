'use strict';

const Controller = require('egg').Controller;
const fs = require('fs')
const pump = require('pump')
const { nanoid } = require('nanoid')

class UploadController extends Controller {

    async upload() {
        const { ctx, app } = this;
        const isProd = app.config.env === 'prod'
        const parts = ctx.multipart({ autoFields: true });
        let part = [], stream
        while ((stream = await parts()) != null) {
            let dir = await this.service.tools.getUploadFile(stream.filename)
            let target = dir.uploadDir
            let writeStream = fs.createWriteStream(target)
            await pump(stream, writeStream);
            let saveDir
            if (isProd) {
                saveDir = 'http://121.40.19.111:7001/' + dir.saveDir.replace('/public/', '/cdn/')
            } else {
                saveDir = 'http://127.0.0.1:7001' + dir.saveDir.replace('/public/', '/cdn/')
            }
            let id = nanoid()
            await this.service.tools.addMapPath(id, saveDir)
            part.push({ path: saveDir, id })
        }

        ctx.body = {
            code: 200,
            data: part,
            status: 'success'
        };
    }

    async getMapData() {
        const { ctx, service } = this;
        const { file } = await service.tools.getDb()
        ctx.body = {
            code: 200,
            data: file,
            status: 'success'
        };
    }

    async deletePic() {
        const { ctx } = this;
        const _id = ctx.request.body.id
        let { file } = await this.service.tools.getDb()
        if (file.length) {
            for (let i = 0; i < file.length; i++) {
                const { id, path } = file[i]
                if (id === _id) {
                    await this.service.tools.removeImage(path)
                    await this.service.tools.deleteMapPath(_id)
                }
            }
        }
        ctx.body = {
            code: 200,
            data: null,
            status: 'success'
        };
    }

}

module.exports = UploadController;
